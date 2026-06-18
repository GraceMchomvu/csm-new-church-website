import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

const galleryImages = [
  { src: "/images/church/congregation-1.jpg", category: "Community", title: "Congregation" },
  { src: "/images/church/congregation-2.jpg", category: "Community", title: "Church Family" },
  { src: "/images/church/praise-worship-1.jpg", category: "Worship", title: "Praise and Worship" },
  { src: "/images/church/praise-worship-2.jpg", category: "Worship", title: "Worship Ministry" },
  { src: "/images/church/prayer-service-1.jpg", category: "Ministry", title: "Prayer Service" },
  { src: "/images/church/prayer-service-2.jpg", category: "Ministry", title: "Prayer Gathering" },
  { src: "/images/church/prophecy-service-1.jpg", category: "Ministry", title: "Prophetic Ministry" },
  { src: "/images/church/prophet-ministry-1.jpg", category: "Ministry", title: "Prophet Baraka David Ogillo" },
  { src: "/images/church/prophet-ministry-2.jpg", category: "Ministry", title: "Ministry Moment" },
  { src: "/images/church/prophet-ministry-3.jpg", category: "Ministry", title: "Prophetic Service" },
  { src: "/images/church/testimony-1.jpg", category: "Community", title: "Testimony Time" },
  { src: "/images/church/testimony-2.jpg", category: "Community", title: "Testimony Moment" },
  { src: "/images/church/testimony-3.jpg", category: "Events", title: "Special Gathering" },
  { src: "/images/church/testimony-4.jpg", category: "Events", title: "Church Event" },
  { src: "/images/church/testimony-5.jpg", category: "Community", title: "Ministry Testimony" },
];

const filters = ["All", "Worship", "Events", "Community", "Ministry"];

export default function Photos() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeFilter === "All" ? galleryImages : galleryImages.filter(img => img.category === activeFilter);
  const lightboxSlides = filtered.map(img => ({ src: img.src, title: img.title }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Gallery" title="Moments at CSM" backgroundImage="/images/church/congregation-2.jpg" />

      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f ? 'bg-teal text-white' : 'bg-white text-stone-600 hover:bg-stone-100 shadow-sm'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <ScrollReveal key={`${img.src}-${i}`} delay={i * 0.05}>
                <div
                  className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group relative"
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors flex items-end p-4">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Share Photos CTA */}
      <section className="bg-stone-100 py-12">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h3 className="font-heading text-2xl font-semibold text-stone-800 mb-2">Share Your CSM Moments</h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-stone-500 mb-6">Were you blessed by a service or event? Share your photos with us!</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a
              href="mailto:info@csm.church?subject=Photo Submission"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold text-sm rounded-lg hover:bg-teal-dark transition-all"
            >
              Submit Photos
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </motion.div>
  );
}
