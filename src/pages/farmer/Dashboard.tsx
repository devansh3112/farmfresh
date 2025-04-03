
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Sprout, 
  TrendingUp, 
  Package, 
  Clock, 
  ChevronRight, 
  Plus 
} from "lucide-react";
import { 
  getProductsByFarmer, 
  getOrdersByFarmer 
} from "@/data/mockData";
import { Order, Product } from "@/types";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would fetch data for the current farmer
    // For now, we'll use the mock data
    const fetchedProducts = getProductsByFarmer("f1");
    const fetchedOrders = getOrdersByFarmer("f1");
    setProducts(fetchedProducts);
    setOrders(fetchedOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === "pending").length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-serif">Farmer Dashboard</h1>
        <Button asChild>
          <Link to="/products" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-primary-light p-2 rounded-full mr-4">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <h2 className="text-2xl font-bold">{totalProducts}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-secondary p-2 rounded-full mr-4">
                <Package className="h-6 w-6 text-neutral-800" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stock</p>
                <h2 className="text-2xl font-bold">{totalStock} units</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <h2 className="text-2xl font-bold">${totalSales.toFixed(2)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-2 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <h2 className="text-2xl font-bold">{pendingOrders}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Recent Orders</CardTitle>
          <CardDescription>Manage your latest incoming orders</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center py-4 text-neutral-500">No orders received yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-neutral-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-neutral-600 mr-2">Status:</span>
                      <span className="capitalize font-medium text-primary">
                        {order.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-2">
                    <strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong> items, 
                    Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/manage-orders?id=${order.id}`} className="flex items-center">
                      View Details
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/manage-orders">View All Orders</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Product Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Inventory Status</CardTitle>
          <CardDescription>Monitor your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-center py-4 text-neutral-500">No products added yet.</p>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded overflow-hidden mr-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-neutral-600">${product.price.toFixed(2)} / {product.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                      {product.stock} in stock
                    </p>
                    <p className="text-xs text-neutral-500">{product.organic ? 'Organic' : 'Conventional'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/products">Manage Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
