import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  backgroundImage: string;
  height?: string;
}

export default function PageHero({ eyebrow, title, backgroundImage, height = '50vh' }: PageHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: `max(${height}, 300px)` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(20,184,166,0.1) 100%)'
      }} />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs uppercase tracking-[0.1em] text-teal-light mb-4"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-shadow-hero mb-4"
        >
          {title}
        </motion.h1>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-white/60"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/40">{title}</span>
        </motion.nav>
      </div>
    </section>
  );
}
