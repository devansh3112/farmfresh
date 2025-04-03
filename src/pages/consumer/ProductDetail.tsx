
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Star, 
  MapPin, 
  Store 
} from "lucide-react";
import { getProductById, getFarmerById, reviews } from "@/data/mockData";
import { Product, Farmer } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get farmer details
        const foundFarmer = getFarmerById(foundProduct.farmerId);
        if (foundFarmer) {
          setFarmer(foundFarmer);
        }
        
        // Get product reviews
        const foundReviews = reviews.filter(review => review.productId === id);
        setProductReviews(foundReviews);
      }
    }
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart`,
      });
    }
  };

  if (!product || !farmer) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-lg text-neutral-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-white">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold font-serif text-primary-dark">{product.name}</h1>
              {product.organic && (
                <Badge className="bg-green-600">
                  <Leaf className="h-4 w-4 mr-1" /> Organic
                </Badge>
              )}
            </div>
            <p className="text-neutral-600 mt-2">{product.category}</p>
          </div>

          <div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)} <span className="text-neutral-600 text-lg font-normal">per {product.unit}</span></p>
          </div>

          <div>
            <p className="text-neutral-700">{product.description}</p>
          </div>

          <div className="border-t border-b border-neutral-300 py-4 flex items-center">
            <Link to={`/farmer/${farmer.id}`} className="flex items-center hover:underline text-primary">
              <Store className="h-5 w-5 mr-2" />
              <span className="font-medium">{farmer.farmName}</span>
            </Link>
            <div className="mx-4 text-neutral-300">|</div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-1 text-neutral-500" />
              <span className="text-neutral-600">{farmer.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementQuantity}
                disabled={product.stock <= quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-neutral-500">
              {product.stock} available
            </span>
          </div>

          <Button 
            className="w-full py-6" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2" />
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Farmer Information */}
      <Card className="border-primary-light">
        <CardHeader>
          <CardTitle className="text-xl font-serif">About the Farmer</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center md:items-start">
            {farmer.profileImage ? (
              <img 
                src={farmer.profileImage} 
                alt={farmer.name} 
                className="w-24 h-24 rounded-full object-cover mb-2" 
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-white text-2xl mb-2">
                {farmer.name.charAt(0)}
              </div>
            )}
            <h3 className="font-bold text-lg">{farmer.name}</h3>
            <p className="text-neutral-600">{farmer.farmName}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-neutral-700 mb-3">{farmer.bio}</p>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(farmer.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`} 
                  />
                ))}
              </div>
              <span className="font-medium">{farmer.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 font-serif">Customer Reviews</h2>
        
        {productReviews.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center">
              <p className="text-neutral-600">No reviews yet for this product.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {productReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">Customer Review</CardTitle>
                      <CardDescription>{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
