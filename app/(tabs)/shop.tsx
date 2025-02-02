import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Alert, FlatList, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { URL } from '@/constants/URL';

type farmerProps = {
    _id:string,
    username:string
}

type Product = {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  farmerLocation: string;
  description: string;
  farmerId: farmerProps;
};

export default function Shop() {
  const { userId } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('1');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const handleOrder = (product: Product) => {
    if (!userId) {
      Alert.alert('Error', 'Please login first');
      router.push('/(auth)/login');
      return;
    }

    router.push({
      pathname: '/payment',
      params: {
        productId: product._id,
        farmerId: product.farmerId._id,
        quantity: orderQuantity,
        totalAmount: (product.price * parseInt(orderQuantity)).toString()
      }
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ThemedView style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.imageOverlay}
      >
        <ThemedText style={styles.categoryBadge}>
          {item.category.toUpperCase()}
        </ThemedText>
      </LinearGradient>
      
      <ThemedView style={styles.productInfo}>
        <ThemedView style={styles.header}>
          <ThemedText  style={styles.productName}>{item.name}</ThemedText>
          <ThemedText style={styles.price}>₹{item.price}/kg</ThemedText>
        </ThemedView>

        <ThemedView style={styles.details}>
          <ThemedView style={styles.detailRow}>
            <ThemedText style={styles.label}>Available:</ThemedText>
            <ThemedText style={styles.value}>{item.quantity} kg</ThemedText>
          </ThemedView>
          <ThemedView style={styles.detailRow}>
            <ThemedText style={styles.label}>Farmer:</ThemedText>
            <ThemedText style={styles.value}>{item.farmerId.username}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.detailRow}>
            <ThemedText style={styles.label}>Location:</ThemedText>
            <ThemedText style={styles.value}>{item.farmerLocation}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.description} numberOfLines={2}>
          {item.description}
        </ThemedText>
        
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => handleOrder(item)}
        >
          <LinearGradient
            colors={Colors.gradients.primary as any}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ThemedText style={styles.buttonText}>Order Now</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Fresh Products</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Direct from farmers</ThemedText>
      </LinearGradient>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        contentContainerStyle={styles.productList}
      />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  productList: {
    padding: 15,
    gap: 20,
  },
  productCard: {
    borderRadius: 15,
    backgroundColor: Colors.light.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
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
    backgroundColor: Colors.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 15,
    gap: 12,
  },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
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
  details: {
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.light.text + '80',
    fontSize: 14,
  },
  value: {
    fontWeight: '500',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: Colors.light.text + 'CC',
    lineHeight: 20,
  },
  orderButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 5,
  },
  gradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 