import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useUserRole } from '../contexts/UserRoleContext';

// Dummy reviews data
const reviews = [
  {
    id: '1',
    userName: 'Sarah J.',
    rating: 5,
    date: '2023-04-15',
    comment: 'Absolutely delicious! Will definitely order again. The freshness is incomparable to store-bought.',
  },
  {
    id: '2',
    userName: 'Mike T.',
    rating: 4,
    date: '2023-04-10',
    comment: 'Very good quality. Arrived fresh and tasted great. Highly recommend!',
  },
  {
    id: '3',
    userName: 'Emily R.',
    rating: 5,
    date: '2023-04-05',
    comment: 'Amazing product, delivered quickly and in perfect condition.',
  },
];

// Sample product with working image if no product is passed
const fallbackProduct = {
  id: '1',
  name: 'Organic Strawberries',
  price: '$4.99/lb',
  category: 'Fruits',
  farm: 'Berry Good Farm',
  image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
  description: 'Sweet, juicy organic strawberries picked at peak ripeness.',
  stock: 40,
  rating: 4.9,
};

const ProductDetailScreen = ({ route, navigation }: any) => {
  // Use fallback if no product is passed
  const { product = fallbackProduct } = route.params || {};
  const { userRole } = useUserRole();
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      Alert.alert('Maximum Quantity', 'You have reached the maximum available quantity for this product.');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`,
      [{ text: 'OK', onPress: () => navigation.navigate('Cart') }]
    );
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Proceed to Checkout',
      'You will now be redirected to checkout',
      [{ text: 'OK', onPress: () => navigation.navigate('Cart') }]
    );
  };

  // Generate star rating component
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Ionicons key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={16} color="#FFD700" />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.ratingContainer}>
              {renderStars(product.rating)}
              <Text style={styles.ratingText}>({product.rating.toFixed(1)})</Text>
            </View>
          </View>
          
          <Text style={styles.productPrice}>{product.price}</Text>
          
          <View style={styles.stockInfo}>
            {product.stock < 20 ? (
              <Text style={styles.lowStockText}>Only {product.stock} left in stock</Text>
            ) : (
              <Text style={styles.inStockText}>In Stock ({product.stock} available)</Text>
            )}
          </View>
          
          <View style={styles.farmInfo}>
            <Text style={styles.farmLabel}>From:</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FarmProfile', { farmName: product.farm })}>
              <Text style={styles.farmName}>{product.farm}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.nutritionInfo}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <Text style={styles.nutritionText}>• 100% organic</Text>
            <Text style={styles.nutritionText}>• No pesticides</Text>
            <Text style={styles.nutritionText}>• Locally grown</Text>
            <Text style={styles.nutritionText}>• High in vitamins and nutrients</Text>
          </View>
          
          {userRole !== 'farmer' && (
            <View style={styles.quantitySelector}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                  <Ionicons name="remove" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                  <Ionicons name="add" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          
          <View style={styles.reviewSummary}>
            <View style={styles.reviewRating}>
              {renderStars(product.rating)}
              <Text style={styles.reviewRatingText}>{product.rating.toFixed(1)} out of 5</Text>
            </View>
            <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
          </View>
          
          {displayedReviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
          
          {reviews.length > 2 && (
            <TouchableOpacity 
              style={styles.showMoreButton}
              onPress={() => setShowAllReviews(!showAllReviews)}
            >
              <Text style={styles.showMoreText}>
                {showAllReviews ? 'Show Less' : 'Show All Reviews'}
              </Text>
              <Ionicons 
                name={showAllReviews ? 'chevron-up' : 'chevron-down'} 
                size={16} 
                color="#4CAF50" 
              />
            </TouchableOpacity>
          )}
        </View>
        
        {userRole === 'farmer' ? (
          <View style={styles.farmerActionButtons}>
            <TouchableOpacity 
              style={styles.editProductButton}
              onPress={() => navigation.navigate('EditProduct', { product })}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editProductText}>Edit Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.deleteProductButton}
              onPress={() => {
                Alert.alert(
                  'Delete Product',
                  'Are you sure you want to delete this product?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Delete', 
                      style: 'destructive',
                      onPress: () => {
                        // Handle product deletion
                        navigation.goBack();
                      }
                    }
                  ]
                );
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#FF5252" />
              <Text style={styles.deleteProductText}>Delete Product</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.buyNowButton}
              onPress={handleBuyNow}
            >
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  cartButton: {
    padding: 5,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  productInfo: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stockInfo: {
    marginBottom: 15,
  },
  inStockText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  lowStockText: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: 'bold',
  },
  farmInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  farmLabel: {
    fontSize: 16,
    marginRight: 5,
    color: '#666',
  },
  farmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  nutritionInfo: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  nutritionText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  reviewSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginTop: 8,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    padding: 10,
  },
  showMoreText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  actionButtons: {
    padding: 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  farmerActionButtons: {
    padding: 20,
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  editProductButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editProductText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  deleteProductButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF5252',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteProductText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ProductDetailScreen; 