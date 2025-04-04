import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../contexts/UserRoleContext';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

// Create navigation types
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Welcome Screen
const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://i.imgur.com/CiJKiE4.png' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Farm Fresh</Text>
      </View>
      <Text style={styles.tagline}>Fresh produce directly from local farms</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={[styles.buttonText, { color: '#4CAF50' }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Login Screen
const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    const success = await login(email, password);
    if (!success) {
      alert('Invalid credentials. Try demo@farmfresh.com / password123');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, styles.primaryButton, { marginTop: 20 }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </Text>
      </View>

      <View style={styles.demoContainer}>
        <Text style={styles.demoText}>Demo Credentials:</Text>
        <Text style={styles.demoCredentials}>Farmer: farmer@farmfresh.com / password123</Text>
        <Text style={styles.demoCredentials}>Customer: customer@farmfresh.com / password123</Text>
      </View>
    </View>
  );
};

// Signup Screen
const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    const success = await signUp(email, password, name);
    if (success) {
      alert('Account created successfully!');
    } else {
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>I am a:</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'consumer' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('consumer')}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'consumer' && styles.roleButtonTextActive,
                ]}
              >
                Customer
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'farmer' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('farmer')}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'farmer' && styles.roleButtonTextActive,
                ]}
              >
                Farmer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, { marginTop: 20 }]}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Home Screen (Customer)
const HomeScreen = ({ navigation }: any) => {
  const [featuredProducts, setFeaturedProducts] = useState([
    { id: '1', name: 'Organic Apples', price: 3.99, farmer: 'Green Valley Farm', image: 'https://i.imgur.com/JFHkOpL.jpg' },
    { id: '2', name: 'Fresh Tomatoes', price: 2.49, farmer: 'Sunshine Fields', image: 'https://i.imgur.com/cC3FDDo.jpg' },
    { id: '3', name: 'Free-Range Eggs', price: 4.99, farmer: 'Happy Hens Farm', image: 'https://i.imgur.com/XCBDCW4.jpg' },
    { id: '4', name: 'Organic Honey', price: 7.99, farmer: 'Buzzy Bee Apiary', image: 'https://i.imgur.com/EqoYNLU.jpg' },
  ]);

  const [farms, setFarms] = useState([
    { id: '1', name: 'Green Valley Farm', distance: '5.2 miles', rating: 4.8, image: 'https://i.imgur.com/pU1Usw0.jpg' },
    { id: '2', name: 'Sunshine Fields', distance: '7.8 miles', rating: 4.6, image: 'https://i.imgur.com/MZ3jQr2.jpg' },
    { id: '3', name: 'Happy Hens Farm', distance: '3.1 miles', rating: 4.9, image: 'https://i.imgur.com/7I3hIj2.jpg' },
  ]);

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Farm Fresh</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products or farms..."
          placeholderTextColor="#999"
        />
      </View>
      
      {/* Featured Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.productCard}
              onPress={() => {}}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productFarmer}>{item.farmer}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.productsList}
        />
      </View>
      
      {/* Nearby Farms */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nearby Farms</Text>
        {farms.map(farm => (
          <TouchableOpacity 
            key={farm.id} 
            style={styles.farmCard}
            onPress={() => {}}
          >
            <Image source={{ uri: farm.image }} style={styles.farmImage} />
            <View style={styles.farmInfo}>
              <Text style={styles.farmName}>{farm.name}</Text>
              <View style={styles.farmDetails}>
                <Text style={styles.farmDistance}>{farm.distance}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.farmRating}>{farm.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Orders Screen
const OrdersScreen = () => {
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-1001', 
      date: 'April 10, 2025', 
      status: 'Delivered', 
      total: 24.99,
      items: [
        { name: 'Organic Apples', quantity: 2, price: 3.99 },
        { name: 'Fresh Tomatoes', quantity: 1, price: 2.49 },
        { name: 'Free-Range Eggs', quantity: 1, price: 4.99 }
      ],
      farm: 'Green Valley Farm'
    },
    { 
      id: 'ORD-1002', 
      date: 'April 5, 2025', 
      status: 'Processing', 
      total: 16.50,
      items: [
        { name: 'Organic Honey', quantity: 1, price: 7.99 },
        { name: 'Fresh Strawberries', quantity: 1, price: 4.99 }
      ],
      farm: 'Sunshine Fields'
    },
    { 
      id: 'ORD-1003', 
      date: 'March 28, 2025', 
      status: 'Delivered', 
      total: 32.95,
      items: [
        { name: 'Organic Milk', quantity: 1, price: 5.99 },
        { name: 'Grass-Fed Beef', quantity: 1, price: 15.99 },
        { name: 'Organic Carrots', quantity: 1, price: 2.49 }
      ],
      farm: 'Happy Hens Farm'
    }
  ]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>My Orders</Text>
      
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{item.id}</Text>
              <View style={[
                styles.statusBadge,
                item.status === 'Delivered' ? styles.deliveredBadge : styles.processingBadge
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.orderDate}>Ordered on {item.date}</Text>
            <Text style={styles.orderFarm}>From: {item.farm}</Text>
            
            <View style={styles.orderItems}>
              {item.items.map((item, index) => (
                <Text key={index} style={styles.orderItem}>
                  {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                </Text>
              ))}
            </View>
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
};

// Profile Screen
const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState('https://i.imgur.com/Wh4n9D9.png');
  
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>My Profile</Text>
      
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'john@example.com'}</Text>
        </View>
      </View>
      
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="person-outline" size={24} color="#4CAF50" />
          <Text style={styles.settingsItemText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="card-outline" size={24} color="#4CAF50" />
          <Text style={styles.settingsItemText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="location-outline" size={24} color="#4CAF50" />
          <Text style={styles.settingsItemText}>Delivery Addresses</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="notifications-outline" size={24} color="#4CAF50" />
          <Text style={styles.settingsItemText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={[styles.buttonText, { color: '#FF3B30' }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Customer Tab Navigator
const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main Navigator
const AppNavigation = () => {
  const { isAuthenticated } = useAuth();
  const { userRole } = useUserRole();
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // User Stacks based on roles
          <>
            {userRole === 'consumer' ? (
              <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
            ) : (
              // Farmer stack (using same components for now)
              <Stack.Screen name="FarmerTabs" component={CustomerTabNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4CAF50',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerContainer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  demoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  demoCredentials: {
    fontSize: 12,
    color: '#666',
  },
  roleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  roleButtons: {
    flexDirection: 'row',
  },
  roleButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  roleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  // Home Screen
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productsList: {
    paddingRight: 16,
  },
  productCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productFarmer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  farmCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  farmImage: {
    width: 100,
    height: 100,
  },
  farmInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  farmName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  farmDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  farmDistance: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmRating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  // Orders Screen
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveredBadge: {
    backgroundColor: '#E8F5E9',
  },
  processingBadge: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderFarm: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItems: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  // Profile Screen
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
});

export default AppNavigation; 