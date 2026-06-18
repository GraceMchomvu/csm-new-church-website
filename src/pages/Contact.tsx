import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Youtube, Facebook, Music2, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { services, socialLinks } from '../lib/churchData';

const contactInfo = [
  { icon: Phone, label: "+255 769 075 062", href: "tel:+255769075062", sub: "Call or WhatsApp us" },
  { icon: Mail, label: "info@csm.church", href: "mailto:info@csm.church", sub: "We'll respond within 24 hours" },
  { icon: MapPin, label: "Arusha, Tanzania", href: null, sub: "Visit us during service hours" },
];

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: 'General Inquiry', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sent');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Get in Touch" title="Contact Us" backgroundImage="/images/prayer-1.jpg" />

      {/* Contact Info & Form */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left - Info */}
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-4">
                  We'd Love to Hear From You
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-stone-600 mb-8">
                  Whether you have a question, need prayer, or want to learn more about CSM, our team is here for you.
                </p>
              </ScrollReveal>

              <div className="space-y-5 mb-8">
                {contactInfo.map((item, i) => (
                  <ScrollReveal key={item.label} delay={0.2 + i * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        {item.href ? (
                          <a href={item.href} className="text-stone-800 font-medium hover:text-teal transition-colors">{item.label}</a>
                        ) : (
                          <span className="text-stone-800 font-medium">{item.label}</span>
                        )}
                        <p className="text-xs text-stone-400">{item.sub}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal" /> Service Hours
                  </h4>
                  <div className="space-y-2">
                    {services.map(s => (
                      <div key={s.title} className="flex justify-between gap-6 text-sm max-w-[260px]">
                        <span className="text-stone-600">{s.title}</span>
                        <span className="text-stone-800 font-medium">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-3">Connect With Us</h4>
                  <div className="flex items-center gap-3">
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-red-600 transition-colors" aria-label="YouTube">
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-teal transition-colors" aria-label="TikTok">
                      <Music2 className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Form */}
            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card">
                {formState === 'sent' ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-teal" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-stone-800 mb-2">Thank You!</h3>
                    <p className="text-stone-500">Your message has been sent. We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-stone-700 mb-1 block">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-stone-700 mb-1 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-stone-700 mb-1 block">Phone (optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                        placeholder="+255..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-stone-700 mb-1 block">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                      >
                        <option>General Inquiry</option>
                        <option>Prayer Request</option>
                        <option>Partnership</option>
                        <option>Visit</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-stone-700 mb-1 block">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-vertical"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-teal text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-teal-dark transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.1989187271!2d36.58767665!3d-3.3983476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371c88f57bc19f%3A0x54c1482c9c56a432!2sArusha%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'hue-rotate(170deg) saturate(0.6)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CSM Location Map"
        />
      </section>
    </motion.div>
  );
}
