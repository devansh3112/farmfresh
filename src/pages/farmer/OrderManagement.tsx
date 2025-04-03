import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Jane Smith",
    items: "Organic Tomatoes (2kg), Carrots (1kg)",
    totalAmount: 15.99,
    status: "pending",
    date: "2023-04-01"
  },
  {
    id: "ORD-002",
    customerName: "Mike Johnson",
    items: "Bell Peppers (1kg), Potatoes (5kg)",
    totalAmount: 12.50,
    status: "accepted",
    date: "2023-04-02"
  },
  {
    id: "ORD-003",
    customerName: "Sarah Williams",
    items: "Lettuce (2 heads), Cucumbers (1kg)",
    totalAmount: 8.75,
    status: "preparing",
    date: "2023-04-02"
  },
  {
    id: "ORD-004",
    customerName: "Robert Brown",
    items: "Strawberries (500g), Blueberries (250g)",
    totalAmount: 14.25,
    status: "out-for-delivery",
    date: "2023-04-03"
  },
  {
    id: "ORD-005",
    customerName: "Emily Davis",
    items: "Kale (1 bunch), Spinach (500g)",
    totalAmount: 7.99,
    status: "delivered",
    date: "2023-04-01"
  }
];

const OrderManagementScreen = () => {
  const [orders] = useState(mockOrders);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-neutral-100 text-neutral-700">Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700">Accepted</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Preparing</Badge>;
      case "out-for-delivery":
        return <Badge variant="outline" className="bg-purple-100 text-purple-700">Out for Delivery</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-700">Delivered</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}`,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {order.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-primary hover:bg-primary-dark"
                                onClick={() => handleStatusChange(order.id, "accepted")}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-accent hover:bg-accent hover:text-white"
                                onClick={() => handleStatusChange(order.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {order.status === "accepted" && (
                            <Button 
                              size="sm" 
                              className="bg-yellow-500 hover:bg-yellow-600"
                              onClick={() => handleStatusChange(order.id, "preparing")}
                            >
                              Start Preparing
                            </Button>
                          )}
                          {order.status === "preparing" && (
                            <Button 
                              size="sm" 
                              className="bg-purple-500 hover:bg-purple-600"
                              onClick={() => handleStatusChange(order.id, "out-for-delivery")}
                            >
                              Send for Delivery
                            </Button>
                          )}
                          {order.status === "out-for-delivery" && (
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleStatusChange(order.id, "delivered")}
                            >
                              Mark Delivered
                            </Button>
                          )}
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.status === "pending").map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary-dark"
                            onClick={() => handleStatusChange(order.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-accent hover:bg-accent hover:text-white"
                            onClick={() => handleStatusChange(order.id, "rejected")}
                          >
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.status === "accepted").map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => handleStatusChange(order.id, "preparing")}
                          >
                            Start Preparing
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preparing">
          <Card>
            <CardHeader>
              <CardTitle>Orders Being Prepared</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.status === "preparing").map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-purple-500 hover:bg-purple-600"
                            onClick={() => handleStatusChange(order.id, "out-for-delivery")}
                          >
                            Send for Delivery
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.status === "delivered").map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagementScreen;
