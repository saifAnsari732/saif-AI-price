import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full" />
        <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
      </div>
      <h2 className="text-2xl font-outfit font-bold text-white mt-8 mb-2">
        Scanning E-Commerce Platforms
      </h2>
      <p className="text-slate-400 text-center max-w-md">
        Our AI is fetching real-time prices from Amazon, Flipkart, Myntra, Croma, and others to find you the best deal...
      </p>
    </div>
  );
}
