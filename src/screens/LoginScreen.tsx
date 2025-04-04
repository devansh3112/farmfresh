import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  // Debug log current auth state
  console.log('Login Screen - Auth State:', { isAuthenticated });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password: '***' });
      const success = await login(email, password);
      
      console.log('Login result:', { success });
      
      if (success) {
        // Navigate to home screen on successful login
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // For demo login
  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    
    try {
      console.log('Demo login with:', { email: demoEmail, password: '***' });
      const success = await login(demoEmail, demoPassword);
      
      console.log('Demo login result:', { success });
      
      if (success) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Demo login failed. Please try again.');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoAccounts}>
        <Text style={styles.demoTitle}>Demo Accounts:</Text>
        <TouchableOpacity 
          onPress={() => handleDemoLogin('farmer@farmfresh.com', 'password123')}
        >
          <Text style={[styles.demoText, styles.demoLink]}>
            Farmer: farmer@farmfresh.com / password123
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDemoLogin('customer@farmfresh.com', 'password123')}
        >
          <Text style={[styles.demoText, styles.demoLink]}>
            Customer: customer@farmfresh.com / password123
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40,
    textAlign: 'center',
    color: '#4CAF50',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  footerLink: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  demoAccounts: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  demoLink: {
    textDecorationLine: 'underline',
    color: '#4CAF50',
  }
});

export default LoginScreen; 