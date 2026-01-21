'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Something went wrong!
      </h2>
      <p className="text-slate-500 mb-8">
        {error.message || "We encountered an unexpected error."}
      </p>
      
      <button
        onClick={reset}
        className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}