import { Heart } from "lucide-react";

function ItineraryCard({ itinerary, onView, onToggleBucket, inBucket }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={itinerary.image}
          alt={itinerary.title}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        <button
          onClick={() => onToggleBucket(itinerary)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow ${
            inBucket ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          aria-label="Toggle bucket list"
        >
          <Heart className={`w-5 h-5 ${inBucket ? "fill-red-500" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{itinerary.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{itinerary.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold">${itinerary.price.toLocaleString()}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(itinerary)}
              className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;
