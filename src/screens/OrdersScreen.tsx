import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Dummy orders data
const orders = [
  {
    id: '1',
    orderNumber: 'FFA-1001',
    date: '2023-05-25',
    status: 'Delivered',
    total: '$45.99',
    items: [
      { name: 'Fresh Apples', quantity: '2 lbs', price: '$5.98' },
      { name: 'Free-Range Eggs', quantity: '1 dozen', price: '$4.99' },
      { name: 'Grass-Fed Beef', quantity: '3 lbs', price: '$29.97' },
      { name: 'Local Honey', quantity: '1 jar', price: '$8.99' },
    ],
  },
  {
    id: '2',
    orderNumber: 'FFA-1002',
    date: '2023-05-28',
    status: 'In Transit',
    total: '$28.45',
    items: [
      { name: 'Organic Carrots', quantity: '2 bunches', price: '$3.98' },
      { name: 'Fresh Tomatoes', quantity: '3 lbs', price: '$10.47' },
      { name: 'Local Honey', quantity: '1 jar', price: '$8.99' },
      { name: 'Fresh Apples', quantity: '1 lb', price: '$2.99' },
    ],
  },
  {
    id: '3',
    orderNumber: 'FFA-1003',
    date: '2023-05-30',
    status: 'Processing',
    total: '$37.96',
    items: [
      { name: 'Grass-Fed Beef', quantity: '2 lbs', price: '$19.98' },
      { name: 'Free-Range Eggs', quantity: '2 dozen', price: '$9.98' },
      { name: 'Fresh Tomatoes', quantity: '2 lbs', price: '$6.98' },
    ],
  },
];

const OrdersScreen = ({ navigation }: any) => {
  // Function to get a color based on order status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'In Transit':
        return '#2196F3';
      case 'Processing':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const renderOrder = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
        <Text style={styles.orderTotal}>Total: {item.total}</Text>
      </View>
      
      <View style={styles.itemList}>
        <Text style={styles.itemsTitle}>Items:</Text>
        {item.items.slice(0, 2).map((orderItem: any, index: number) => (
          <Text key={index} style={styles.itemText}>
            • {orderItem.name} ({orderItem.quantity})
          </Text>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>+{item.items.length - 2} more items</Text>
        )}
      </View>
      
      <View style={styles.orderFooter}>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
      />
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ordersList: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemList: {
    marginBottom: 10,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  moreItems: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 5,
  },
  orderFooter: {
    alignItems: 'flex-end',
  },
});

export default OrdersScreen; 