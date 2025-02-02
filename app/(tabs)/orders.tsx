import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList, Alert, View } from 'react-native';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@/constants/URL';

type Order = {
  _id: string;
  customerId: string;
  farmerId: string;
  productId: {
    name: string;
    price: number;
    category: string;
  };
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

const StatusColors = {
  'Pending': Colors.warning,
  'Processing': Colors.accent,
  'Delivered': Colors.success,
  'Cancelled': Colors.error,
} as const;

export default function Orders() {
  const { userId, userRole } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, userRole]);

  const fetchOrders = async () => {
    try {
      const endpoint = userRole === 'farmer' 
        ? `${URL}/orders/farmer/${userId}`
        : `${URL}/orders/customer/${userId}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders');
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <ThemedView style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <ThemedText  style={styles.productName}>
            {item.productId.name}
          </ThemedText>
          <ThemedText style={styles.orderDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </ThemedText>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: StatusColors[item.status as keyof typeof StatusColors] || Colors.warning }
        ]}>
          <ThemedText style={styles.statusText}>
            {item.status || 'Pending'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="cube-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.detailLabel}>Category</ThemedText>
            <ThemedText style={styles.detailValue}>{item.productId.category}</ThemedText>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="scale-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.detailLabel}>Quantity</ThemedText>
            <ThemedText style={styles.detailValue}>{item.quantity} kg</ThemedText>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="pricetag-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.detailLabel}>Price/kg</ThemedText>
            <ThemedText style={styles.detailValue}>₹{item.productId.price}</ThemedText>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="wallet-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.detailLabel}>Total</ThemedText>
            <ThemedText style={styles.detailValue}>₹{item.totalPrice}</ThemedText>
          </View>
        </View>

        <View style={styles.paymentInfo}>
          <Ionicons name="card-outline" size={20} color={Colors.primary} />
          <ThemedText style={styles.paymentMethod}>
            {item.paymentMethod === 'cod' ? 'Cash on Delivery' :
             item.paymentMethod === 'card' ? 'Card Payment' : 'UPI Payment'}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {userRole === 'farmer' ? 'Orders Received' : 'My Orders'}
        </ThemedText>
      </ThemedView>
      
      {orders.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="bag-outline" size={64} color={Colors.primary} />
          <ThemedText style={styles.emptyText}>No orders found</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          contentContainerStyle={styles.ordersList}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  ordersList: {
    padding: 20,
    gap: 20,
  },
  orderCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 18,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.text + '80',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 15,
  },
  orderDetails: {
    gap: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 10,
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.light.text + '80',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 10,
  },
  paymentMethod: {
    fontSize: 14,
    color: Colors.light.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.text + '80',
  },
}); 