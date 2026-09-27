import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-neutral-900">
              BrainScan <span className="text-primary-600">AI</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-neutral-500">
              AI-assisted brain MRI analysis — a final year college project
              exploring deep learning in healthcare.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-900">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-500">
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <Link to="/about" className="hover:text-primary-600">About</Link>
              <Link to="/brain-tumors" className="hover:text-primary-600">Understanding Brain Tumors</Link>
              <Link to="/contact" className="hover:text-primary-600">Contact</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-900">Legal</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-500">
              <Link to="/privacy-policy" className="hover:text-primary-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-600">Terms of Use</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-100 pt-6 text-center">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} BrainScan AI — Final Year Project.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Academic/research prototype. Not a medical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
