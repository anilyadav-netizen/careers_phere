const fs = require("fs");
const path = require("path");

// Resolve video file location
const getVideoPath = () => {
  const candidates = [
    path.join(__dirname, "../../client/public/long-vdo.mp4"),
    path.join(__dirname, "../../client/dist/long-vdo.mp4"),
    path.join(__dirname, "../public/long-vdo.mp4"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
};

// Constant video metadata (duration = 76.14s from mp4 mvhd atom)
const VIDEO_DURATION_SEC = 76.14;
const PACKET_DURATION_SEC = 15;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

// ============================================================
// GET VIDEO METADATA
// GET /api/video/meta
// ============================================================
exports.getVideoMeta = (req, res) => {
  try {
    const videoPath = getVideoPath();
    if (!videoPath) {
      return res.status(404).json({
        success: false,
        message: "Video file not found",
      });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const totalPackets = Math.ceil(VIDEO_DURATION_SEC / PACKET_DURATION_SEC);
    const packetSizeBytes = Math.ceil(PACKET_DURATION_SEC * (fileSize / VIDEO_DURATION_SEC));

    const packets = [];
    for (let i = 0; i < totalPackets; i++) {
      const startSec = i * PACKET_DURATION_SEC;
      const endSec = Math.min((i + 1) * PACKET_DURATION_SEC, VIDEO_DURATION_SEC);
      const startByte = i * packetSizeBytes;
      const endByte = Math.min((i + 1) * packetSizeBytes - 1, fileSize - 1);

      packets.push({
        packetNumber: i + 1,
        startSec,
        endSec,
        startByte,
        endByte,
        label: `${formatTime(startSec)} - ${formatTime(endSec)}`,
        sizeBytes: endByte - startByte + 1,
      });
    }

    return res.status(200).json({
      success: true,
      title: "CareerNova International Explainer",
      duration: VIDEO_DURATION_SEC,
      durationFormatted: formatTime(VIDEO_DURATION_SEC),
      fileSize,
      packetDurationSec: PACKET_DURATION_SEC,
      totalPackets,
      packetSizeBytes,
      packets,
    });
  } catch (error) {
    console.error("Get video meta error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to read video metadata",
    });
  }
};

// ============================================================
// STREAM VIDEO IN 15-SECOND PACKETS
// GET /api/video/stream
// Supports HTTP Range header (RFC 7233) with 15s packet max limit
// Supports ?packet=1 query param for explicit packet loading
// ============================================================
exports.streamVideo = (req, res) => {
  try {
    const videoPath = getVideoPath();
    if (!videoPath) {
      return res.status(404).json({
        success: false,
        message: "Video file not found",
      });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    // Calculate maximum chunk size equivalent to 15 seconds
    const bytesPerSecond = fileSize / VIDEO_DURATION_SEC;
    const packetSizeBytes = Math.ceil(PACKET_DURATION_SEC * bytesPerSecond);

    const range = req.headers.range;
    const packetQuery = req.query.packet;

    let start = 0;
    let end = Math.min(packetSizeBytes - 1, fileSize - 1);

    if (packetQuery !== undefined && packetQuery !== null && !isNaN(Number(packetQuery))) {
      // Explicit packet requested (1-indexed or 0-indexed handled gracefully)
      const pIdx = Math.max(0, Number(packetQuery) > 0 ? Number(packetQuery) - 1 : Number(packetQuery));
      start = pIdx * packetSizeBytes;
      end = Math.min(start + packetSizeBytes - 1, fileSize - 1);

      if (start >= fileSize) {
        return res.status(416).json({
          success: false,
          message: "Requested packet beyond end of video",
        });
      }
    } else if (range) {
      // Standard HTTP Range request from HTML5 video element
      const parts = range.replace(/bytes=/, "").split("-");
      start = parseInt(parts[0], 10);
      const requestedEnd = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Restrict max chunk size to 15 seconds packet size to prevent loading the full 97MB at once
      end = Math.min(requestedEnd, start + packetSizeBytes - 1, fileSize - 1);
    }

    if (start >= fileSize || start < 0) {
      res.writeHead(416, {
        "Content-Range": `bytes */${fileSize}`,
      });
      return res.end();
    }

    const chunkLength = end - start + 1;
    const currentPacket = Math.floor(start / packetSizeBytes) + 1;
    const totalPackets = Math.ceil(fileSize / packetSizeBytes);

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkLength,
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=3600, immutable",
      "X-Packet-Number": currentPacket,
      "X-Total-Packets": totalPackets,
      "X-Packet-Duration": `${PACKET_DURATION_SEC}s`,
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });

    stream.on("error", (streamErr) => {
      console.error("Video stream error:", streamErr);
      if (!res.headersSent) {
        res.status(500).end();
      }
    });

    req.on("close", () => {
      stream.destroy();
    });

    stream.pipe(res);
  } catch (error) {
    console.error("Stream video error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to stream video",
      });
    }
  }
};
