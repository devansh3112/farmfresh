
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Leaf, 
  Filter, 
  ShoppingCart 
} from "lucide-react";
import { 
  products, 
  farmers, 
  getProductsByCategory, 
  getFeaturedProducts 
} from "@/data/mockData";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

const categories = ["All", "Vegetables", "Leafy Greens", "Root Vegetables", "Fruits"];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Get featured products
    setFeaturedProducts(getFeaturedProducts());

    // Filter products based on category and search query
    let filtered = selectedCategory 
      ? getProductsByCategory(selectedCategory) 
      : products;

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  // Get farmer name
  const getFarmerName = (farmerId: string): string => {
    const farmer = farmers.find(f => f.id === farmerId);
    return farmer ? farmer.farmName : "Unknown Farm";
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light to-primary rounded-lg p-6 text-white mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Fresh from Farm to Table</h1>
          <p className="text-lg mb-6">Shop directly from local farmers for the freshest produce</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for vegetables, fruits..."
              className="pl-10 bg-white text-gray-800 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="text-primary-dark mr-2" />
        <span className="font-medium text-neutral-800">Categories:</span>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={selectedCategory === category ? "bg-primary" : ""}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-primary-dark font-serif">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {product.organic && (
                      <Badge className="bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" /> Organic
                      </Badge>
                    )}
                  </div>
                  <Link to={`/farmer/${product.farmerId}`} className="text-sm text-primary hover:underline">
                    {getFarmerName(product.farmerId)}
                  </Link>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <span className="text-neutral-600">per {product.unit}</span>
                  </div>
                  <p className="text-neutral-600 text-sm line-clamp-2 mt-2">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark font-serif">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>
        
        {filteredProducts.length === 0 && (
          <div className="bg-neutral-100 rounded-lg p-8 text-center">
            <p className="text-lg text-neutral-600">No products found. Try changing your filters.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/product/${product.id}`}>
                <div className="h-40 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  {product.organic && (
                    <Badge className="bg-green-600 text-xs">
                      <Leaf className="h-3 w-3 mr-1" /> Organic
                    </Badge>
                  )}
                </div>
                <Link to={`/farmer/${product.farmerId}`} className="text-xs text-primary hover:underline">
                  {getFarmerName(product.farmerId)}
                </Link>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex justify-between">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-neutral-600 text-xs">per {product.unit}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full text-sm" 
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-1 h-3 w-3" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
