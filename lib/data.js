// Sample data used for the prototype version of Only Us

export const memories = [
  {
    id: 1,
    title: 'First Date at Yarra',
    date: '2025-02-14',
    location: 'Yarra River, Melbourne',
    cover:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    caption: 'A romantic evening by the river.',
    tags: ['date', 'yarra', 'first'],
    mood: 'romantic',
    favourite: true,
    description:
      'We had such a lovely time walking along the Yarra River after dinner. The city lights shimmering on the water were magical. We talked about everything and felt so connected.',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
  },
  {
    id: 2,
    title: 'Sunset Picnic',
    date: '2025-06-05',
    location: 'St Kilda Beach, Melbourne',
    cover:
      'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=800&q=80',
    caption: 'A cosy picnic watching the sun disappear.',
    tags: ['picnic', 'sunset', 'beach'],
    mood: 'peaceful',
    favourite: false,
    description:
      'We spread a blanket on the sand and unpacked our favourite treats. As the sun dipped below the horizon, the sky filled with shades of pink and orange. It felt like the world slowed down just for us.',
    images: [
      'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499062918703-bafa41acaa5a?auto=format&fit=crop&w=800&q=80'
    ],
  },
  {
    id: 3,
    title: 'Cooking Together',
    date: '2025-09-21',
    location: 'Our Little Kitchen',
    cover:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
    caption: 'Making pasta from scratch and laughing endlessly.',
    tags: ['cooking', 'home', 'fun'],
    mood: 'happy',
    favourite: false,
    description:
      'We spent the whole afternoon in the kitchen making handmade pasta. Flour was everywhere but so was our laughter. It reminded us that the simplest moments can be the most memorable.',
    images: [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
  },
];

export const diaryEntries = [
  {
    id: 1,
    title: 'Thinking of You',
    date: '2025-03-01',
    mood: 'romantic',
    note:
      'I just wanted to write down how grateful I am for you. Every day feels brighter knowing you’re by my side.',
  },
  {
    id: 2,
    title: 'Sunday Morning',
    date: '2025-07-16',
    mood: 'peaceful',
    note:
      'We spent the morning reading in bed, sipping coffee, and listening to the rain. Moments like these are my favourite.',
  },
  {
    id: 3,
    title: 'Late Night Thoughts',
    date: '2025-10-04',
    mood: 'thoughtful',
    note:
      'Sometimes I can’t sleep because I’m overwhelmed by how deeply I feel for you. Writing helps me calm my heart.',
  },
];

export const timelineEvents = [
  {
    id: 1,
    date: '2024-12-20',
    title: 'First Chat',
    description: 'We started talking online and couldn’t stop messaging each other.',
  },
  {
    id: 2,
    date: '2025-01-06',
    title: 'First Call',
    description: 'Our first phone call lasted hours and we laughed so much.',
  },
  {
    id: 3,
    date: '2025-02-14',
    title: 'First Date',
    description: 'Met in person at the Yarra River and enjoyed a romantic dinner.',
  },
  {
    id: 4,
    date: '2025-06-05',
    title: 'First Sunset Picnic',
    description: 'Watched the sun set at St Kilda Beach while sharing our dreams.',
  },
  {
    id: 5,
    date: '2025-09-21',
    title: 'First Meal Cooked Together',
    description: 'Made homemade pasta and realised cooking together is our new favourite thing.',
  },
];

export const bucketItems = [
  {
    id: 1,
    title: 'Hot Air Balloon Ride',
    category: 'Adventure',
    status: 'planned',
    note: 'Float high above the Yarra Valley and watch the sunrise together.',
  },
  {
    id: 2,
    title: 'Wine Tasting in the Barossa',
    category: 'Travel',
    status: 'planned',
    note: 'Tour the vineyards and savour the flavours of South Australia.',
  },
  {
    id: 3,
    title: 'Plant a Herb Garden',
    category: 'Home',
    status: 'done',
    note: 'We’ve already started growing basil and mint on the balcony!',
  },
];