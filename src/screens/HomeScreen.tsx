import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../contexts/UserRoleContext';

const HomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { userRole } = useUserRole();
  const isFarmer = userRole === 'farmer';

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Welcome');
  };

  const renderFarmerHome = () => (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Farmer</Text>
          <Text style={styles.subGreeting}>Welcome back to your farm!</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1553787434-dd9eb4ea4d25' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.statTitle}>Products</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: '#E0F7FA' }]}>
            <Ionicons name="cart" size={24} color="#00BCD4" />
          </View>
          <Text style={styles.statTitle}>Orders</Text>
          <Text style={styles.statValue}>8</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="star" size={24} color="#FF9800" />
          </View>
          <Text style={styles.statTitle}>Rating</Text>
          <Text style={styles.statValue}>4.8</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderNumber}>Order #1092</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Processing</Text>
            </View>
          </View>
          
          <View style={styles.orderInfo}>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Customer</Text>
              <Text style={styles.orderDetailValue}>John Smith</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Date</Text>
              <Text style={styles.orderDetailValue}>May 12, 2023</Text>
            </View>
            
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailLabel}>Amount</Text>
              <Text style={styles.orderDetailValue}>$45.80</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.seeAllText}>Manage All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('Products')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524593166156-312f362cada0' }} 
              style={styles.productImage} 
            />
            <Text style={styles.productName}>Organic Tomatoes</Text>
            <Text style={styles.productPrice}>$3.99/lb</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('Products')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637' }} 
              style={styles.productImage} 
            />
            <Text style={styles.productName}>Fresh Eggs</Text>
            <Text style={styles.productPrice}>$5.49/dozen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('Products')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' }} 
              style={styles.productImage} 
            />
            <Text style={styles.productName}>Organic Apples</Text>
            <Text style={styles.productPrice}>$4.29/lb</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.addProductButton}
          onPress={() => navigation.navigate('Products', { screen: 'AddProduct' })}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.addProductText}>Add New Product</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderConsumerHome = () => (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.subGreeting}>What fresh produce will you get today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.searchSection]}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => navigation.navigate('Products')}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search for fresh products...</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        
        <View style={styles.categoriesGrid}>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Products', { category: 'Vegetables' })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.categoryLabel}>Vegetables</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Products', { category: 'Fruits' })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="nutrition" size={24} color="#FF9800" />
            </View>
            <Text style={styles.categoryLabel}>Fruits</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Products', { category: 'Dairy & Eggs' })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="egg" size={24} color="#03A9F4" />
            </View>
            <Text style={styles.categoryLabel}>Dairy & Eggs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Products', { category: 'Meat' })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="restaurant" size={24} color="#F44336" />
            </View>
            <Text style={styles.categoryLabel}>Meat</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.featuredProductCard}
            onPress={() => navigation.navigate('ProductDetail', { 
              product: {
                id: '1',
                name: 'Organic Strawberries',
                price: '$4.99/lb',
                farm: 'Berry Good Farm',
                image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
                description: 'Sweet, juicy organic strawberries picked at peak ripeness.',
                stock: 40,
                rating: 4.9,
                category: 'Fruits'
              }
            })}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2' }} 
              style={styles.featuredProductImage} 
            />
            <View style={styles.featuredProductInfo}>
              <Text style={styles.productName}>Organic Strawberries</Text>
              <Text style={styles.farmName}>Berry Good Farm</Text>
              <Text style={styles.productPrice}>$4.99/lb</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featuredProductCard}
            onPress={() => navigation.navigate('ProductDetail', { 
              product: {
                id: '2',
                name: 'Artisan Bread',
                price: '$5.49/loaf',
                farm: 'Hearth & Home Bakery',
                image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
                description: 'Fresh baked artisan bread made with organic flour.',
                stock: 25,
                rating: 4.8,
                category: 'Bakery'
              }
            })}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec' }} 
              style={styles.featuredProductImage} 
            />
            <View style={styles.featuredProductInfo}>
              <Text style={styles.productName}>Artisan Bread</Text>
              <Text style={styles.farmName}>Hearth & Home Bakery</Text>
              <Text style={styles.productPrice}>$5.49/loaf</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featuredProductCard}
            onPress={() => navigation.navigate('ProductDetail', { 
              product: {
                id: '3',
                name: 'Local Honey',
                price: '$8.99/jar',
                farm: 'Busy Bee Apiary',
                image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
                description: 'Raw, unfiltered honey produced locally.',
                stock: 30,
                rating: 4.7,
                category: 'Pantry'
              }
            })}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924' }} 
              style={styles.featuredProductImage} 
            />
            <View style={styles.featuredProductInfo}>
              <Text style={styles.productName}>Local Honey</Text>
              <Text style={styles.farmName}>Busy Bee Apiary</Text>
              <Text style={styles.productPrice}>$8.99/jar</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Local Farms</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.farmCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1500076656116-558758c991c1' }} 
              style={styles.farmCardImage} 
            />
            <Text style={styles.farmCardName}>Green Valley Farm</Text>
            <View style={styles.farmCardRating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.farmCardRatingText}>4.8 (32)</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.farmCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30' }} 
              style={styles.farmCardImage} 
            />
            <Text style={styles.farmCardName}>Sunshine Acres</Text>
            <View style={styles.farmCardRating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.farmCardRatingText}>4.7 (28)</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.farmCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf' }} 
              style={styles.farmCardImage} 
            />
            <Text style={styles.farmCardName}>Berry Good Farm</Text>
            <View style={styles.farmCardRating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.farmCardRatingText}>4.9 (45)</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {isFarmer ? renderFarmerHome() : renderConsumerHome()}
      </ScrollView>

      {!isFarmer && (
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </View>
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginTop: 10,
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: '#FFF9C4',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFA000',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetail: {
    flex: 1,
  },
  orderDetailLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  productCard: {
    width: 140,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  actionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addProductText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  // Consumer specific styles
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredProductCard: {
    width: 220,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  featuredProductImage: {
    width: '100%',
    height: 140,
  },
  featuredProductInfo: {
    padding: 12,
  },
  farmName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginBottom: 5,
  },
  farmCard: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  farmCardImage: {
    width: '100%',
    height: 100,
  },
  farmCardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginHorizontal: 10,
  },
  farmCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  farmCardRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  cartButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 