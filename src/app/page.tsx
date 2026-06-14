import HeroSearch from "@/components/HeroSearch";
import { Sparkles, TrendingUp, Tag, Smartphone, Laptop, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Price Comparison
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tight mb-6">
            Find the Best Deals <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              Across the Web
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium">
            Upload an image, paste a URL, or type a product name. Our AI will instantly find and compare prices from top e-commerce platforms.
          </p>
        </div>

        <HeroSearch />

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-200 font-medium">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-3">
                {["iPhone 16 Pro", "Sony WH-1000XM5", "MacBook Air M3", "Samsung S24 Ultra", "PS5 Console", "Dyson Airwrap"].map((item) => (
                  <button key={item} className="px-4 py-2 rounded-full bg-slate-800/50 hover:bg-slate-800 text-sm text-slate-300 transition-colors border border-white/5">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-200 font-medium">
                <Tag className="w-5 h-5 text-cyan-400" />
                Popular Categories
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Phones", icon: Smartphone },
                  { name: "Laptops", icon: Laptop },
                  { name: "Audio", icon: Headphones },
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <button key={category.name} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-white/5 group">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-xs font-medium text-slate-300">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
