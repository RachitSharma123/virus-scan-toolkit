import { Music, MapPin, Gift, HeartHandshake } from 'lucide-react';

/**
 * About page sharing a short narrative of the couple's journey and their favourite things.
 */
export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-script text-dark mb-6 text-center">Our Story</h1>
      <section className="mb-12">
        <p className="text-gray-700 leading-relaxed">
          We met on a warm summer evening and instantly felt a connection. Since then, our journey has been a collection of
          little moments — from long walks along the Yarra to rainy mornings spent reading in bed. Each day we learn
          something new about each other and ourselves, and through it all, our love grows stronger. This space is our
          digital scrapbook, a place where we can revisit our favourite memories and look forward to making new ones.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-script text-dark mb-4">Our Favourite Places</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-primary" /> St Kilda Beach
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-primary" /> The Botanic Gardens
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-primary" /> Our cosy kitchen
          </li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-script text-dark mb-4">Our Favourite Songs</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-700">
            <Music className="w-5 h-5 text-primary" /> “Perfect” by Ed Sheeran
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <Music className="w-5 h-5 text-primary" /> “Yellow” by Coldplay
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <Music className="w-5 h-5 text-primary" /> “Can’t Help Falling in Love” by Elvis Presley
          </li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-script text-dark mb-4">Our Traditions</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-700">
            <Gift className="w-5 h-5 text-primary" /> Sunday pancake breakfasts
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <Gift className="w-5 h-5 text-primary" /> Annual movie marathon on New Year’s Eve
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <Gift className="w-5 h-5 text-primary" /> Leaving little notes for each other
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-script text-dark mb-4">What We Love Most</h2>
        <p className="text-gray-700 leading-relaxed">
          Above all, we love how our relationship feels like home. Whether we’re out exploring or just doing nothing
          together, we find joy in the simplicity of our togetherness. Only Us is a celebration of that feeling — a
          reminder that every moment shared is a treasure.
        </p>
      </section>
    </div>
  );
}