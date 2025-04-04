import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Categories for the dropdown
const categories = [
  'Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat', 'Pantry'
];

const AddProductScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProduct = () => {
    // Form validation
    if (!name || !price || !description || !stock || !selectedCategory) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      
      Alert.alert(
        'Product Added',
        'Your product has been added successfully',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('ProductsList')
          }
        ]
      );
    }, 1000);
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
        <Text style={styles.headerTitle}>Add New Product</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Product Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Price *</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInput}
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
              <TouchableOpacity style={styles.unitSelector}>
                <Text style={styles.unitText}>per lb</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category *</Text>
            <TouchableOpacity 
              style={styles.categorySelector}
              onPress={() => setShowCategories(!showCategories)}
            >
              <Text style={selectedCategory ? styles.categoryText : styles.placeholderText}>
                {selectedCategory || 'Select a category'}
              </Text>
              <Ionicons 
                name={showCategories ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {showCategories && (
              <View style={styles.categoriesList}>
                {categories.map((category, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.categoryOption}
                    onPress={() => {
                      setSelectedCategory(category);
                      setShowCategories(false);
                    }}
                  >
                    <Text style={styles.categoryOptionText}>{category}</Text>
                    {selectedCategory === category && (
                      <Ionicons name="checkmark" size={20} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Stock Quantity *</Text>
            <TextInput
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              placeholder="Enter available quantity"
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your product..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Image</Text>
          
          <View style={styles.imageSection}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.productImage}
            />
            
            <View style={styles.imageButtons}>
              <TouchableOpacity style={styles.imageButton}>
                <Ionicons name="camera-outline" size={20} color="#4CAF50" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.imageButton}>
                <Ionicons name="image-outline" size={20} color="#4CAF50" />
                <Text style={styles.imageButtonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Enter image URL"
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveProduct}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.saveButtonText}>Adding Product...</Text>
          ) : (
            <>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.saveButtonText}>Add Product</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  currencySymbol: {
    fontSize: 16,
    paddingLeft: 12,
    color: '#333',
  },
  priceInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  unitText: {
    marginRight: 5,
    color: '#666',
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  categoriesList: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  imageButtonText: {
    color: '#4CAF50',
    marginLeft: 5,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AddProductScreen; 