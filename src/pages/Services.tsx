import { motion } from 'framer-motion';
import { Sunrise, Users, MessageCircle, Heart, BookOpen, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';
import { services as churchServices } from '../lib/churchData';

const services = [
  {
    icon: Sunrise,
    title: churchServices[1].title,
    time: `Every Sunday at ${churchServices[1].time} EAT`,
    description: "Our main worship service is the highlight of our week. Join us for powerful praise and worship, followed by transformative teaching from Prophet Baraka David Ogillo. Experience the presence of God in a life-changing way.",
    features: ["Dynamic Praise & Worship", "Powerful Sermons", "Altar Call & Prayer", "Fellowship"],
  },
  {
    icon: Users,
    title: churchServices[0].title,
    time: `Every Saturday at ${churchServices[0].time} EAT`,
    description: churchServices[0].description,
    features: ["Fellowship", "Praise & Worship", "Spiritual Growth", "Prayer"],
  },
  {
    icon: MessageCircle,
    title: churchServices[2].title,
    time: `Every Tuesday at ${churchServices[2].time} EAT`,
    description: churchServices[2].description,
    features: ["Midweek Prayer", "Fellowship", "Bible Teaching", "Intercession"],
  },
  {
    icon: Heart,
    title: churchServices[3].title,
    time: `Every Thursday at ${churchServices[3].time} EAT`,
    description: churchServices[3].description,
    features: ["Worship", "Ministry", "Prayer", "Encouragement"],
  },
  {
    icon: Heart,
    title: "Counseling & Support",
    time: "By Appointment",
    description: "Our pastoral team provides biblical counseling and spiritual guidance for individuals and families going through challenging seasons. You don't have to walk alone.",
    features: ["Marriage Counseling", "Family Support", "Crisis Care", "Spiritual Direction"],
  },
  {
    icon: BookOpen,
    title: "Bible Study & Discipleship",
    time: "Various Times",
    description: "Grow deeper in your faith through systematic Bible study and discipleship programs. We offer classes for new believers, leadership training, and advanced theological studies.",
    features: ["New Believers Class", "Leadership Training", "Theology Courses", "Mentorship"],
  },
];

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Our Services" title="Join Us in Worship" backgroundImage="./images/worship-service-2.jpg" height="50vh" />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-7 h-7 text-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-stone-800">{service.title}</h3>
                        <span className="text-xs text-teal font-medium uppercase tracking-wider">{service.time}</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map(f => (
                          <span key={f} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full font-medium">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-16">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold text-white mb-4">
              We'd Love to See You
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-white/80 mb-8">
              No matter where you are on your spiritual journey, there's a place for you at Christ Synagogue Ministries.
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
