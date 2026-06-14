import { Suspense } from "react";
import { ArrowRight, Star, Truck, Sparkles } from "lucide-react";
import { scrapeAll } from "@/lib/scraper";
import { getPredictedPrice } from "@/lib/gemini";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const url = typeof resolvedSearchParams.url === "string" ? resolvedSearchParams.url : "";
  const image = typeof resolvedSearchParams.image === "string" ? resolvedSearchParams.image : "";

  const queryText = q || url || image || "";

  if (!queryText) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-slate-400">
        Please enter a search query.
      </div>
    );
  }

  // Live Scraping across all 7 platforms
  const scrapedPrices = await scrapeAll(queryText);
  
  // Get AI Prediction
  const numericPrices = scrapedPrices.map(p => p.price);
  const prediction = await getPredictedPrice(queryText, numericPrices);

  const displayQuery = queryText.length > 30 ? "Product" : queryText;

  // The generated product card
  const product = {
    _id: "live-fetch",
    name: displayQuery.charAt(0).toUpperCase() + displayQuery.slice(1),
    imageUrl: "https://ik.imagekit.io/4eqyb4rwe/default-product.png",
    description: `Real-time live comparison for ${displayQuery} across Amazon, Flipkart, Myntra, Croma, and more.`,
    specifications: { "Search": displayQuery, "Platforms Scraped": scrapedPrices.length },
    prices: scrapedPrices,
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10 min-h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-outfit font-bold mb-8 text-white">
        Search Results for "{queryText}"
      </h1>
      
      {prediction && (
        <div className="mb-8 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 max-w-5xl shadow-[0_0_30px_rgba(99,102,241,0.15)] flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex items-center gap-3 bg-indigo-500/20 p-4 rounded-xl border border-indigo-500/30">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="text-indigo-300 text-sm font-medium">AI Predicted Fair Price</div>
              <div className="text-3xl font-bold text-white">₹{prediction.predictedPrice?.toLocaleString() || "N/A"}</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xl font-semibold text-white mb-1">
              Verdict: <span className={prediction.verdict?.includes("Wait") ? "text-yellow-400" : "text-green-400"}>{prediction.verdict}</span>
            </div>
            <p className="text-slate-300">{prediction.reason}</p>
          </div>
        </div>
      )}

      {scrapedPrices.length === 0 ? (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm max-w-3xl">
          Could not fetch real prices right now due to server blocks. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-5xl">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-8 shadow-2xl">
            <div className="w-full md:w-64 h-64 bg-slate-950/50 rounded-2xl flex items-center justify-center p-4 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                {product.prices.length > 0 && (
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-semibold whitespace-nowrap">
                    Best Deal: ₹{Math.min(...product.prices.map((p: any) => p.price)).toLocaleString()}
                  </div>
                )}
              </div>
              <p className="text-slate-400 mb-6 line-clamp-2 text-sm">{product.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-auto">
                {product.prices.map((price: any, idx: number) => (
                  <a href={price.url} target="_blank" rel="noreferrer" key={idx} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 transition-colors border border-white/5 group/price relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-[100%] group-hover/price:animate-[shimmer_1.5s_infinite]" />
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={price.store.logoUrl} alt={price.store.name} className="h-4 w-4 rounded-full object-contain bg-white p-[1px]" />
                        <div className="font-medium text-slate-200">{price.store.name}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover/price:text-white transition-colors" />
                    </div>
                    <div className="text-2xl font-bold text-white relative z-10">₹{price.price.toLocaleString()}</div>
                    <div className="flex gap-2 text-xs text-slate-400 mt-2 relative z-10">
                      <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {price.delivery || "Standard"}</span>
                      {price.rating && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {price.rating}</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
