import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from '@/components/TextInput';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@/constants/URL';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'customer' | ''>('');


  const handleSignup = async () => {
    if (!email || !username || !password || !role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => router.push('/login') }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="person-add" size={64} color="white" />
        </View>
        <ThemedText style={styles.headerTitle}>Create Account</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Join our community today</ThemedText>
      </LinearGradient>

      <ThemedView style={styles.content}>
        <View style={styles.formCard}>
          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="mail-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Email</ThemedText>
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Username</ThemedText>
            </View>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Password</ThemedText>
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="people-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>I am a</ThemedText>
            </View>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'farmer' && styles.roleButtonSelected
                ]}
                onPress={() => setRole('farmer')}
              >
                <Ionicons 
                  name="leaf-outline" 
                  size={24} 
                  color={role === 'farmer' ? 'white' : Colors.primary} 
                />
                <ThemedText style={[
                  styles.roleText,
                  role === 'farmer' && styles.roleTextSelected
                ]}>
                  Farmer
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'customer' && styles.roleButtonSelected
                ]}
                onPress={() => setRole('customer')}
              >
                <Ionicons 
                  name="cart-outline" 
                  size={24} 
                  color={role === 'customer' ? 'white' : Colors.primary} 
                />
                <ThemedText style={[
                  styles.roleText,
                  role === 'customer' && styles.roleTextSelected
                ]}>
                  Customer
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.buttonText}>Create Account</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>Already have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <ThemedText style={styles.loginLink}>Login</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -30,
  },
  formCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formField: {
    gap: 8,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.light.background,
  },
  roleButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roleText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  roleTextSelected: {
    color: 'white',
  },
  signupButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.text + '99',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
}); 