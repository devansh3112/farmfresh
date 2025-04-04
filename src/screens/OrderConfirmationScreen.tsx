import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const OrderConfirmationScreen = ({ navigation, route }: any) => {
  // Get order details from route params or use defaults
  const orderNumber = route.params?.orderNumber || 'FFA-123456';
  const total = route.params?.total || 28.94;
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successIconContainer}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
        </View>
        
        <Text style={styles.thankYouText}>Thank You!</Text>
        <Text style={styles.orderPlacedText}>Your order has been placed</Text>
        
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order Number:</Text>
            <Text style={styles.orderInfoValue}>{orderNumber}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order Total:</Text>
            <Text style={styles.orderInfoValue}>${total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Date:</Text>
            <Text style={styles.orderInfoValue}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            You will receive an email confirmation shortly with order details and tracking information.
          </Text>
        </View>
        
        <View style={styles.farmImageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1500076656116-558758c991c1' }} 
            style={styles.farmImage}
            resizeMode="cover"
          />
          <View style={styles.farmInfo}>
            <Text style={styles.farmName}>Green Valley Farm</Text>
            <Text style={styles.farmMessage}>
              "Thank you for supporting local farming. We're preparing your fresh produce!"
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.trackOrderButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.trackOrderText}>Track Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  successIconContainer: {
    marginTop: 60,
    marginBottom: 30,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  orderPlacedText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  orderInfoContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderInfoLabel: {
    fontSize: 16,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  messageContainer: {
    marginBottom: 30,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  farmImageContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
  },
  farmImage: {
    width: '100%',
    height: 150,
  },
  farmInfo: {
    padding: 15,
  },
  farmName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  farmMessage: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  trackOrderButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  trackOrderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueShoppingButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  continueShoppingText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen; 