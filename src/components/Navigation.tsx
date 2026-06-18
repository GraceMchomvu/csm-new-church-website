import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Events', path: '/events' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Prophet', path: '/prophet' },
  { label: 'Photos', path: '/photos' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className={`font-heading text-lg sm:text-xl font-bold leading-tight tracking-tight ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}>
                Christ Synagogue Ministry
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-200 ${
                    location.pathname === link.path
                      ? scrolled ? 'text-teal' : 'text-teal-light'
                      : scrolled ? 'text-stone-600 hover:text-teal' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                      scrolled ? 'bg-teal' : 'bg-teal-light'
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className={`hidden lg:flex items-center gap-1.5 text-xs font-medium transition-colors ${
                scrolled ? 'text-stone-600 hover:text-teal' : 'text-white/80 hover:text-white'
              }`}>
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>
              <Link
                to="/give"
                className={`hidden sm:inline-flex px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  scrolled
                    ? 'bg-teal text-white hover:bg-teal-dark hover:shadow-button'
                    : 'bg-white/15 text-white border border-white/25 hover:bg-white hover:text-charcoal'
                }`}
              >
                Give
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 -mr-2"
                aria-label="Open menu"
              >
                <Menu className={`w-6 h-6 ${scrolled ? 'text-stone-700' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-cream shadow-[ -4px_0_24px_rgba(0,0,0,0.1) ] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-[72px] px-6 border-b border-stone-200">
            <span className="font-heading text-xl font-bold text-charcoal">Christ Synagogue Ministry</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6 text-stone-600" />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`py-3 text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-teal'
                    : 'text-stone-600 hover:text-teal'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/give"
              onClick={() => setIsOpen(false)}
              className="mt-4 py-3 px-4 bg-teal text-white rounded-lg text-center text-sm font-semibold uppercase tracking-wider"
            >
              Give
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
