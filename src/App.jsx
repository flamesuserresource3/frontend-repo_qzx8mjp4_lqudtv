import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ItineraryCard from "./components/ItineraryCard";
import DetailsModal from "./components/DetailsModal";
import Footer from "./components/Footer";

const SAMPLE_ITINERARIES = [
  {
    id: "bali-5",
    title: "5 Days in Bali",
    destination: "Bali, Indonesia",
    price: 899,
    description: "Temples, beaches and waterfalls.",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Arrive in Denpasar, Uluwatu sunset",
      "Ubud temples and rice terraces",
      "Tegenungan waterfall and coffee tour",
      "Nusa Penida island tour",
      "Beach day and departure",
    ],
  },
  {
    id: "paris-4",
    title: "Paris Essentials (4D)",
    destination: "Paris, France",
    price: 1099,
    description: "Louvre, Eiffel and Seine cruise.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Louvre and Tuileries",
      "Eiffel Tower and Champ de Mars",
      "Montmartre and Sacré-Cœur",
      "Seine cruise and shopping",
    ],
  },
  {
    id: "tokyo-6",
    title: "Tokyo Discovery (6D)",
    destination: "Tokyo, Japan",
    price: 1499,
    description: "Tradition meets neon future.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Asakusa and Senso-ji",
      "Akihabara and Ueno Park",
      "Shibuya and Harajuku",
      "Nikko day trip",
      "Tsukiji market and Odaiba",
      "自由行 & departure",
    ],
  },
  {
    id: "rome-5",
    title: "Classic Rome (5D)",
    destination: "Rome, Italy",
    price: 999,
    description: "Colosseum, Vatican and piazzas.",
    image:
      "https://images.unsplash.com/photo-1525708827920-7b86b0b14c49?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Colosseum and Roman Forum",
      "Vatican Museums and St. Peter's",
      "Trevi Fountain and Spanish Steps",
      "Trastevere food walk",
      "Ostia Antica half-day",
    ],
  },
  {
    id: "bkk-4",
    title: "Bangkok & Temples (4D)",
    destination: "Bangkok, Thailand",
    price: 699,
    description: "Street food and glittering wats.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Grand Palace & Wat Pho",
      "Floating market & Chinatown",
      "Ayutthaya ruins",
      "Shopping & river cruise",
    ],
  },
  {
    id: "nyc-5",
    title: "New York Highlights (5D)",
    destination: "New York, USA",
    price: 1299,
    description: "Skylines, museums and Broadway.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Times Square & Broadway",
      "Central Park & Museums",
      "Statue of Liberty & Ellis Island",
      "Brooklyn & DUMBO",
      "High Line & Chelsea Market",
    ],
  },
  {
    id: "syd-6",
    title: "Sydney & Blue Mountains (6D)",
    destination: "Sydney, Australia",
    price: 1599,
    description: "Harbour, beaches and bushwalks.",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Sydney Opera House & Harbour",
      "Bondi to Coogee coastal walk",
      "Taronga Zoo & Manly",
      "Blue Mountains day trip",
      "Hunter Valley tasting",
      "Free day & departure",
    ],
  },
  {
    id: "capad-5",
    title: "Cappadocia Balloons (5D)",
    destination: "Cappadocia, Türkiye",
    price: 1199,
    description: "Fairy chimneys and sunrise balloons.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
    days: [
      "Göreme Open-Air Museum",
      "Hot air balloon & valleys",
      "Underground city",
      "ATV sunset tour",
      "Pottery & departure",
    ],
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [bucket, setBucket] = useState([]); // ids
  const [quotes, setQuotes] = useState([]);
  const [explorePage, setExplorePage] = useState(1);
  const pageSize = 8;

  const featured = useMemo(() => SAMPLE_ITINERARIES.slice(0, 3), []);

  const toggleBucket = (it) => {
    setBucket((prev) =>
      prev.includes(it.id) ? prev.filter((id) => id !== it.id) : [...prev, it.id]
    );
  };

  const handleSubmitQuotation = (q) => {
    const itinerary = SAMPLE_ITINERARIES.find((i) => i.id === q.itineraryId);
    setQuotes((prev) => [
      ...prev,
      {
        id: `${q.itineraryId}-${Date.now()}`,
        destination: itinerary?.destination || "",
        title: itinerary?.title || "",
        dates: `${q.start} → ${q.end}`,
        adults: q.adults,
        children: q.children,
        status: "Pending",
      },
    ]);
  };

  const renderHero = () => (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Plan your next adventure with <span className="text-blue-600">TripGullack</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover curated itineraries and plan your trips smarter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setPage("explore")}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
            >
              Explore Trips
            </button>
            <button
              onClick={() => alert("Gullack SIP coming soon")}
              className="px-6 py-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 text-gray-700"
            >
              Start Gullack
            </button>
          </div>
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=1600&auto=format&fit=crop"
            alt="Travel collage"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );

  const renderFeatured = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Itineraries</h2>
          <p className="text-gray-500">Handpicked trips to get you started</p>
        </div>
        <button
          onClick={() => setPage("explore")}
          className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
        >
          Explore More
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((it) => (
          <ItineraryCard
            key={it.id}
            itinerary={it}
            onView={(i) => setSelected(i)}
            onToggleBucket={toggleBucket}
            inBucket={bucket.includes(it.id)}
          />
        ))}
      </div>
    </section>
  );

  const renderExplore = () => {
    const totalPages = Math.ceil(SAMPLE_ITINERARIES.length / pageSize);
    const start = (explorePage - 1) * pageSize;
    const view = SAMPLE_ITINERARIES.slice(start, start + pageSize);

    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explore All Trips</h2>
            <p className="text-gray-500">Browse and add to your bucket list</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {view.map((it) => (
            <ItineraryCard
              key={it.id}
              itinerary={it}
              onView={(i) => setSelected(i)}
              onToggleBucket={toggleBucket}
              inBucket={bucket.includes(it.id)}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setExplorePage((p) => Math.max(1, p - 1))}
            disabled={explorePage === 1}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:border-blue-400"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {explorePage} of {totalPages}
          </span>
          <button
            onClick={() => setExplorePage((p) => Math.min(totalPages, p + 1))}
            disabled={explorePage === totalPages}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:border-blue-400"
          >
            Next
          </button>
        </div>
      </section>
    );
  };

  const renderBucket = () => {
    const items = SAMPLE_ITINERARIES.filter((i) => bucket.includes(i.id));
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My BucketList</h2>
            <p className="text-gray-500">Saved trips for later</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="text-center text-gray-500 bg-white border border-gray-100 rounded-xl p-10">
            No trips saved yet. Explore and add your favorites!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((it) => (
              <ItineraryCard
                key={it.id}
                itinerary={it}
                onView={(i) => setSelected(i)}
                onToggleBucket={toggleBucket}
                inBucket={bucket.includes(it.id)}
              />
            ))}
          </div>
        )}
      </section>
    );
  };

  const renderQuotes = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Quotations</h2>
          <p className="text-gray-500">Track quotation requests</p>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Destination</th>
              <th className="text-left font-semibold px-4 py-3">Trip Dates</th>
              <th className="text-left font-semibold px-4 py-3">Adults</th>
              <th className="text-left font-semibold px-4 py-3">Children</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No quotations yet. Open a trip and raise a quotation.
                </td>
              </tr>
            ) : (
              quotes.map((q) => (
                <tr key={q.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{q.title}</td>
                  <td className="px-4 py-3">{q.dates}</td>
                  <td className="px-4 py-3">{q.adults}</td>
                  <td className="px-4 py-3">{q.children}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        bucketCount={bucket.length}
        quotesCount={quotes.length}
      />

      {page === "home" && (
        <>
          {renderHero()}
          {renderFeatured()}
        </>
      )}

      {page === "explore" && renderExplore()}
      {page === "bucket" && renderBucket()}
      {page === "quotes" && renderQuotes()}

      <Footer />

      {selected && (
        <DetailsModal
          itinerary={selected}
          onClose={() => setSelected(null)}
          onSubmitQuotation={handleSubmitQuotation}
        />
      )}
    </div>
  );
}

export default App;
