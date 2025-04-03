
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Star, ExternalLink, Clock } from "lucide-react";
import { Order } from "@/types";
import { getOrdersByConsumer } from "@/services/orders";
import { useUserRole } from "@/context/UserRoleContext";

const OrderStatusBadge = ({ status }: { status: Order["status"] }) => {
  const statusConfig: Record<Order["status"], { color: string; label: string }> = {
    pending: { color: "bg-yellow-500", label: "Pending" },
    accepted: { color: "bg-blue-500", label: "Accepted" },
    rejected: { color: "bg-red-500", label: "Rejected" },
    preparing: { color: "bg-purple-500", label: "Preparing" },
    "out-for-delivery": { color: "bg-orange-500", label: "Out for Delivery" },
    delivered: { color: "bg-green-500", label: "Delivered" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={`${config.color}`}>
      {config.label}
    </Badge>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useUserRole();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await getOrdersByConsumer(userId);
        
        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }
        
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div className="bg-neutral-100 rounded-lg p-8 mb-6">
          <Package className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
          <h2 className="text-2xl font-bold mb-2 font-serif">Please log in</h2>
          <p className="text-neutral-600 mb-6">You need to be logged in to view your orders.</p>
          <Button asChild>
            <Link to="/">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div className="bg-neutral-100 rounded-lg p-8 mb-6">
          <Package className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
          <h2 className="text-2xl font-bold mb-2 font-serif">No orders yet</h2>
          <p className="text-neutral-600 mb-6">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link to="/marketplace">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-serif">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-neutral-100">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-neutral-600">
                    <Clock className="inline-block h-4 w-4 mr-1" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <h3 className="font-medium mb-2">Order Items:</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.product.id} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded overflow-hidden mr-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-neutral-600">
                          ${item.product.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between bg-neutral-50 gap-4">
              {order.status === "delivered" ? (
                <Button variant="outline" size="sm">
                  <Star className="mr-1 h-4 w-4" />
                  Leave Review
                </Button>
              ) : (
                <div></div>
              )}
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-1 h-4 w-4" />
                Order Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
