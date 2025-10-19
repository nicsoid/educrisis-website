// src/pages/Contact.jsx
import React, { useState } from "react";
import { useI18n } from "../context/I18nContext";

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("contactUs")}
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "#002866" }}
            >
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-white font-semibold rounded-md transition-colors"
                style={{ backgroundColor: "#002866" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0066CC")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#002866")
                }
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#002866" }}
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-3 mt-1"
                    style={{ color: "#0066CC" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@educrisis.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="font-semibold mb-2" style={{ color: "#002866" }}>
                Office Hours
              </h3>
              <p className="text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM (EET)
                <br />
                Saturday - Sunday: Closed
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
