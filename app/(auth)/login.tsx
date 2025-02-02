import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from '@/components/TextInput';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/context/UserContext';
import { URL } from '@/constants/URL';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId, setUserRole } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data._id);
        setUserRole(data.role);
        router.push('/(tabs)/user-type');
      } else {
        Alert.alert('Error', data.error || 'Invalid credentials');
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
          <Ionicons name="leaf" size={64} color="white" />
        </View>
        <ThemedText style={styles.headerTitle}>Welcome Back!</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Login to continue</ThemedText>
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
              <Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Password</ThemedText>
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.buttonText}>Login</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>Don't have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
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
  loginButton: {
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
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
}); 