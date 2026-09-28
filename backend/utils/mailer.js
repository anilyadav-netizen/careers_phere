const nodemailer = require("nodemailer");

// =====================================================
// NODEMAILER TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// =====================================================
// WELCOME EMAIL
// =====================================================

const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: `"Job Portal" <${process.env.MAIL_USER}>`,

      to: user.email,

      subject: "Welcome to Job Portal 🎉",

      html: `
        <!DOCTYPE html>

        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>Welcome</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              font-family: Arial, Helvetica, sans-serif;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: 30px auto;
                background: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.08);
              "
            >

              <!-- HEADER -->

              <div
                style="
                  padding: 30px;
                  background-color: #2563eb;
                  color: #ffffff;
                  text-align: center;
                "
              >

                <h1
                  style="
                    margin: 0;
                    font-size: 28px;
                  "
                >
                  Welcome to Job Portal 🎉
                </h1>

              </div>

              <!-- BODY -->

              <div
                style="
                  padding: 30px;
                  color: #333333;
                "
              >

                <p
                  style="
                    font-size: 17px;
                    margin-top: 0;
                  "
                >
                  Hi <strong>${user.name}</strong>,
                </p>

                <p
                  style="
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  Welcome to Job Portal!
                  Your account has been successfully created.
                </p>

                <p
                  style="
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  You can now explore jobs, apply to suitable
                  opportunities, and manage your applications
                  from your account.
                </p>

                <!-- ACCOUNT DETAILS -->

                <div
                  style="
                    margin: 25px 0;
                    padding: 20px;
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                  "
                >

                  <p
                    style="
                      margin: 0 0 10px 0;
                    "
                  >
                    <strong>Name:</strong>
                    ${user.name}
                  </p>

                  <p
                    style="
                      margin: 0;
                    "
                  >
                    <strong>Email:</strong>
                    ${user.email}
                  </p>

                </div>

                <p
                  style="
                    font-size: 15px;
                    line-height: 1.7;
                  "
                >
                  We are excited to have you with us and
                  wish you the very best in your job search.
                </p>

                <br />

                <p
                  style="
                    margin-bottom: 0;
                  "
                >
                  Best regards,
                  <br />

                  <strong>
                    Job Portal Team
                  </strong>
                </p>

              </div>

              <!-- FOOTER -->

              <div
                style="
                  padding: 15px;
                  background-color: #f8fafc;
                  text-align: center;
                  font-size: 12px;
                  color: #64748b;
                "
              >
                This is an automated email.
                Please do not reply.
              </div>

            </div>

          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Welcome email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Welcome email error:", error);

    throw error;
  }
};

// =====================================================
// JOB APPLICATION EMAIL
// =====================================================

const sendApplicationConfirmation = async ({ user, job }) => {
  try {
    const mailOptions = {
      from: `"Job Portal" <${process.env.MAIL_USER}>`,

      to: user.email,

      subject: `Application Submitted - ${job.title}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
          "
        >

          <h2>
            Application Submitted Successfully 🎉
          </h2>

          <p>
            Hi <strong>${user.name}</strong>,
          </p>

          <p>
            Your application has been successfully
            submitted for the following job:
          </p>

          <div
            style="
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              margin: 20px 0;
            "
          >

            <p>
              <strong>Job:</strong>
              ${job.title}
            </p>

            <p>
              <strong>Location:</strong>
              ${job.location || "N/A"}
            </p>

            ${
              job.company
                ? `
                  <p>
                    <strong>Company:</strong>
                    ${job.company}
                  </p>
                `
                : ""
            }

          </div>

          <p>
            Your application status is currently
            <strong>Pending</strong>.
          </p>

          <p>
            The employer will review your application
            and contact you if your profile is shortlisted.
          </p>

          <br />

          <p>
            Best regards,<br />
            <strong>Job Portal Team</strong>
          </p>

        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Application email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Nodemailer send email error:", error);

    throw error;
  }
};

const sendSubscriptionConfirmation = async ({ user, subscription }) => {
  const mailOptions = {
    from: `"Job Portal" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: `Subscription Activated - ${subscription.planName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Subscription Activated Successfully</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>Your <strong>${subscription.planName}</strong> plan is now active.</p>
        <p>Valid until: <strong>${subscription.endDate.toLocaleDateString("en-IN")}</strong></p>
        <p>You can now apply for jobs according to your plan limits.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Subscription confirmation email sent:", info.messageId);
  return info;
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendApplicationConfirmation,
  sendSubscriptionConfirmation,
};
