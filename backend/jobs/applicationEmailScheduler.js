const JobApplication = require("../models/JobApplication");
const { sendApplicationConfirmation } = require("../utils/mailer");

const FIVE_MINUTES = 5 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
let isProcessing = false;

const processPendingApplicationEmails = async () => {
  if (isProcessing) return;

  isProcessing = true;

  try {
    const createdBefore = new Date(Date.now() - FIVE_MINUTES);
    const applications = await JobApplication.find({
      isSendMail: false,
      createdAt: { $lte: createdBefore },
    })
      .populate("applicant", "name email")
      .populate("job", "title location company");

    for (const application of applications) {
      const user = application.applicant;
      const job = application.job;

      if (!user?.email || !job?.title) {
        console.error(
          `Skipping application ${application._id}: missing user email or job data`,
        );
        continue;
      }

      try {
        await sendApplicationConfirmation({ user, job });
        await JobApplication.updateOne(
          { _id: application._id, isSendMail: false },
          { $set: { isSendMail: true } },
        );
      } catch (error) {
        console.error(
          `Application confirmation failed for ${application._id}:`,
          error.message,
        );
      }
    }
  } catch (error) {
    console.error("Application email scheduler error:", error.message);
  } finally {
    isProcessing = false;
  }
};

const startApplicationEmailScheduler = () => {
  const timer = setInterval(processPendingApplicationEmails, ONE_MINUTE);
  timer.unref?.();
  processPendingApplicationEmails();
  return timer;
};

module.exports = {
  processPendingApplicationEmails,
  startApplicationEmailScheduler,
};
