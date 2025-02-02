import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@/constants/URL';

type PaymentMethod = 'cod' | 'card' | 'upi';

const PaymentIcons = {
  cod: 'cash-outline',
  card: 'card-outline',
  upi: 'phone-portrait-outline'
} as const;

export default function Payment() {
  const { userId } = useUser();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');

  const handlePayment = async () => {
    try {
      const orderData = {
        customerId: userId,
        farmerId: params.farmerId,
        productId: params.productId,
        quantity: parseInt(params.quantity as string),
        paymentMethod: selectedMethod
      };

      const response = await fetch(`${URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully');
        router.push('/orders');
      } else {
        Alert.alert('Error', 'Failed to place order');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Checkout</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.orderSummary}>
          <View style={styles.summaryHeader}>
            <ThemedText  style={styles.summaryTitle}>Order Summary</ThemedText>
            <ThemedText style={styles.amount}>₹{params.totalAmount}</ThemedText>
          </View>
          
          <View style={styles.summaryDetails}>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Quantity</ThemedText>
              <ThemedText style={styles.detailValue}>{params.quantity} kg</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Delivery</ThemedText>
              <ThemedText style={styles.detailValue}>Free</ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.paymentMethods}>
          <ThemedText  style={styles.sectionTitle}>
            Payment Method
          </ThemedText>

          {(Object.keys(PaymentIcons) as PaymentMethod[]).map((method) => (
            <TouchableOpacity 
              key={method}
              style={[
                styles.methodCard,
                selectedMethod === method && styles.selectedMethod
              ]}
              onPress={() => setSelectedMethod(method)}
            >
              <View style={styles.methodContent}>
                <View style={[
                  styles.iconContainer,
                  selectedMethod === method && styles.selectedIconContainer
                ]}>
                  <Ionicons 
                    name={PaymentIcons[method]}
                    size={24}
                    color={selectedMethod === method ? 'white' : Colors.primary}
                  />
                </View>
                <View style={styles.methodInfo}>
                  <ThemedText style={styles.methodTitle}>
                    {method === 'cod' ? 'Cash on Delivery' :
                     method === 'card' ? 'Credit/Debit Card' : 'UPI'}
                  </ThemedText>
                  <ThemedText style={styles.methodDescription}>
                    {method === 'cod' ? 'Pay when you receive' :
                     method === 'card' ? 'Secure card payment' : 'Instant UPI transfer'}
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
        >
          <ThemedText style={styles.buttonText}>
            {selectedMethod === 'cod' ? 'Place Order' : 'Pay Now'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
  content: {
    padding: 20,
    gap: 25,
  },
  orderSummary: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: Colors.light.text + '80',
  },
  detailValue: {
    fontWeight: '500',
  },
  paymentMethods: {
    gap: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  methodCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedMethod: {
    borderColor: Colors.primary,
    backgroundColor: Colors.light.card,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  selectedIconContainer: {
    backgroundColor: Colors.primary,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  methodDescription: {
    fontSize: 13,
    color: Colors.light.text + '80',
    marginTop: 2,
  },
  payButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 