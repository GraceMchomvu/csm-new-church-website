import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Youtube, Facebook, Music2 } from 'lucide-react';
import { services, socialLinks } from '../lib/churchData';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Events', path: '/events' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Prophet', path: '/prophet' },
  { label: 'Photos', path: '/photos' },
  { label: 'Give', path: '/give' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex mb-4">
              <span className="font-heading text-xl font-bold text-white leading-tight">Christ Synagogue Ministry</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              A vibrant Spirit-filled community in Arusha, Tanzania, dedicated to helping people find and follow Jesus through the power of the Holy Spirit.
            </p>
            <div className="flex items-center gap-3">
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-teal transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-teal transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-teal transition-colors" aria-label="TikTok">
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.05em] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-white transition-colors inline-flex">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.05em] mb-4">Service Times</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title} className="flex flex-col">
                  <span className="text-sm text-white/60">{s.title}</span>
                  <span className="text-sm text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal" />
                    {s.time} EAT
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.05em] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+255769075062" className="text-sm text-white/60 hover:text-teal transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal shrink-0" />
                  +255 769 075 062
                </a>
              </li>
              <li>
                <a href="mailto:info@csm.church" className="text-sm text-white/60 hover:text-teal transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal shrink-0" />
                  info@csm.church
                </a>
              </li>
              <li>
                <span className="text-sm text-white/60 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  Arusha, Tanzania
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 Christ Synagogue Ministries. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
