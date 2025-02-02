import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert, FlatList, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { URL } from '@/constants/URL';

type Product = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  farmerLocation: string;
  description: string;
};

export default function FarmerDashboard() {
  const { userId } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const { refresh } = useLocalSearchParams();

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId, refresh]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products for farmer:', userId);
      const response = await fetch(`${URL}/products/farmer/${userId}`);
      const data = await response.json();
      console.log('Products fetched:', data.length);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ThemedView style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.imageOverlay}
      >
        <View style={styles.categoryBadge}>
          <Ionicons name={getCategoryIcon(item.category)} size={16} color="white" />
          <ThemedText style={styles.categoryText}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </ThemedText>
        </View>
      </LinearGradient>

      <ThemedView style={styles.productContent}>
        <View style={styles.productHeader}>
          <ThemedText style={styles.productName}>{item.name}</ThemedText>
          <ThemedText style={styles.price}>₹{item.price}/kg</ThemedText>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="scale-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.detailLabel}>Quantity</ThemedText>
              <ThemedText style={styles.detailValue}>{item.quantity} kg</ThemedText>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.detailLabel}>Location</ThemedText>
              <ThemedText style={styles.detailValue}>{item.farmerLocation}</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.description} numberOfLines={2}>
            {item.description}
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fruits':
        return 'nutrition-outline';
      case 'vegetables':
        return 'leaf-outline';
      case 'cereals':
        return 'basket-outline';
      default:
        return 'cube-outline';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <ThemedText style={styles.headerTitle}>My Products</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Listed
            </ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/(tabs)/add-product')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {products.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="basket-outline" size={64} color={Colors.primary} />
          <ThemedText style={styles.emptyTitle}>No Products Yet</ThemedText>
          <ThemedText style={styles.emptyText}>
            Start adding your products to reach more customers
          </ThemedText>
          <TouchableOpacity 
            style={styles.addFirstButton}
            onPress={() => router.push('/(tabs)/add-product')}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.addFirstGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.addFirstText}>Add Your First Product</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 4,
  },
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  productList: {
    padding: 20,
    gap: 20,
  },
  productCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-end',
    padding: 15,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  productContent: {
    padding: 15,
    gap: 15,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 15,
  },
  detailItem: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.light.text + '80',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.light.text + 'CC',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.text + '99',
    textAlign: 'center',
    marginBottom: 10,
  },
  addFirstButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '100%',
  },
  addFirstGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  addFirstText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 