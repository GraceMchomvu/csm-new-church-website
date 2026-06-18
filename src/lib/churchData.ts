export const socialLinks = {
  website: 'https://csm.church/',
  youtube: 'https://www.youtube.com/@ogillob',
  youtubeFeed: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCPZvI54-Y9RCndQ1nwMZkqQ',
  youtubeUploadsEmbed: 'https://www.youtube.com/embed/videoseries?list=UUPZvI54-Y9RCndQ1nwMZkqQ',
  facebook: 'https://web.facebook.com/Prophetbaraka.ogillo',
  tiktok: 'https://www.tiktok.com/@propheticpowertvp',
};

export const services = [
  {
    title: 'Saturday Service',
    weekday: 6,
    time: '2:00 PM',
    description: 'Fellowship, worship, and spiritual growth.',
  },
  {
    title: 'Sunday Service',
    weekday: 0,
    time: '10:00 AM',
    description: "Worship, prophetic ministry, and teaching of God's Word.",
  },
  {
    title: 'Tuesday Service',
    weekday: 2,
    time: '6:00 PM',
    description: 'Midweek prayer and fellowship.',
  },
  {
    title: 'Thursday Service',
    weekday: 4,
    time: '6:00 PM',
    description: 'Worship and ministry.',
  },
];

export type UpcomingService = (typeof services)[number] & {
  date: Date;
  month: string;
  day: string;
  dateLabel: string;
};

export function getUpcomingServices(from = new Date()): UpcomingService[] {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);

  return services
    .map((service) => {
      const date = new Date(today);
      const daysUntil = (service.weekday - today.getDay() + 7) % 7;
      date.setDate(today.getDate() + daysUntil);

      return {
        ...service,
        date,
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        day: date.toLocaleDateString('en-US', { day: '2-digit' }),
        dateLabel: date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
