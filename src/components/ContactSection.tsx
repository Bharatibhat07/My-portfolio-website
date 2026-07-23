import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailJsPublicKey) {
  emailjs.init(emailJsPublicKey);
}

const contacts = [
  { icon: Mail, label: "bharatibhat39@gmail.com", href: "mailto:bharatibhat39@gmail.com" },
  { icon: Phone, label: "+91 8277333157 / 8431289243", href: "tel:8277333157" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/bharati-bhat-418483329" },
  { icon: Github, label: "GitHub", href: "https://github.com/Bharatibhat07" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/bharati_bhat_07" },
];

const API_URL = "/api/contacts";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const saveResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        throw new Error(errorText || "Failed to save message to the database");
      }

      console.log("Message saved to database");

      try {
        const emailParams = {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Bharati S Bhat",
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id",
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id",
          emailParams
        );
        console.log("Email sent successfully");
        toast.success("Message saved and sent successfully!");
      } catch (emailError) {
        console.error("Email send failed after saving to database:", emailError);
        toast.success("Message saved to the database. Email delivery could not be completed.");
      }

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Main error:", err);
      toast.error("Failed to save and send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative section-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 neon-text">Get In Touch</h2>
        <p className="text-muted-foreground mb-12 max-w-lg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl">
          {/* Left - Contact Info */}
          <div className="flex-1 space-y-5">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 text-foreground/70 hover:text-neon-purple transition-colors group"
              >
                <c.icon size={18} className="text-neon-purple" />
                <span className="text-sm">{c.label}</span>
              </a>
            ))}
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-purple/50 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-purple/50 transition-colors"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-purple/50 transition-colors resize-none"
              required
            />
            <button type="submit" disabled={sending} className="btn-neon w-full sm:w-auto disabled:opacity-50">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
