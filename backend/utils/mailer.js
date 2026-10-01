const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.warn("SMTP Transporter warning:", error.message);
  } else {
    console.log("SMTP Server is ready.");
  }
});

const getClientUrl = () =>
  (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const layout = (title, content) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:24px 10px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:620px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
              <div style="font-size:22px;font-weight:700;color:#111827;">CareerSphere</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6b7280;">
              This is an automated notification from CareerSphere.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const sendMail = (options) =>
  transporter.sendMail({
    from: `"CareerSphere" <${process.env.MAIL_USER}>`,
    replyTo: process.env.MAIL_USER,
    ...options,
  });

// =====================================================
// WELCOME EMAIL
// =====================================================

const sendWelcomeEmail = async (user) => {
  try {
    const clientUrl = getClientUrl();

    const plainText = `Hello ${user.name},

Your CareerSphere account has been created successfully.

Account email: ${user.email}

You can sign in to manage your account:
${clientUrl}

Regards,
CareerSphere`;

    const html = layout(
      "Welcome to CareerSphere",
      `
      <h2 style="margin:0 0 14px;color:#111827;">Welcome to CareerSphere</h2>
      <p style="font-size:15px;line-height:1.6;">Hello ${escapeHtml(user.name)},</p>
      <p style="font-size:15px;line-height:1.6;">
        Your CareerSphere account has been created successfully.
      </p>
      <div style="margin:20px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 7px;font-size:14px;">Name: <strong>${escapeHtml(user.name)}</strong></p>
        <p style="margin:0;font-size:14px;">Email: <strong>${escapeHtml(user.email)}</strong></p>
      </div>
      <a href="${escapeHtml(clientUrl)}"
        style="display:inline-block;padding:11px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:7px;font-size:14px;">
        Open CareerSphere
      </a>`,
    );

    const info = await sendMail({
      to: user.email,
      subject: "Welcome to CareerSphere",
      text: plainText,
      html,
    });

    console.log("Welcome email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Welcome email error:", error);
    throw error;
  }
};

// =====================================================
// JOB APPLICATION CONFIRMATION EMAIL
// =====================================================

const sendApplicationConfirmation = async ({ user, job, application }) => {
  try {
    const recipientEmail = user?.email || application?.applicationData?.email;

    if (!recipientEmail) {
      console.warn(
        "sendApplicationConfirmation skipped: recipient email is missing",
      );
      return null;
    }

    const applicantName =
      user?.name || application?.applicationData?.name || "Candidate";
    const jobTitle = job?.title || "Position";
    const company = job?.company || "Hiring Team";
    const location = job?.location || "Not specified";
    const clientUrl = getClientUrl();

    const refId = application?._id
      ? application._id.toString().slice(-8).toUpperCase()
      : "CSJ-" + Math.floor(100000 + Math.random() * 900000);

    const plainText = `Hello ${applicantName},

We received your application for "${jobTitle}".

Application details:
Role: ${jobTitle}
Company: ${company}
Location: ${location}
Reference ID: #${refId}

Your application has been recorded successfully. You will receive an email when its status changes.

View your account:
${clientUrl}

Regards,
CareerSphere`;

    const html = layout(
      "Application received",
      `
      <h2 style="margin:0 0 14px;color:#111827;">Application received</h2>
      <p style="font-size:15px;line-height:1.6;">Hello ${escapeHtml(applicantName)},</p>
      <p style="font-size:15px;line-height:1.6;">
        We received your application for
        <strong>${escapeHtml(jobTitle)}</strong>.
      </p>

      <div style="margin:20px 0;padding:18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:14px;">Role: <strong>${escapeHtml(jobTitle)}</strong></p>
        <p style="margin:0 0 8px;font-size:14px;">Company: <strong>${escapeHtml(company)}</strong></p>
        <p style="margin:0 0 8px;font-size:14px;">Location: <strong>${escapeHtml(location)}</strong></p>
        <p style="margin:0;font-size:14px;">Reference: <strong>#${escapeHtml(refId)}</strong></p>
      </div>

      <p style="font-size:15px;line-height:1.6;">
        Your application has been recorded successfully. You will receive an email when its status changes.
      </p>

      <a href="${escapeHtml(clientUrl)}"
        style="display:inline-block;padding:11px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:7px;font-size:14px;">
        View your account
      </a>`,
    );

    const info = await sendMail({
      to: recipientEmail,
      subject: `Application received - ${jobTitle}`,
      text: plainText,
      html,
    });

    console.log(
      "Job application confirmation email sent:",
      info.messageId,
      "to:",
      recipientEmail,
    );
    return info;
  } catch (error) {
    console.error("sendApplicationConfirmation error:", error.message || error);
    return null;
  }
};

// =====================================================
// SUBSCRIPTION CONFIRMATION EMAIL
// =====================================================

const sendSubscriptionConfirmation = async ({ user, subscription }) => {
  try {
    const clientUrl = getClientUrl();
    const endDate = new Date(subscription.endDate).toLocaleDateString("en-IN");

    const plainText = `Hello ${user.name},

Your CareerSphere subscription has been activated.

Plan: ${subscription.planName}
Valid until: ${endDate}

You can sign in to view your account:
${clientUrl}

Regards,
CareerSphere`;

    const html = layout(
      "Subscription confirmed",
      `
      <h2 style="margin:0 0 14px;color:#111827;">Subscription confirmed</h2>
      <p style="font-size:15px;line-height:1.6;">Hello ${escapeHtml(user.name)},</p>
      <p style="font-size:15px;line-height:1.6;">
        Your <strong>${escapeHtml(subscription.planName)}</strong> plan is now active.
      </p>
      <div style="margin:20px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 7px;font-size:14px;">Plan: <strong>${escapeHtml(subscription.planName)}</strong></p>
        <p style="margin:0;font-size:14px;">Valid until: <strong>${escapeHtml(endDate)}</strong></p>
      </div>
      <a href="${escapeHtml(clientUrl)}"
        style="display:inline-block;padding:11px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:7px;font-size:14px;">
        Open CareerSphere
      </a>`,
    );

    const info = await sendMail({
      to: user.email,
      subject: `Subscription activated - ${subscription.planName}`,
      text: plainText,
      html,
    });

    console.log("Subscription confirmation email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error(
      "sendSubscriptionConfirmation error:",
      error.message || error,
    );
    return null;
  }
};

// =====================================================
// ROLE APPLICATION RECEIVED EMAIL
// =====================================================

const sendRoleApplicationReceivedEmail = async (application) => {
  try {
    if (!application || !application.email) return null;

    const roleName = application.role || "Specialist Role";
    const company = application.companyName || "Hiring Team";
    const applicantName = application.fullName || "Candidate";
    const clientUrl = getClientUrl();

    const refId = application._id
      ? application._id.toString().slice(-8).toUpperCase()
      : "CSP-" + Math.floor(100000 + Math.random() * 900000);

    const plainText = `Hello ${applicantName},

We received your application for "${roleName}".

Application details:
Role: ${roleName}
Company: ${company}
Reference ID: #${refId}

Your application has been recorded successfully. We will notify you if its status changes.

${clientUrl}

Regards,
CareerSphere`;

    const html = layout(
      "Application received",
      `
      <h2 style="margin:0 0 14px;color:#111827;">Application received</h2>
      <p style="font-size:15px;line-height:1.6;">Hello ${escapeHtml(applicantName)},</p>
      <p style="font-size:15px;line-height:1.6;">
        We received your application for <strong>${escapeHtml(roleName)}</strong>.
      </p>

      <div style="margin:20px 0;padding:18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:14px;">Role: <strong>${escapeHtml(roleName)}</strong></p>
        <p style="margin:0 0 8px;font-size:14px;">Company: <strong>${escapeHtml(company)}</strong></p>
        <p style="margin:0;font-size:14px;">Reference: <strong>#${escapeHtml(refId)}</strong></p>
      </div>

      <p style="font-size:15px;line-height:1.6;">
        Your application has been recorded successfully. We will notify you if its status changes.
      </p>

      <a href="${escapeHtml(clientUrl)}"
        style="display:inline-block;padding:11px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:7px;font-size:14px;">
        View your account
      </a>`,
    );

    const info = await sendMail({
      to: application.email,
      subject: `Application received - ${roleName}`,
      text: plainText,
      html,
    });

    console.log(
      "Role application confirmation email sent:",
      info.messageId,
      "to:",
      application.email,
    );
    return info;
  } catch (error) {
    console.error(
      "sendRoleApplicationReceivedEmail error:",
      error.message || error,
    );
    return null;
  }
};

// =====================================================
// ROLE APPLICATION STATUS UPDATE EMAIL
// Signature preserved: (application, newStatus, adminNotes)
// =====================================================

const sendRoleApplicationStatusUpdateEmail = async (
  application,
  newStatus,
  adminNotes = "",
) => {
  try {
    if (!application || !application.email) return null;

    const applicantName = application.fullName || "Candidate";
    const roleName = application.role || "Role";
    const company = application.companyName || "CareerSphere";
    const clientUrl = getClientUrl();

    const statusMeta = {
      shortlisted: {
        badgeText: "Shortlisted",
        title: "Application shortlisted",
        description: `Your application for ${roleName} has moved to the shortlisted stage.`,
      },
      interview: {
        badgeText: "Interview scheduled",
        title: "Interview scheduled",
        description: `Your application for ${roleName} has moved to the interview stage.`,
      },
      reviewed: {
        badgeText: "Under review",
        title: "Application under review",
        description: `Your application for ${roleName} is currently under review.`,
      },
      hired: {
        badgeText: "Offer extended",
        title: "Offer update",
        description: `There is an update regarding your application for ${roleName}.`,
      },
      rejected: {
        badgeText: "Status updated",
        title: "Application status update",
        description: `There is an update regarding your application for ${roleName}.`,
      },
      pending: {
        badgeText: "Pending",
        title: "Application status update",
        description: `Your application for ${roleName} is currently pending review.`,
      },
    };

    const currentMeta = statusMeta[newStatus] || statusMeta.pending;

    const subjects = {
      shortlisted: `Application shortlisted - ${roleName}`,
      interview: `Interview scheduled - ${roleName}`,
      reviewed: `Application under review - ${roleName}`,
      hired: `Offer update - ${roleName}`,
      rejected: `Application status update - ${roleName}`,
      pending: `Application status update - ${roleName}`,
    };

    const subject =
      subjects[newStatus] || `Application status update - ${roleName}`;

    const note =
      adminNotes && String(adminNotes).trim()
        ? `\nNote from the hiring team:\n${String(adminNotes).trim()}\n`
        : "";

    const plainText = `Hello ${applicantName},

There is an update to your application for "${roleName}".

Status: ${currentMeta.badgeText}
${currentMeta.description}
${note}
You can view your account here:
${clientUrl}

Regards,
CareerSphere`;

    const html = layout(
      currentMeta.title,
      `
      <h2 style="margin:0 0 14px;color:#111827;">${escapeHtml(currentMeta.title)}</h2>
      <p style="font-size:15px;line-height:1.6;">Hello ${escapeHtml(applicantName)},</p>
      <p style="font-size:15px;line-height:1.6;">
        There is an update to your application for <strong>${escapeHtml(roleName)}</strong>.
      </p>

      <div style="margin:20px 0;padding:18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">Status</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#111827;">
          ${escapeHtml(currentMeta.badgeText)}
        </p>
        <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">
          ${escapeHtml(currentMeta.description)}
        </p>
      </div>

      ${
        adminNotes && String(adminNotes).trim()
          ? `<div style="margin:20px 0;padding:16px;background:#f9fafb;border-left:3px solid #111827;">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#111827;">Note from the hiring team</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#4b5563;">${escapeHtml(String(adminNotes).trim())}</p>
            </div>`
          : ""
      }

      <a href="${escapeHtml(clientUrl)}"
        style="display:inline-block;padding:11px 18px;background:#111827;color:#fff;text-decoration:none;border-radius:7px;font-size:14px;">
        View application
      </a>`,
    );

    const info = await sendMail({
      to: application.email,
      subject,
      text: plainText,
      html,
    });

    console.log(
      "Role application status update email sent:",
      info.messageId,
      "to:",
      application.email,
      "status:",
      newStatus,
    );

    return info;
  } catch (error) {
    console.error(
      "sendRoleApplicationStatusUpdateEmail error:",
      error.message || error,
    );
    return null;
  }
};

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendApplicationConfirmation,
  sendSubscriptionConfirmation,
  sendRoleApplicationReceivedEmail,
  sendRoleApplicationStatusUpdateEmail,
};
