import { motion } from 'framer-motion';
import { Smartphone, Landmark, Church } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

const methods = [
  {
    icon: Smartphone,
    title: "M-Pesa",
    desc: "Give via M-Pesa",
    details: ["Send to: +255 769 075 062", "Name: Christ Synagogue Ministries"],
  },
  {
    icon: Landmark,
    title: "Bank Transfer",
    desc: "CRDB Bank",
    details: ["Account: 015C922043100", "Name: CHRISTS SYNAGOGUE MINISTRY"],
  },
  {
    icon: Church,
    title: "In Person",
    desc: "Give during our Sunday service",
    details: ["Offering baskets are available", "during worship"],
  },
];

export default function Give() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Partner With Us" title="Give to the Work of God" backgroundImage="./images/testimony.jpg" />

      {/* Giving Options */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-4">
              Ways to Give
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-stone-600 max-w-2xl mx-auto mb-12">
              Your generous support enables us to continue spreading the Gospel, serving our community, and transforming lives across Tanzania.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {methods.map((m, i) => (
              <ScrollReveal key={m.title} delay={0.2 + i * 0.15}>
                <div className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-center">
                  <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-7 h-7 text-teal" />
                  </div>
                  <h4 className="font-body text-lg font-semibold text-stone-800 mb-1">{m.title}</h4>
                  <p className="text-sm text-teal font-medium mb-3">{m.desc}</p>
                  {m.details.map((d, j) => (
                    <p key={j} className="text-sm text-stone-500">{d}</p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Give */}
      <section className="bg-stone-100 py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold text-stone-800 mb-6">
              The Blessing of Giving
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <blockquote className="mb-6">
              <p className="font-heading text-xl lg:text-2xl italic text-teal leading-relaxed">
                "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
              </p>
              <cite className="text-sm text-stone-500 mt-2 block not-italic">— Luke 6:38</cite>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-stone-600 leading-relaxed">
              Your giving supports our ministry operations, community outreach programs, missions work, and the care of those in need. Every contribution, no matter the size, makes a difference. Thank you for partnering with us to advance the Kingdom of God.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
