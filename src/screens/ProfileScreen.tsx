import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Switch,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../contexts/UserRoleContext';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { userRole, toggleUserRole } = useUserRole();
  const isFarmer = userRole === 'farmer';

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Welcome');
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <Image 
            source={{ 
              uri: isFarmer 
                ? 'https://images.unsplash.com/photo-1553787434-dd9eb4ea4d25'
                : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
            }} 
            style={styles.profileImage} 
          />
          <Text style={styles.name}>{user?.name || 'User Name'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.roleBadge}>
            <Ionicons 
              name={isFarmer ? 'leaf' : 'basket'} 
              size={16} 
              color="white" 
            />
            <Text style={styles.roleText}>
              {isFarmer ? 'Farmer' : 'Consumer'}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <View style={styles.menuItem}>
            <Ionicons name={isFarmer ? "leaf-outline" : "basket-outline"} size={22} color="#555" />
            <Text style={styles.menuItemText}>
              Switch to {isFarmer ? 'Consumer' : 'Farmer'} Mode
            </Text>
            <Switch
              value={isFarmer}
              onValueChange={toggleUserRole}
              trackColor={{ false: '#ccc', true: '#4CAF5066' }}
              thumbColor={isFarmer ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {isFarmer && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Farmer Settings</Text>
            </View>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="storefront-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Farm Profile</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="card-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="analytics-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Sales Report</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}
        
        {!isFarmer && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Consumer Settings</Text>
            </View>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="location-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Delivery Addresses</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="card-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Payment Methods</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="heart-outline" size={22} color="#555" />
              <Text style={styles.menuItemText}>Favorites</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Help & Support</Text>
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>FAQ</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="chatbubble-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color="#555" />
            <Text style={styles.menuItemText}>Terms & Policies</Text>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF5252" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  roleText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default ProfileScreen; 