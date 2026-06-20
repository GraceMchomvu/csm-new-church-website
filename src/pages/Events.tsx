import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { getUpcomingServices } from '../lib/churchData';

export default function Events() {
  const upcomingServices = getUpcomingServices();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Events" title="Upcoming Events" backgroundImage="./images/prayer-ministry.jpg" />

      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <ScrollReveal>
            <div className="bg-white rounded-xl p-8 shadow-card mb-8 text-center">
              <h2 className="font-heading text-3xl font-semibold text-stone-800 mb-3">No Events Currently</h2>
              <p className="text-stone-500 max-w-xl mx-auto">
                There are no special events listed right now. Our weekly services continue at the times below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingServices.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card transition-all duration-300">
                  <div className="bg-teal text-white p-5">
                    <span className="block text-3xl font-bold leading-none">{service.day}</span>
                    <span className="block text-xs uppercase tracking-wider font-medium mt-1">{service.month}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-stone-800 mb-2">{service.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                      <Clock className="w-3.5 h-3.5" /> {service.time} EAT
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> Arusha, Tanzania
                    </div>
                    <p className="text-sm text-stone-500 mb-4">{service.description}</p>
                    <span className="text-xs uppercase tracking-wider text-teal font-medium">{service.dateLabel}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-12">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h3 className="font-heading text-2xl font-semibold text-white mb-2">Have an Event Idea?</h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-white/80 mb-6">We'd love to hear from you. Contact us to discuss your event.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal font-semibold text-sm rounded-lg hover:bg-charcoal hover:text-white transition-all">
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
