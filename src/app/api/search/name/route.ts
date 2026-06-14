import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    await connectToDatabase();

    // In a real app, this would query external APIs (Amazon, Flipkart) or use a robust search engine.
    // For now, we perform a basic regex search on our MongoDB products or return mock data.
    
    // First, try to find in DB
    const dbProducts = await Product.find({
      name: { $regex: query, $options: "i" },
    }).populate("prices.store");

    if (dbProducts.length > 0) {
      return NextResponse.json({ results: dbProducts });
    }

    // Mock response if DB is empty to show the UI functioning
    const mockResults = [
      {
        _id: "mock1",
        name: `${query.charAt(0).toUpperCase() + query.slice(1)} - Premium Edition`,
        brand: "MockBrand",
        imageUrl: "https://ik.imagekit.io/4eqyb4rwe/default-product.png", // Add a placeholder later
        description: "This is a simulated search result for demonstration.",
        specifications: { RAM: "8GB", Storage: "128GB" },
        prices: [
          {
            store: { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
            price: 9999,
            currency: "INR",
            url: "#",
            inStock: true,
            delivery: "2 Days",
            rating: 4.5,
          },
          {
            store: { name: "Flipkart", logoUrl: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" },
            price: 9499,
            currency: "INR",
            url: "#",
            inStock: true,
            delivery: "4 Days",
            rating: 4.2,
          }
        ]
      }
    ];

    return NextResponse.json({ results: mockResults, isMock: true });
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
