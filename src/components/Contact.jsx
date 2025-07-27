import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // IntersectionObserver to fade-in on scroll
  useEffect(() => {
    if (!window.IntersectionObserver) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    const el = document.getElementById('contact');
    el && obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Basic front-end validation
  const validate = () => {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'At least 2 characters';
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (form.subject.trim().length < 5) errs.subject = 'At least 5 characters';
    if (form.message.trim().length < 10) errs.message = 'At least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!validate()) return;

    setSending(true);
    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      setSuccessMessage("✅ Message sent! I'll be in touch soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setErrorMessage('❌ Something went wrong. Please try again later.');
    }
    setSending(false);
  };

  const infoBlocks = [
    { icon: '📍', label: 'Location', value: 'Lahore, Pakistan' },
    { icon: '⏰', label: 'Response Time', value: 'Usually within 24 hours' },
    { icon: '💼', label: 'Availability', value: 'Open to new opportunities' },
  ];

  const socialLinks = [
    { icon: '🔗', url: '#' },
    { icon: '💼', url: '#' },
    { icon: '🐦', url: '#' },
    { icon: '✉️', url: 'mailto:hello@yourname.dev' },
  ];

  return (
    <section
      id="contact"
      className="snap-start min-h-screen py-20 lg:py-32 bg-secondary/5"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold mb-2">
            Get In <span className="text-indigo-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-indigo-500 rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Let's discuss your next project or just say hello
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold">Let's work together</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm always interested in hearing about new opportunities, whether that's a
              full-time role, consulting work, or just a chat about technology and best practices.
            </p>

            {infoBlocks.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                  {icon}
                </div>
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              </div>
            ))}

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-110"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
              {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
