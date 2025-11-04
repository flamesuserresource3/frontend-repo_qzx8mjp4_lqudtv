function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-500">© {new Date().getFullYear()} TripGullack</div>
        <nav className="flex items-center gap-4">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <a href="#terms" className="hover:text-blue-600">Terms</a>
          <a href="#privacy" className="hover:text-blue-600">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
