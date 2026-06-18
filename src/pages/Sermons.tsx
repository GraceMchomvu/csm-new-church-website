import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { socialLinks } from '../lib/churchData';

const fallbackSermons = [
  { title: "Latest Sunday Service", date: "Watch on YouTube", series: "YouTube", image: "/images/church/congregation-1.jpg", url: "https://www.youtube.com/live/8ROz31sOu1E?si=Jx4cngDoZxSkKTxN" },
  { title: "Latest Prophetic Ministry", date: "Watch on YouTube", series: "YouTube", image: "/images/church/prophet-ministry-2.jpg", url: "https://www.youtube.com/live/YkenTxzYA8M?si=rDaCSsscXKEji3zQ" },
  { title: "Latest Worship Service", date: "Watch on YouTube", series: "YouTube", image: "/images/church/praise-worship-1.jpg", url: "https://www.youtube.com/live/P2vtGjaRRLI?si=UvWi3iqXsnnp5aA8" },
];

export default function Sermons() {
  const [search, setSearch] = useState('');
  const [sermons, setSermons] = useState(fallbackSermons);

  useEffect(() => {
    const loadSermons = () => {
      const feedUrl = encodeURIComponent(socialLinks.youtubeFeed);
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`)
        .then((response) => {
          if (!response.ok) throw new Error('Unable to load sermons');
          return response.json();
        })
        .then((data) => {
          const latest = (data.items || []).slice(0, 12).map((item: any) => ({
            title: item.title,
            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            series: 'YouTube',
            image: item.thumbnail || item.enclosure?.link || "/images/church/congregation-1.jpg",
            url: item.link || socialLinks.youtube,
          }));

          if (latest.length) setSermons(latest);
        })
        .catch(() => setSermons(fallbackSermons));
    };

    loadSermons();
    const interval = setInterval(loadSermons, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = sermons.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <PageHero eyebrow="Messages" title="Sermons & Teachings" backgroundImage="/images/worship-service-1.jpg" />

      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <ScrollReveal>
            <div className="bg-charcoal rounded-xl overflow-hidden shadow-card mb-8">
              <iframe
                src={socialLinks.youtubeUploadsEmbed}
                title="Latest sermons from Baraka Ogillo Live"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-[65%_35%] gap-8">
            {/* Sermon List */}
            <div className="space-y-4">
              {filtered.map((sermon, i) => (
                <ScrollReveal key={sermon.title} delay={i * 0.08}>
                  <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex group cursor-pointer">
                    <div className="relative w-40 shrink-0 overflow-hidden">
                      <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-wider text-teal font-medium">{sermon.series}</span>
                      <h4 className="font-body text-base font-semibold text-stone-800 group-hover:text-teal transition-colors">{sermon.title}</h4>
                      <span className="text-xs text-stone-400 mt-1">Prophet Baraka David Ogillo &middot; {sermon.date}</span>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-white rounded-xl p-5 shadow-card">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search sermons..."
                      className="w-full pl-10 pr-4 py-3 bg-stone-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
                >
                  Subscribe to our YouTube <ArrowRight className="w-4 h-4" />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
