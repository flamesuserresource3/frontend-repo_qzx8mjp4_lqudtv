import { User, Heart } from "lucide-react";

function Navbar({ currentPage, onNavigate, bucketCount = 0, quotesCount = 0 }) {
  const link = (key, label) => (
    <button
      onClick={() => onNavigate(key)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentPage === key
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigate("home")}
            className="cursor-pointer select-none text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600"
          >
            TripGullack
          </div>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {link("home", "Home")}
            {link("explore", "Explore")}
            {link("bucket", "My BucketList")}
            {link("quotes", "My Quotations")}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("bucket")}
            className="relative p-2 rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600"
            aria-label="Bucket list"
          >
            <Heart className="w-5 h-5" />
            {bucketCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {bucketCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate("quotes")}
            className="text-sm px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Quotations{quotesCount ? ` (${quotesCount})` : ""}
          </button>
          <button className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-gray-100">
        <nav className="flex items-center justify-around px-2 py-2">
          {link("home", "Home")}
          {link("explore", "Explore")}
          {link("bucket", "BucketList")}
          {link("quotes", "Quotations")}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
