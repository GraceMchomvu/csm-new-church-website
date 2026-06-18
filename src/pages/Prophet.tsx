import { motion } from 'framer-motion';
import { Star, Heart, BookOpen, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

const ministries = [
  { icon: Star, title: "Prophetic Ministry", desc: "Receive personal prophetic words, divine guidance, and spiritual direction for your life and destiny." },
  { icon: Heart, title: "Healing & Deliverance", desc: "Experience the healing power of God and freedom from every spiritual stronghold." },
  { icon: BookOpen, title: "Teaching & Discipleship", desc: "Grow in your faith through sound biblical teaching and systematic discipleship." },
];

export default function Prophet() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Leadership" title="Prophet Baraka David Ogillo" backgroundImage="/images/church/prophet-ministry-3.jpg" height="60vh" />

      {/* Biography */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-[40%_60%] gap-10 items-start">
            <ScrollReveal>
              <img src="/images/church/prophet-ministry-1.jpg" alt="Prophet Baraka David Ogillo" className="w-full max-w-sm mx-auto aspect-[3/4] object-cover rounded-xl shadow-elevated" />
            </ScrollReveal>
            <div>
              <ScrollReveal delay={0.1}>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-6">
                  A Voice for This Generation
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-stone-600 leading-relaxed mb-4">
                  Prophet Baraka David Ogillo is a mighty man of God called to proclaim the Gospel with power and demonstration of the Holy Spirit. Born and raised in Tanzania, he answered the divine call to establish Christ Synagogue Ministries in Arusha — a church that has become a beacon of hope for thousands.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-stone-600 leading-relaxed mb-4">
                  His ministry is characterized by a powerful prophetic anointing, accurate words of knowledge, and miraculous healings. Under his leadership, CSM has grown from a small gathering to a vibrant community of believers who are passionate about worship, prayer, and reaching the lost.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Prophet Ogillo believes that every believer is called to walk in the supernatural power of God. Through his teaching, he equips the saints to operate in spiritual gifts, to hear God's voice clearly, and to live a life of victory and purpose.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <blockquote className="border-l-4 border-teal pl-6 py-2 mb-6">
                  <p className="font-heading text-xl italic text-teal leading-relaxed">
                    "God has called us to be a light in the darkness, a voice of hope to the nations."
                  </p>
                </blockquote>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <p className="font-script text-2xl text-stone-600">— Prophet Baraka David Ogillo</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Highlights */}
      <section className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {ministries.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 0.15}>
                <div className="bg-white rounded-xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-stone-800 mb-2">{m.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Messages */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold text-white text-center mb-10">Recent Messages</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "The Power of Persistent Prayer", date: "Watch on YouTube", image: "/images/church/prayer-service-1.jpg" },
              { title: "Walking in Divine Favor", date: "Watch on YouTube", image: "/images/church/prophet-ministry-2.jpg" },
              { title: "Breaking Strongholds", date: "Watch on YouTube", image: "/images/church/prophecy-service-1.jpg" },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={0.1 + i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <img src={v.image} alt={v.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5 text-white rotate-[-30deg] ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-white font-medium group-hover:text-teal-light transition-colors">{v.title}</h4>
                  <span className="text-xs text-white/50">{v.date}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
