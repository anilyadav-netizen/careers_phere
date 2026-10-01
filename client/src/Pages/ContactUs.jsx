import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";

import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden">
        {/* Abroad Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Professional Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />

        {/* Theme Blue Overlay */}
        <div className="absolute inset-0 bg-[#30AFFF]/10" />

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#30AFFF]/10 blur-3xl sm:h-80 sm:w-80" />

          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#A0E9FF]/10 blur-3xl sm:h-96 sm:w-96" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[330px] items-center justify-center py-14 text-center sm:min-h-[380px] sm:py-16 lg:min-h-[410px]">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:text-sm">
                <Globe2 size={16} />
                Global Career Opportunities
              </div>

              {/* Heading */}
              <h1 className="text-xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-3xl lg:text-4xl">
                Build Your Career {""}
                <span className="">Beyond Borders</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg">
                Looking for opportunities abroad or planning your next career
                move? CareerNova helps you discover jobs, build your profile and
                move closer to your global career goals.
              </p>

              {/* Trust Points */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <CheckCircle2 size={15} className="text-[#A0E9FF]" />
                  Global Opportunities
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <CheckCircle2 size={15} className="text-[#A0E9FF]" />
                  Professional Support
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <CheckCircle2 size={15} className="text-[#A0E9FF]" />
                  Career Growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO CARDS
      ===================================================== */}
      <section className="relative -mt-8 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Email */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                <Mail size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#30AFFF]"
              />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">Email Us</h3>

            <p className="mt-1 break-all text-sm text-gray-500">
              support@CareerNova.com
            </p>
          </div>

          {/* Phone */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                <Phone size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#30AFFF]"
              />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">Call Us</h3>

            <p className="mt-1 text-sm text-gray-500">+91 98765 43210</p>
          </div>

          {/* Location */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                <MapPin size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#30AFFF]"
              />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">Visit Us</h3>

            <p className="mt-1 text-sm text-gray-500">New Delhi, India</p>
          </div>

          {/* Working Hours */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF] transition-colors group-hover:bg-[#30AFFF] group-hover:text-white">
                <Clock3 size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#30AFFF]"
              />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
              Working Hours
            </h3>

            <p className="mt-1 text-sm text-gray-500">Mon - Sat, 9AM - 6PM</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT SECTION
      ===================================================== */}
      <section className="px-4 py-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-[#30AFFF]" />

              <span className="text-xs font-bold uppercase tracking-wider text-[#159FEF] sm:text-sm">
                Contact Us
              </span>
            </div>

            <h2 className="text-xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
              Let's Start a {""}
              <span className="">Conversation</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
              Whether you're looking for your dream job, searching for talented
              professionals, or simply have a question, we'd love to hear from
              you.
            </p>

            {/* Job Seekers */}
            <div className="mt-8 space-y-4">
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF]">
                  <BriefcaseBusiness size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                    Looking For A Job?
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Find opportunities that match your skills, experience and
                    career goals.
                  </p>
                </div>
              </div>

              {/* Employers */}
              <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF]">
                  <Users size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                    Looking For Talent?
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Connect with skilled professionals and build your perfect
                    team.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-700">
                Follow CareerNova
              </p>

              <div className="mt-3 flex gap-3">
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
                >
                  <FaLinkedinIn size={16} />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
                >
                  <FaInstagram size={17} />
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-[#30AFFF] hover:bg-[#30AFFF] hover:text-white"
                >
                  <FaTwitter size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-200/40 sm:p-7 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Send Us A Message
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Fill out the form and we'll get back to you soon.
              </p>
            </div>

            {/* Success */}
            {submitted && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="text-sm font-bold text-green-800">
                    Message sent successfully!
                  </p>

                  <p className="mt-1 text-xs text-green-700">
                    Thank you for contacting CareerNova.
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#30AFFF]/20 transition-all duration-300 hover:bg-[#159FEF] hover:shadow-xl hover:shadow-[#30AFFF]/30"
              >
                Send Message
                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#30AFFF] px-5 py-10 text-center shadow-xl shadow-[#30AFFF]/15 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Your Career Journey Starts Here
            </h2>

            <p className="mt-3 text-sm text-white/85 sm:text-base">
              Connect with CareerNova and take the next step toward your
              professional future.
            </p>

            <Link to="/jobs">
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#159FEF] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Explore Opportunities
                <ArrowRight size={17} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
