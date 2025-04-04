import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Payment methods
const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: 'card-outline' },
  { id: 'paypal', label: 'PayPal', icon: 'cash-outline' },
  { id: 'cash', label: 'Cash on Delivery', icon: 'cash-outline' }
];

// Delivery options
const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', price: 4.99, eta: '2-3 days' },
  { id: 'express', label: 'Express Delivery', price: 9.99, eta: '1 day' },
  { id: 'pickup', label: 'Pickup from Farm', price: 0, eta: 'Schedule pickup' }
];

const CheckoutScreen = ({ navigation, route }: any) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [address, setAddress] = useState('');
  
  // Subtotal passed from Cart screen or default value
  const subtotal = route.params?.subtotal || 23.95;
  
  // Get delivery fee based on selected option
  const getDeliveryFee = () => {
    const option = deliveryOptions.find(opt => opt.id === selectedDelivery);
    return option ? option.price : 4.99;
  };
  
  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address && selectedDelivery !== 'pickup') {
      Alert.alert('Missing Information', 'Please enter your delivery address');
      return;
    }
    
    // Show loading state or processing animation here
    
    // Simulate order processing
    setTimeout(() => {
      Alert.alert(
        'Order Placed Successfully!',
        'Your order has been placed and will be processed shortly.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Navigate to order confirmation screen or orders list
              navigation.navigate('OrderConfirmation', { 
                orderNumber: `FFA-${Math.floor(100000 + Math.random() * 900000)}`,
                total
              });
            }
          }
        ]
      );
    }, 1500);
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
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Method</Text>
          
          {deliveryOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.optionCard,
                selectedDelivery === option.id && styles.selectedOption
              ]}
              onPress={() => setSelectedDelivery(option.id)}
            >
              <View style={styles.optionContent}>
                <Ionicons 
                  name={option.id === 'pickup' ? 'storefront-outline' : 'bicycle-outline'} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.optionDetails}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionEta}>{option.eta}</Text>
                </View>
              </View>
              
              <View style={styles.optionRight}>
                <Text style={styles.optionPrice}>
                  {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                </Text>
                
                <View 
                  style={[
                    styles.radioButton,
                    selectedDelivery === option.id && styles.radioButtonSelected
                  ]}
                >
                  {selectedDelivery === option.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedDelivery !== 'pickup' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your delivery address"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id}
              style={[
                styles.optionCard,
                selectedPayment === method.id && styles.selectedOption
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.optionContent}>
                <Ionicons name={method.icon as any} size={24} color="#4CAF50" />
                <Text style={styles.optionLabel}>{method.label}</Text>
              </View>
              
              <View 
                style={[
                  styles.radioButton,
                  selectedPayment === method.id && styles.radioButtonSelected
                ]}
              >
                {selectedPayment === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0f8f0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionDetails: {
    marginLeft: 10,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
  optionEta: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    marginTop: 2,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4CAF50',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  addressInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen; 