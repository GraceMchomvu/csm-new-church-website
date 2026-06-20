import { motion } from 'framer-motion';
import { Target, Eye, Heart, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To glorify God and make disciples of all nations through the power of the Holy Spirit. We are committed to preaching the Gospel, healing the broken, and equipping believers for their divine purpose."
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To see a thriving community of believers transformed by God's love and truth, establishing the Kingdom of God across Tanzania and the nations of the world."
  },
  {
    icon: Heart,
    title: "Our Core Values",
    text: "Faith — We believe in the power of God to do the impossible. Integrity — We uphold the highest standards of character. Community — We are a family that loves and supports one another. Excellence — We give our best in everything for God's glory."
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHero
        eyebrow="About Us"
        title="Our Story & Mission"
        backgroundImage="./images/congregation.jpg"
        height="60vh"
      />

      {/* Our Story */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-[55%_45%] gap-10 items-center">
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-6">
                  A Church Called to Transform
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Christ Synagogue Ministries was founded under the divine calling of Prophet Baraka David Ogillo in Arusha, Tanzania. What began as a small gathering of faithful believers has grown into a vibrant Spirit-filled community that impacts thousands of lives across the nation.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Our church is built on the foundation of prayer, the prophetic word, and the power of the Holy Spirit. We believe in miracles, signs, and wonders as the evidence of God's presence among His people. Every service is an encounter with the living God.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <blockquote className="border-l-4 border-teal pl-6 py-2">
                  <p className="font-heading text-xl italic text-teal leading-relaxed">
                    "We are not just building a church; we are building a movement of transformed lives."
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2}>
              <img src="./images/church/praise-worship-2.jpg" alt="CSM Worship" className="w-full rounded-xl shadow-elevated" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-4 space-y-6">
          {values.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="bg-white rounded-xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-start shadow-card">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-stone-800 mb-3">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 text-center mb-10">
              Our Leadership
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-xl overflow-hidden shadow-card max-w-md mx-auto">
              <img
                src="./images/church/prophet-ministry-1.jpg"
                alt="Prophet Baraka David Ogillo"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="font-heading text-2xl font-semibold text-stone-800">
                  Prophet Baraka David Ogillo
                </h3>
                <p className="text-sm text-teal font-medium mb-3">Founder & Senior Prophet</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Called by God to establish a ministry of healing, deliverance, and prophetic revelation in Arusha, Tanzania. Prophet Ogillo has a heart for seeing people transformed by the power of the Holy Spirit.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-16">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold text-white mb-4">
              Come Worship With Us
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-white/80 mb-8">
              We would love to welcome you to Christ Synagogue Ministries. Join us this Sunday and experience the power of God.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-charcoal hover:text-white transition-all"
            >
              Plan Your Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
