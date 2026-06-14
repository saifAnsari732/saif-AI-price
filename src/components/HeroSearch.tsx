"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Image as ImageIcon, Link2, UploadCloud, Loader2 } from "lucide-react";
import { IKContext, IKUpload } from "imagekitio-react";

const tabs = [
  { id: "text", label: "Search by Name", icon: Search },
  { id: "image", label: "Upload Image", icon: ImageIcon },
  { id: "url", label: "Paste URL", icon: Link2 },
];

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("text");
  const [query, setQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query && !uploadedUrl) return;
    console.log("Searching for:", activeTab === "image" ? uploadedUrl : query);
    // Connect to backend search API logic here
  };

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit/auth");
      if (!response.ok) throw new Error("Authentication request failed");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Authentication request failed");
    }
  };

  const onError = (err: any) => {
    console.log("Error", err);
    setIsUploading(false);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setUploadedUrl(res.url);
    setIsUploading(false);
    // Automatically trigger search when image is uploaded successfully
    console.log("Automatically searching for uploaded image:", res.url);
  };

  const onUploadStart = () => {
    setIsUploading(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 relative z-10">
      <div className="flex flex-wrap justify-center mb-8 gap-2 bg-slate-900/50 p-1.5 rounded-2xl backdrop-blur-md border border-white/5 w-max mx-auto overflow-hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/50 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeTab === "text" && (
            <motion.form
              key="text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <div className="pl-6 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. iPhone 16 Pro Max 256GB"
                className="w-full bg-transparent border-none text-lg text-white placeholder:text-slate-500 py-6 px-4 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-2 px-8 py-4 bg-white text-slate-950 font-semibold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Search
              </button>
            </motion.form>
          )}

          {activeTab === "image" && (
            <motion.div
              key="image"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl m-2 bg-slate-950/30 hover:bg-slate-950/50 transition-colors relative"
            >
              <IKContext
                publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                authenticator={authenticator}
              >
                <div className="flex flex-col items-center justify-center gap-4 cursor-pointer">
                  {isUploading ? (
                    <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
                  ) : uploadedUrl ? (
                    <img src={uploadedUrl} alt="Uploaded" className="h-40 object-contain rounded-lg shadow-lg" />
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-300 font-medium text-lg">Click or drag image to upload</p>
                        <p className="text-slate-500 text-sm mt-1">Supports JPG, PNG, WEBP. AI will identify the product.</p>
                      </div>
                    </>
                  )}
                </div>
                
                <IKUpload
                  fileName="product-search.jpg"
                  onError={onError}
                  onSuccess={onSuccess}
                  onUploadStart={onUploadStart}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </IKContext>
            </motion.div>
          )}

          {activeTab === "url" && (
            <motion.form
              key="url"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <div className="pl-6 text-slate-400">
                <Link2 className="w-6 h-6" />
              </div>
              <input
                type="url"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Paste Amazon, Flipkart, or any product URL"
                className="w-full bg-transparent border-none text-lg text-white placeholder:text-slate-500 py-6 px-4 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                Extract
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
