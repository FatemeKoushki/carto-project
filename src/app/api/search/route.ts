import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  memory: string;
  discount: string;
  oldPrice?: number;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    // Read the db.json file
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Get all products
    const allProducts = dbData.allProducts || [];
    
    // Filter products based on search query
    const filteredProducts = allProducts.filter((product: Product) => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    // Return the first 5 matching products
    return NextResponse.json({ products: filteredProducts.slice(0, 5) });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
} 