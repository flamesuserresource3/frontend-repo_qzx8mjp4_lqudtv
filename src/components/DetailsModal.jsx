import { useMemo, useState } from "react";

function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      aria-hidden
    />
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
        {title}
      </h4>
      {children}
    </div>
  );
}

function DetailsModal({ itinerary, onClose, onSubmitQuotation }) {
  const [showQuote, setShowQuote] = useState(false);
  const [showSip, setShowSip] = useState(false);
  const [quote, setQuote] = useState({
    start: "",
    end: "",
    adults: 2,
    children: 0,
    phone: "",
    notes: "",
  });
  const [sipDate, setSipDate] = useState("");

  const monthlyPayment = useMemo(() => {
    if (!sipDate) return 0;
    const today = new Date();
    const target = new Date(sipDate);
    // months between
    const months =
      (target.getFullYear() - today.getFullYear()) * 12 +
      (target.getMonth() - today.getMonth());
    const m = Math.max(1, months);
    return Math.ceil(itinerary.price / m);
  }, [sipDate, itinerary.price]);

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 grid place-items-center p-4"
      >
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-56">
            <img
              src={itinerary.image}
              alt={itinerary.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/90 hover:bg-white text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {itinerary.title}
                </h3>
                <p className="text-gray-500">{itinerary.destination}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${itinerary.price.toLocaleString()}
                </div>
              </div>
            </div>

            <Section title="Day-wise Itinerary">
              <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                {itinerary.days.map((d, i) => (
                  <li key={i}>
                    <span className="font-semibold">Day {i + 1}:</span> {d}
                  </li>
                ))}
              </ol>
            </Section>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => alert("Payment flow coming soon!")}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Pay Now
              </button>
              <button
                onClick={() => {
                  setShowSip(true);
                  setShowQuote(false);
                }}
                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
              >
                Start Gullack
              </button>
              <button
                onClick={() => {
                  setShowQuote(true);
                  setShowSip(false);
                }}
                className="px-4 py-2 rounded-md border border-gray-300 hover:border-blue-400 text-gray-700"
              >
                Raise Quotation
              </button>
            </div>

            {showSip && (
              <Section title="Gullack Plan Setup">
                <div className="grid sm:grid-cols-3 gap-3 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Planned Travel Date
                    </label>
                    <input
                      type="date"
                      value={sipDate}
                      onChange={(e) => setSipDate(e.target.value)}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="bg-blue-50 text-blue-800 rounded-lg p-3">
                    <div className="text-xs">Monthly Amount</div>
                    <div className="text-xl font-bold">
                      ${monthlyPayment.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Split the trip cost into easy monthly savings until your travel
                  date.
                </p>
              </Section>
            )}

            {showQuote && (
              <Section title="Raise Quotation">
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitQuotation({ ...quote, itineraryId: itinerary.id });
                    setShowQuote(false);
                    onClose();
                  }}
                >
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Trip Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={quote.start}
                      onChange={(e) => setQuote({ ...quote, start: e.target.value })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Trip End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={quote.end}
                      onChange={(e) => setQuote({ ...quote, end: e.target.value })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Number of Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={quote.adults}
                      onChange={(e) => setQuote({ ...quote, adults: Number(e.target.value) })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Number of Children
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={quote.children}
                      onChange={(e) => setQuote({ ...quote, children: Number(e.target.value) })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 234 567 8900"
                      value={quote.phone}
                      onChange={(e) => setQuote({ ...quote, phone: e.target.value })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={quote.notes}
                      onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
                      className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowQuote(false)}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:border-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsModal;
