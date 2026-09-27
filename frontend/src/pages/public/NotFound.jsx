import { Link } from "react-router-dom";
import { Brain, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 inline-flex rounded-full bg-primary-50 p-4">
        <Brain className="h-8 w-8 text-primary-600" />
      </div>
      <h1 className="text-3xl font-bold text-neutral-900">Page not found</h1>
      <p className="mt-2 text-neutral-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex items-center gap-2">
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
