import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue, 
  withDelay 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function Index() {
  const logoScale = useSharedValue(0.3);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1);
    titleOpacity.value = withDelay(300, withSpring(1));
    subtitleOpacity.value = withDelay(600, withSpring(1));
    buttonsOpacity.value = withDelay(900, withSpring(1));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }]
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: withSpring(titleOpacity.value * 0) }]
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: withSpring(subtitleOpacity.value * 0) }]
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: withSpring(buttonsOpacity.value * 0) }]
  }));

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Animated.View style={titleStyle}>
            <ThemedText style={styles.title}>Kishan Sahayak</ThemedText>
          </Animated.View>

          <Animated.View style={subtitleStyle}> 
            <ThemedText style={styles.subtitle}>
              Connecting farmers directly with customers
            </ThemedText>
          </Animated.View>
        </View>

        <Animated.View style={[styles.buttonContainer, buttonsStyle]}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/login')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.buttonGradient}
            >
              <Ionicons name="log-in-outline" size={24} color="white" />
              <ThemedText style={styles.buttonText}>Login</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/signup')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.buttonGradient}
            >
              <Ionicons name="person-add-outline" size={24} color="white" />
              <ThemedText style={styles.buttonText}>Create Account</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Join our community of farmers and customers
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
}); 