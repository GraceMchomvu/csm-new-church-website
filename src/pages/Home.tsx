import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Clock, MapPin, ChevronUp, Target, Eye, Heart, Sunrise, Users, MessageCircle, Calendar, ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { getUpcomingServices, socialLinks } from '../lib/churchData';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "I came to CSM broken and without hope. Through the prophetic ministry and the power of prayer, my life has been completely transformed. God restored my family and gave me a new purpose.",
    author: "Sarah M.",
    role: "Church Member"
  },
  {
    text: "The atmosphere at Christ Synagogue Ministries is unlike anything I've experienced. The presence of God is tangible, and the teaching has deepened my faith in ways I never imagined.",
    author: "James K.",
    role: "Church Member"
  },
  {
    text: "Prophet Ogillo's word over my life was precise and life-changing. I received healing, deliverance, and a fresh anointing. CSM is truly a place where miracles happen.",
    author: "Grace N.",
    role: "Church Member"
  },
];

const fallbackSermons = [
  { title: "Latest Sunday Service", date: "Watch on YouTube", image: "/images/church/congregation-1.jpg", url: "https://www.youtube.com/live/8ROz31sOu1E?si=Jx4cngDoZxSkKTxN" },
  { title: "Latest Prophetic Ministry", date: "Watch on YouTube", image: "/images/church/prophet-ministry-2.jpg", url: "https://www.youtube.com/live/YkenTxzYA8M?si=rDaCSsscXKEji3zQ" },
  { title: "Latest Worship Service", date: "Watch on YouTube", image: "/images/church/praise-worship-1.jpg", url: "https://www.youtube.com/live/P2vtGjaRRLI?si=UvWi3iqXsnnp5aA8" },
];

const communityMoments = [
  {
    title: "Worship",
    caption: "A house alive with praise",
    image: "/images/church/praise-worship-2.jpg",
    className: "community-photo-card community-photo-card--hero md:col-span-6 md:row-span-2",
  },
  {
    title: "Prayer",
    caption: "Families gathering in faith",
    image: "/images/church/prayer-service-1.jpg",
    className: "community-photo-card community-photo-card--tall md:col-span-3 md:row-span-2",
  },
  {
    title: "Testimonies",
    caption: "Stories of transformation",
    image: "/images/church/testimony-1.jpg",
    className: "community-photo-card community-photo-card--small md:col-span-3",
  },
  {
    title: "Fellowship",
    caption: "A community that feels like home",
    image: "/images/church/congregation-2.jpg",
    className: "community-photo-card community-photo-card--wide md:col-span-6",
  },
  {
    title: "Ministry",
    caption: "Moments of hope and healing",
    image: "/images/church/prophecy-service-1.jpg",
    className: "community-photo-card community-photo-card--small md:col-span-3",
  },
  {
    title: "Joy",
    caption: "People growing together",
    image: "/images/church/testimony-5.jpg",
    className: "community-photo-card community-photo-card--small md:col-span-3",
  },
];

const heroImages = [
  "/images/band.jpg",
  "/images/prayer-2.jpg",
  "/images/prayer-3.jpg",
  "/images/church/praise-worship-1.jpg",
  "/images/church/prayer-service-2.jpg",
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sermons, setSermons] = useState(fallbackSermons);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const crossLineRef = useRef<HTMLDivElement>(null);
  const upcomingServices = getUpcomingServices(currentDate);
  const nextService = upcomingServices[0];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-gsap', { opacity: 0, y: 28 });
      gsap.set('.hero-bg-img', { scale: 1.08 });
      gsap.set(crossLineRef.current, { scaleX: 0, transformOrigin: 'center' });

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero-bg-img', { scale: 1.02, duration: 2.2, stagger: 0.08 })
        .to('.hero-gsap', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.18);

      gsap.to('.hero-bg-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(crossLineRef.current, {
        scaleX: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: crossLineRef.current,
          start: 'top 88%',
          end: 'top 52%',
          scrub: 0.8,
        },
      });

      ScrollTrigger.batch('.gsap-card', {
        start: 'top 86%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, {
          opacity: 0,
          y: 34,
          rotateX: 8,
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
        }),
      });

      gsap.fromTo('.community-copy > *', {
        opacity: 0,
        y: 26,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.community-section',
          start: 'top 74%',
          once: true,
        },
      });

      gsap.fromTo('.community-photo-card', {
        opacity: 0,
        y: 70,
        scale: 0.92,
        rotate: -2,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.community-photo-grid',
          start: 'top 78%',
          once: true,
        },
      });

      gsap.to('.community-photo-card img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.community-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const feedUrl = encodeURIComponent(socialLinks.youtubeFeed);
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load sermons');
        return response.json();
      })
      .then((data) => {
        const latest = (data.items || []).slice(0, 3).map((item: any) => ({
          title: item.title,
          date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          image: item.thumbnail || item.enclosure?.link || "/images/church/congregation-1.jpg",
          url: item.link || socialLinks.youtube,
        }));

        if (latest.length) setSermons(latest);
      })
      .catch(() => setSermons(fallbackSermons));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.img
              key={image}
              src={image}
              alt=""
              aria-hidden="true"
              className="hero-bg-img absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: currentHeroImage === index ? 1 : 0,
                scale: currentHeroImage === index ? 1.04 : 1,
              }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 6 } }}
            />
          ))}
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(28,25,23,0.35) 0%, rgba(28,25,23,0.58) 48%, rgba(28,25,23,0.74) 100%), radial-gradient(ellipse at center, rgba(20,184,166,0.14) 0%, rgba(28,25,23,0.45) 72%)'
        }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <div className="hero-gsap mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              Arusha, Tanzania
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-gsap font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-shadow-hero leading-tight mb-6"
          >
            Helping People <span className="text-teal-light">Find and Follow</span> Jesus
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-gsap text-lg text-white/80 mb-4"
          >
            Christ Synagogue Ministries — Arusha, Tanzania
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hero-gsap inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8"
          >
            <Clock className="w-4 h-4 text-teal-light" />
            <span className="text-sm text-white font-medium">
              Next: {nextService.title} · {nextService.dateLabel} · {nextService.time} EAT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-gsap flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-teal text-white font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-button transition-all duration-200"
            >
              Plan Your Visit
            </Link>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/12 text-white border border-white/25 font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-white hover:text-charcoal transition-all duration-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> Watch Online
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-0.5 h-10 bg-white/40 rounded-full overflow-hidden">
            <div className="w-full h-3 bg-white/80 rounded-full animate-scroll-down" />
          </div>
        </motion.div>
      </section>

      {/* Cross Line */}
      <div ref={crossLineRef} className="w-[60%] max-w-[600px] mx-auto h-0.5 bg-teal origin-center" />

      {/* Welcome Section */}
      <section className="bg-cream py-20 lg:py-32">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="font-script text-4xl lg:text-5xl text-teal/30 block mb-4">Karibu</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-6">
              Welcome to Christ Synagogue Ministries
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-stone-600 leading-relaxed text-base lg:text-lg max-w-[680px] mx-auto mb-6">
              CSM is a vibrant community of believers in Arusha, Tanzania, dedicated to transforming lives through the power of the Holy Spirit. Under the leadership of Prophet Baraka David Ogillo, we gather to worship, grow in faith, and reach our nation with the Gospel.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link to="/about" className="inline-flex items-center gap-2 text-teal font-medium hover:underline transition-all">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Our Mission", text: "To glorify God and make disciples of all nations through the power of the Holy Spirit, transforming communities one life at a time." },
              { icon: Eye, title: "Our Vision", text: "To see a thriving community of believers transformed by God's love and truth, establishing the Kingdom of God across Tanzania and beyond." },
              { icon: Heart, title: "Our Values", text: "Faith, Integrity, Community, and Excellence — these are the pillars that guide everything we do at Christ Synagogue Ministries." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="gsap-card bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-teal" />
                  </div>
                  <h4 className="font-body text-lg font-semibold text-stone-800 mb-3">{item.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-[55%_45%] gap-10 items-center">
            <div>
              <ScrollReveal>
                <span className="text-xs uppercase tracking-[0.1em] text-teal font-medium mb-2 block">Latest Messages</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-4">
                  Powerful Word for Your Journey
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-stone-600 mb-8">
                  Be transformed by the teaching of God's Word. Watch or listen to our latest sermons from Prophet Baraka David Ogillo.
                </p>
              </ScrollReveal>

              <div className="space-y-4">
                {sermons.map((sermon, i) => (
                  <ScrollReveal key={sermon.title} delay={0.3 + i * 0.1}>
                    <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-stone-800 group-hover:text-teal transition-colors">{sermon.title}</h4>
                        <span className="text-xs text-stone-400">{sermon.date}</span>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.6}>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal font-medium mt-6 hover:underline">
                  View All Sermons <ArrowRight className="w-4 h-4" />
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="relative rounded-xl overflow-hidden shadow-card bg-charcoal">
                <iframe
                  src={socialLinks.youtubeUploadsEmbed}
                  title="Latest sermons from Baraka Ogillo Live"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.1em] text-teal-light font-medium mb-2 block">Our Services</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-4">
              Join Us in Worship
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/70 max-w-xl mx-auto mb-12">
              We gather throughout the week to worship, pray, and grow together in faith.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingServices.slice(0, 3).map((service, i) => (
              <ScrollReveal key={service.title} delay={0.3 + i * 0.15}>
                <div className="gsap-card bg-white/[0.06] border border-white/10 rounded-xl p-8 lg:p-10 hover:bg-white/[0.1] hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 text-left">
                  {i === 0 ? <Sunrise className="w-10 h-10 text-teal-light mb-4" /> : i === 1 ? <Users className="w-10 h-10 text-teal-light mb-4" /> : <MessageCircle className="w-10 h-10 text-teal-light mb-4" />}
                  <h4 className="font-body text-lg font-semibold text-white mb-1">{service.title}</h4>
                  <span className="text-xs text-teal-light/70 uppercase tracking-wider">{service.dateLabel} · {service.time} EAT</span>
                  <p className="text-sm text-white/60 mt-3 leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.1em] text-teal font-medium mb-2 block">Upcoming Events</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-10">
              Be Part of What's Happening
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-xl p-8 shadow-card mb-8 text-center">
              <h3 className="font-heading text-2xl font-semibold text-stone-800 mb-2">No Events Currently</h3>
              <p className="text-stone-500">Please join us for one of our upcoming weekly services.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            {upcomingServices.map((service, i) => (
              <ScrollReveal key={service.title} delay={0.3 + i * 0.1}>
                <div className="gsap-card bg-white rounded-xl overflow-hidden shadow-card transition-all duration-300">
                  <div className="bg-teal text-white p-5">
                    <span className="block text-3xl font-bold leading-none">{service.day}</span>
                    <span className="block text-xs uppercase tracking-wider font-medium mt-1">{service.month}</span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-body text-lg font-semibold text-stone-800 mb-2">{service.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                      <Clock className="w-3.5 h-3.5" /> {service.time} EAT
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> Arusha, Tanzania
                    </div>
                    <p className="text-sm text-stone-500">{service.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="text-center mt-8">
              <Link to="/events" className="inline-flex items-center gap-2 text-teal font-medium hover:underline">
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <div className="relative">
                <img src="/images/church/prophet-ministry-3.jpg" alt="Prophet Baraka David Ogillo" className="w-full max-w-md mx-auto aspect-[4/5] object-cover rounded-xl" />
                <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                  {[
                    { number: "15+", label: "Years of Ministry" },
                    { number: "1000s", label: "Lives Transformed" },
                    { number: "1", label: "Mighty God" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <span className="font-heading text-2xl text-teal font-semibold block">{stat.number}</span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.1}>
                <span className="text-xs uppercase tracking-[0.1em] text-teal font-medium mb-2 block">About Our Ministry</span>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-4">
                  Led by Prophet Baraka David Ogillo
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Christ Synagogue Ministries was founded under the divine calling of Prophet Baraka David Ogillo. With a heart for God's people and a powerful prophetic anointing, he has led CSM to become a beacon of hope in Arusha and beyond. His ministry is marked by signs, wonders, and the transformative power of the Holy Spirit.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <Link to="/prophet" className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-button transition-all duration-200">
                  Meet Our Prophet <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.1em] text-teal-light font-medium mb-2 block">Testimonies</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-12">
              Lives Transformed by Faith
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative min-h-[200px]">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-heading text-8xl text-teal/20 leading-none select-none">"</span>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === currentTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0'
                  }`}
                >
                  <p className="font-heading text-xl lg:text-2xl italic text-white/85 leading-relaxed max-w-2xl mx-auto mb-6">
                    {t.text}
                  </p>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentTestimonial ? 'bg-teal-light w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="community-section relative overflow-hidden bg-cream py-16 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid lg:grid-cols-[34%_1fr] gap-10 lg:gap-14 items-center">
            <div className="community-copy">
              <span className="text-xs uppercase tracking-[0.16em] text-teal font-semibold mb-3 block">Moments at CSM</span>
              <h2 className="font-heading text-3xl lg:text-5xl font-semibold text-stone-800 leading-tight mb-5">
                Experience Our Community
              </h2>
              <p className="text-stone-600 leading-relaxed mb-7">
                Worship, prayer, testimony, and fellowship come together in one living picture of CSM. This is more than a gallery - it is a glimpse of the people, warmth, and faith that fill the house each week.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { number: "6", label: "Weekly moments" },
                  { number: "1000s", label: "Lives touched" },
                  { number: "1", label: "Family in Christ" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-stone-200 bg-white/70 p-3 text-center shadow-xs">
                    <span className="font-heading text-2xl font-semibold text-teal block leading-none">{stat.number}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.08em] text-stone-500">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/photos" className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-teal hover:shadow-button">
                View Full Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="community-photo-grid grid grid-cols-1 md:grid-cols-12 auto-rows-[160px] sm:auto-rows-[190px] lg:auto-rows-[178px] gap-3 lg:gap-4">
              {communityMoments.map((moment, i) => (
                <Link
                  key={moment.title}
                  to="/photos"
                  className={`${moment.className} group relative isolate overflow-hidden rounded-lg bg-stone-200 shadow-card transition-transform duration-500 hover:-translate-y-1 hover:shadow-elevated`}
                  style={{ ['--tilt' as string]: `${i % 2 === 0 ? -1.4 : 1.2}deg` }}
                >
                  <img src={moment.image} alt={`${moment.title} at CSM`} className="absolute inset-0 h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/72 via-charcoal/12 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-light">{moment.title}</span>
                    <p className="mt-1 font-heading text-xl leading-tight text-shadow-sm">{moment.caption}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Directions */}
      <section className="bg-stone-100 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <ScrollReveal>
                <span className="text-xs uppercase tracking-[0.1em] text-teal font-medium mb-2 block">Visit Us</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-stone-800 mb-6">
                  Find Your Way to CSM
                </h2>
              </ScrollReveal>

              <div className="space-y-4">
                <ScrollReveal delay={0.2}>
                  <div>
                    <h4 className="font-body text-base font-semibold text-stone-800">Christ Synagogue Ministries</h4>
                    <p className="text-stone-500 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-teal shrink-0" />
                      Arusha, Tanzania
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <p className="text-stone-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal shrink-0" />
                    Sat 2:00 PM · Sun 10:00 AM · Tue/Thu 6:00 PM EAT
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                  <a href="tel:+255769075062" className="text-teal font-medium flex items-center gap-2 hover:underline">
                    <Phone className="w-4 h-4 shrink-0" />
                    +255 769 075 062
                  </a>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.5}>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Arusha+Tanzania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-teal text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-teal-dark transition-all"
                  >
                    Get Directions
                  </a>
                  <Link
                    to="/contact"
                    className="px-6 py-3 border border-teal text-teal font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-teal hover:text-white transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <div className="rounded-xl overflow-hidden shadow-card h-[400px] bg-stone-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.1989187271!2d36.58767665!3d-3.3983476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371c88f57bc19f%3A0x54c1482c9c56a432!2sArusha%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'hue-rotate(170deg) saturate(0.6)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CSM Location"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-charcoal py-16 lg:py-20">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <ScrollReveal>
            <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-2">
              <span className="text-teal-light">Stay</span> Connected
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-white/70 mb-6">
              Subscribe to receive updates on upcoming events, sermons, and ministry news from Christ Synagogue Ministries.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {subscribed ? (
              <p className="text-teal-light font-medium">Thank you for subscribing! ✓</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3.5 bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder:text-stone-400 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-teal text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-teal-dark transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xs text-white/40 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="overflow-hidden py-8 bg-cream border-y border-stone-200">
        <div className="space-y-3">
          <div className="flex animate-marquee-left whitespace-nowrap hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, set) => (
              <span key={set} className="font-script text-4xl lg:text-5xl text-teal/20 mx-6">
                Tunakusalimu ● Karibu CSM ● A Ministry of Healing ● Welcome Home ● Baraka Tele ●
              </span>
            ))}
          </div>
          <div className="flex animate-marquee-right whitespace-nowrap hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, set) => (
              <span key={set} className="font-script text-4xl lg:text-5xl text-stone-400/30 mx-6">
                Come Worship With Us ● Arusha, Tanzania ● Spirit-Filled Church ● Find Your Purpose ●
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center shadow-elevated hover:bg-teal-dark hover:scale-110 transition-all duration-300 z-40 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
