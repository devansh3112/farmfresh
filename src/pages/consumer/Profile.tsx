
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserRole } from "@/context/UserRoleContext";
import { toast } from "@/hooks/use-toast";

const ProfileScreen = () => {
  const { userRole } = useUserRole();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [address, setAddress] = useState("123 Main St, Anytown, USA");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary-dark">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userRole === "consumer" ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Receive Order Updates</h3>
                      <p className="text-sm text-neutral-500">Get notifications when your order status changes</p>
                    </div>
                    <div>
                      <input type="checkbox" id="orderUpdates" defaultChecked className="mr-2" />
                      <Label htmlFor="orderUpdates">Enabled</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Favorite Farms Alerts</h3>
                      <p className="text-sm text-neutral-500">Get notified when your favorite farms add new products</p>
                    </div>
                    <div>
                      <input type="checkbox" id="farmAlerts" defaultChecked className="mr-2" />
                      <Label htmlFor="farmAlerts">Enabled</Label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Order Notifications</h3>
                      <p className="text-sm text-neutral-500">Get notified when you receive new orders</p>
                    </div>
                    <div>
                      <input type="checkbox" id="newOrders" defaultChecked className="mr-2" />
                      <Label htmlFor="newOrders">Enabled</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Low Stock Alerts</h3>
                      <p className="text-sm text-neutral-500">Get notified when product inventory is running low</p>
                    </div>
                    <div>
                      <input type="checkbox" id="lowStock" defaultChecked className="mr-2" />
                      <Label htmlFor="lowStock">Enabled</Label>
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4">
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
