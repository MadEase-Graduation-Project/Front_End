export default function Footer() {
  return (
    <footer className="bg-menavy text-mewhite py-10 px-6">
      {/* Top: Centered Logo/Brand
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">MedEase</h2>
        <p className="text-sm text-mewhite/80 mt-2 max-w-md mx-auto">
          Your trusted companion in digital healthcare. We connect patients,
          doctors, and data seamlessly.
        </p>
      </div> */}

      {/* Grid Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto text-sm">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Quick Links
            <div className="w-3/4 h-[2px] bg-mewhite mt-1"></div>
          </h4>
          <ul className="space-y-2 mt-3">
            <li>
              <a href="#" className="hover:text-mepale transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Contact
            <div className="w-3/4 h-[2px] bg-mewhite mt-1"></div>
          </h4>
          <ul className="space-y-2 mt-3">
            <li>Email: support@medease.com</li>
            <li>Phone: +20 100 123 4567</li>
            <li>Location: Cairo, Egypt</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Follow Us
            <div className="w-3/4 h-[2px] bg-mewhite mt-1"></div>
          </h4>
          <ul className="space-y-2 mt-3">
            <li>
              <a href="#" className="hover:text-mepale transition">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-mepale transition">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-xs text-mewhite/60">
        © {new Date().getFullYear()} MedEase. All rights reserved.
      </div>
    </footer>
  );
}
