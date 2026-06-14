import HeroSearch from "@/components/HeroSearch";
import { Sparkles, TrendingUp, Tag, Smartphone, Laptop, Headphones, Shirt, Tv, Camera, Gamepad, Watch, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const suggestedDeals = [
    { name: "iPhone 15 (128GB)", image: "https://ik.imagekit.io/4eqyb4rwe/default-product.png", oldPrice: 79900, newPrice: 65999, discount: "17% OFF" },
    { name: "Sony Bravia 55\" 4K TV", image: "https://ik.imagekit.io/4eqyb4rwe/default-product.png", oldPrice: 99900, newPrice: 57990, discount: "42% OFF" },
    { name: "Levi's Men Regular Jeans", image: "https://ik.imagekit.io/4eqyb4rwe/default-product.png", oldPrice: 2599, newPrice: 899, discount: "65% OFF" },
    { name: "MacBook Air M1", image: "https://ik.imagekit.io/4eqyb4rwe/default-product.png", oldPrice: 99900, newPrice: 69990, discount: "30% OFF" }
  ];

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
          <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tight mb-6 text-white">
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

        <div className="mt-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-6 text-slate-200 font-medium">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-3">
                {["iPhone 16 Pro", "Sony WH-1000XM5", "MacBook Air M3", "Samsung S24 Ultra", "PS5 Console", "Dyson Airwrap"].map((item) => (
                  <Link href={`/search?q=${encodeURIComponent(item)}`} key={item} className="px-4 py-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-white/5">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-6 text-slate-200 font-medium">
                <Tag className="w-5 h-5 text-cyan-400" />
                Popular Categories
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {[
                  { name: "Phones", icon: Smartphone },
                  { name: "Laptops", icon: Laptop },
                  { name: "Audio", icon: Headphones },
                  { name: "Fashion", icon: Shirt },
                  { name: "TVs", icon: Tv },
                  { name: "Cameras", icon: Camera },
                  { name: "Gaming", icon: Gamepad },
                  { name: "Watches", icon: Watch },
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link href={`/search?q=${encodeURIComponent(category.name)}`} key={category.name} className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-700 transition-colors border border-white/5 group">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-xs font-medium text-slate-300">{category.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Suggested Deals</h2>
                <p className="text-slate-400">Products currently experiencing massive price drops</p>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedDeals.map((deal, i) => (
                <Link href={`/search?q=${encodeURIComponent(deal.name)}`} key={i} className="group relative bg-slate-800/40 border border-white/5 rounded-2xl p-4 hover:bg-slate-800/80 transition-all hover:-translate-y-1">
                  <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-md z-10 border border-red-500/20">
                    {deal.discount}
                  </div>
                  <div className="w-full h-40 bg-white/5 rounded-xl mb-4 flex items-center justify-center p-4 relative overflow-hidden">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={deal.image} alt={deal.name} className="max-w-full max-h-full object-contain opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-white font-medium mb-2 truncate">{deal.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-white">₹{deal.newPrice.toLocaleString()}</span>
                    <span className="text-sm text-slate-500 line-through">₹{deal.oldPrice.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
