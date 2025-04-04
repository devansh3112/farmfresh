import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useUserRole } from '../contexts/UserRoleContext';

// Dummy products data - with working images
const productsData = [
  {
    id: '1',
    name: 'Fresh Apples',
    price: '$2.99/lb',
    category: 'Fruits',
    farm: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    description: 'Locally grown organic apples. Sweet and crisp.',
    stock: 50,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Organic Carrots',
    price: '$1.99/bunch',
    category: 'Vegetables',
    farm: 'Sunshine Acres',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780',
    description: 'Farm fresh organic carrots picked daily.',
    stock: 35,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Free-Range Eggs',
    price: '$4.99/dozen',
    category: 'Dairy & Eggs',
    farm: 'Happy Hen Farm',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637',
    description: 'Eggs from free-range, pasture-raised chickens.',
    stock: 20,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Grass-Fed Beef',
    price: '$9.99/lb',
    category: 'Meat',
    farm: 'Rolling Hills Ranch',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143',
    description: '100% grass-fed beef with no hormones or antibiotics.',
    stock: 15,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Local Honey',
    price: '$8.99/jar',
    category: 'Pantry',
    farm: 'Busy Bee Apiary',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
    description: 'Raw, unfiltered honey produced locally.',
    stock: 30,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Fresh Tomatoes',
    price: '$3.49/lb',
    category: 'Vegetables',
    farm: 'Sunshine Acres',
    image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0',
    description: 'Vine-ripened tomatoes picked at peak freshness.',
    stock: 40,
    rating: 4.4,
  },
  {
    id: '7',
    name: 'Leafy Spinach',
    price: '$2.49/bunch',
    category: 'Vegetables',
    farm: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    description: 'Fresh, organic spinach rich in nutrients.',
    stock: 25,
    rating: 4.3,
  },
  {
    id: '8',
    name: 'Organic Blueberries',
    price: '$4.99/pint',
    category: 'Fruits',
    farm: 'Berry Good Farm',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e',
    description: 'Sweet, juicy blueberries grown organically.',
    stock: 45,
    rating: 4.8,
  },
  {
    id: '9',
    name: 'Fresh Milk',
    price: '$3.99/gallon',
    category: 'Dairy & Eggs',
    farm: 'Meadow View Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
    description: 'Pasteurized whole milk from grass-fed cows.',
    stock: 30,
    rating: 4.5,
  },
  {
    id: '10',
    name: 'Organic Potatoes',
    price: '$1.99/lb',
    category: 'Vegetables',
    farm: 'Root Harvest Farm',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    description: 'Versatile, organic potatoes for all your cooking needs.',
    stock: 60,
    rating: 4.6,
  },
];

const categories = [
  'All', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat', 'Pantry'
];

const sortOptions = [
  { id: 'default', label: 'Default' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' }
];

const ProductsScreen = ({ navigation, route }: any) => {
  const { userRole } = useUserRole();
  const isFarmer = userRole === 'farmer';
  
  // Get category from route params if available
  const initialCategory = route.params?.category || 'All';
  
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.farm.toLowerCase().includes(query) || 
          item.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
        break;
      case 'price-high':
        result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      // Default is 'default', no sorting needed
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Render product for consumer view (grid layout)
  const renderConsumerProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      {item.stock < 20 && (
        <View style={styles.lowStockBadge}>
          <Text style={styles.lowStockText}>Low Stock</Text>
        </View>
      )}
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.farmInfo}>
          <Text style={styles.farmName}>{item.farm}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render product for farmer view (list layout)
  const renderFarmerProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.farmerProductCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.farmerProductImage} />
      
      <View style={styles.farmerProductInfo}>
        <Text style={styles.farmerProductName}>{item.name}</Text>
        <Text style={styles.farmerProductCategory}>{item.category}</Text>
        
        <View style={styles.priceStockContainer}>
          <Text style={styles.farmerProductPrice}>{item.price}</Text>
          <Text style={styles.farmerProductStock}>
            Stock: <Text style={styles.stockNumber}>{item.stock}</Text>
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#777" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
  
  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={viewMode === 'grid' ? styles.gridItem : styles.listItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={viewMode === 'grid' ? styles.gridItemImage : styles.listItemImage} 
      />
      
      <View style={viewMode === 'grid' ? styles.gridItemInfo : styles.listItemInfo}>
        <Text 
          style={styles.productName} 
          numberOfLines={viewMode === 'grid' ? 1 : 2}
        >
          {item.name}
        </Text>
        <Text style={styles.farmName}>{item.farm}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
        
        {viewMode === 'list' && (
          <Text style={styles.productCategory}>{item.category}</Text>
        )}
        
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price.replace(/[^0-9.]/g, '')}</Text>
          
          {!isFarmer && (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => alert(`${item.name} added to cart`)}
            >
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        {isFarmer ? (
          <Text style={styles.headerTitle}>My Products</Text>
        ) : (
          <Text style={styles.headerTitle}>Fresh Products</Text>
        )}
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={isFarmer ? "Search your products..." : "Search products or farms..."}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Ionicons name="options-outline" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      {showSortOptions && (
        <View style={styles.sortOptionsContainer}>
          <Text style={styles.sortTitle}>Sort by:</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.sortOption,
                sortBy === option.id ? styles.selectedSortOption : null
              ]}
              onPress={() => {
                setSortBy(option.id);
                setShowSortOptions(false);
              }}
            >
              <Text 
                style={[
                  styles.sortOptionText,
                  sortBy === option.id ? styles.selectedSortOptionText : null
                ]}
              >
                {option.label}
              </Text>
              {sortBy === option.id && (
                <Ionicons name="checkmark" size={18} color="#4CAF50" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(renderCategoryButton)}
      </ScrollView>
      
      {isFarmer && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add New Product</Text>
        </TouchableOpacity>
      )}
      
      {filteredProducts.length > 0 ? (
        <FlatList
          key={`products-${viewMode}`}
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={60} color="#ccc" />
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubText}>
            Try adjusting your search or filters
          </Text>
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setSortBy('default');
            }}
          >
            <Text style={styles.clearFiltersText}>Clear all filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Consumer Cart Button */}
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
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sortButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortOptionsContainer: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    borderRadius: 8,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sortTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedSortOption: {
    backgroundColor: '#f0f8f0',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSortOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  farmInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  farmName: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  lowStockBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  lowStockText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  farmerProductCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  farmerProductImage: {
    width: 100,
    height: 100,
  },
  farmerProductInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  farmerProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  farmerProductCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  farmerProductPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  farmerProductStock: {
    fontSize: 14,
    color: '#777',
  },
  stockNumber: {
    fontWeight: '600',
    color: '#555',
  },
  moreButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearFiltersText: {
    color: 'white',
    fontWeight: 'bold',
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
  gridItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  gridItemImage: {
    width: '100%',
    height: 150,
  },
  listItemImage: {
    width: 120,
    height: 120,
  },
  gridItemInfo: {
    padding: 10,
  },
  listItemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productCategory: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default ProductsScreen; 