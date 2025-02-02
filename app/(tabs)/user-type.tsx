import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { useUser } from '@/context/UserContext';

const { width } = Dimensions.get('window');

export default function UserTypeScreen() {
  const { setUserRole } = useUser();

  const handleRoleSelection = (role: 'farmer' | 'customer') => {
    setUserRole(role);
    if(role === 'farmer')
      router.push(`/(tabs)/${role}`);
    else
      router.push('/(tabs)/shop');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Welcome!</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Choose your role to continue</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => handleRoleSelection('farmer')}
        >
          <LinearGradient
            colors={[Colors.accent, Colors.primary]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="leaf-outline" size={32} color="white" />
            </View>
            <ThemedText style={styles.roleTitle}>Farmer</ThemedText>
            <ThemedText style={styles.roleDescription}>
              Sell your products directly to customers
            </ThemedText>
            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>List your products</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>Manage orders</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>Access storage facilities</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => handleRoleSelection('customer')}
        >
          <LinearGradient
            colors={[Colors.success, Colors.secondary]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="cart-outline" size={32} color="white" />
            </View>
            <ThemedText style={styles.roleTitle}>Customer</ThemedText>
            <ThemedText style={styles.roleDescription}>
              Buy fresh products directly from farmers
            </ThemedText>
            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>Browse products</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>Place orders</ThemedText>
              </View>
              <View style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <ThemedText style={styles.featureText}>Track deliveries</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: 'center',
  },
  roleCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  features: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    color: 'white',
    fontSize: 14,
  },
}); 