import { useState } from "react";
import Reveal from "../../components/Reveal";

function Contact() {
  // Simple local state for now — no backend wired up yet.
  // We'll connect this to a real API endpoint in a later step if needed.
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <Reveal>
        <h1 className="page-heading">Contact Us</h1>
        <p className="page-subheading">
          Have a question about this project? Send us a message below.
        </p>

        {submitted ? (
          <p className="mt-6 font-semibold text-success-600">
            Thanks! Your message has been received.
          </p>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="input-field resize-y"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        )}
      </Reveal>
    </div>
  );
}

export default Contact;
