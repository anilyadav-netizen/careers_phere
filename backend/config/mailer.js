const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendJobApplicationMail = async (user, job) => {
  try {
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: `Application Submitted - ${job.title}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Application Submitted Successfully 🎉</h2>

          <p>Hi <strong>${user.name}</strong>,</p>

          <p>
            Your application for the following job has been successfully
            submitted.
          </p>

          <div style="
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
            margin: 20px 0;
          ">
            <p><strong>Job:</strong> ${job.title}</p>
            <p><strong>Company:</strong> ${job.company || "N/A"}</p>
          </div>

          <p>
            Thank you for applying. The employer will review your application
            and contact you if your profile is shortlisted.
          </p>

          <p>
            Best regards,<br />
            <strong>Job Portal Team</strong>
          </p>
        </div>
      `,
    });

    console.log(`Application email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending application email:", error);
  }
};

module.exports = {
  transporter,
  sendJobApplicationMail,
};
