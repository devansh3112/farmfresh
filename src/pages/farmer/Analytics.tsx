
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// Mock data for sales analytics
const salesData = [
  { month: "January", sales: 1200, orders: 48 },
  { month: "February", sales: 1900, orders: 65 },
  { month: "March", sales: 2400, orders: 92 },
];

const productPerformance = [
  { name: "Organic Tomatoes", sales: 450, percentage: 15 },
  { name: "Fresh Lettuce", sales: 300, percentage: 10 },
  { name: "Bell Peppers", sales: 600, percentage: 20 },
  { name: "Carrots", sales: 750, percentage: 25 },
  { name: "Potatoes", sales: 900, percentage: 30 },
];

const categoryPerformance = [
  { name: "Vegetables", value: 65 },
  { name: "Fruits", value: 25 },
  { name: "Herbs", value: 10 },
];

const COLORS = ["#4B7F52", "#6EA575", "#E8C547", "#F2D87A", "#D64933"];

const AnalyticsScreen = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Sales Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Sales</CardTitle>
            <CardDescription>Last 3 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$4,500</div>
            <p className="text-sm text-neutral-500">
              <span className="text-green-500">↑ 24%</span> vs previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Orders</CardTitle>
            <CardDescription>Last 3 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">205</div>
            <p className="text-sm text-neutral-500">
              <span className="text-green-500">↑ 18%</span> vs previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Order Value</CardTitle>
            <CardDescription>Last 3 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$22.00</div>
            <p className="text-sm text-neutral-500">
              <span className="text-green-500">↑ 5%</span> vs previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Trends</CardTitle>
              <CardDescription>Revenue and order volume over the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4B7F52" />
                    <YAxis yAxisId="right" orientation="right" stroke="#E8C547" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      name="Sales ($)"
                      stroke="#4B7F52"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      name="Orders"
                      stroke="#E8C547"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Performance by product for the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productPerformance}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="Sales ($)" fill="#4B7F52">
                      {productPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsScreen;
