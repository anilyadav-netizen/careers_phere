const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    location: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    graduationYear: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    currentCompany: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    preferredJobRole: {
      type: String,
      default: "",
    },

    preferredLocation: {
      type: String,
      default: "",
    },

    employmentType: {
      type: String,
      default: "",
    },

    salaryExpectation: {
      type: String,
      default: "",
    },

    governmentDocumentType: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    governmentDocument: {
      type: String,
      default: "",
    },

    governmentDocumentName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
