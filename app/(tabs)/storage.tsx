import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@/constants/URL';

type StorageUnit = {
  _id: string;
  name: string;
  address: string;
  capacity: string;
  contact: string;
  description: string;
  available: boolean;
};

export default function StorageScreen() {
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);

  useEffect(() => {
    fetchStorageUnits();
  }, []);

  const fetchStorageUnits = async () => {
    try {
      const response = await fetch(`${URL}/coldstorages`);
      const data = await response.json();
      setStorageUnits(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch storage units');
    }
  };

  const getStatusColor = (available: boolean) => {
    return available ? Colors.success : Colors.error;
  };

  const getStatusIcon = (available: boolean) => {
    return available ? 'checkmark-circle' : 'alert-circle';
  };

  const renderStorageUnit = (unit: StorageUnit) => (
    <ThemedView key={unit._id} style={styles.storageCard}>
      <LinearGradient
        colors={[Colors.primary + '10', Colors.secondary + '05']}
        style={styles.cardHeader}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(unit.available) + '20' }]}>
            <Ionicons 
              name={getStatusIcon(unit.available)} 
              size={16} 
              color={getStatusColor(unit.available)} 
            />
            <ThemedText style={[styles.statusText, { color: getStatusColor(unit.available) }]}>
              {unit.available ? 'Available' : 'Full'}
            </ThemedText>
          </View>
          <ThemedText style={styles.unitName}>{unit.name}</ThemedText>
        </View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.infoLabel}>Location</ThemedText>
            <ThemedText style={styles.infoValue}>{unit.address}</ThemedText>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="cube-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.infoLabel}>Capacity</ThemedText>
            <ThemedText style={styles.infoValue}>{unit.capacity}</ThemedText>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.infoLabel}>Contact</ThemedText>
            <ThemedText style={styles.infoValue}>{unit.contact}</ThemedText>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
            <ThemedText style={styles.infoLabel}>Description</ThemedText>
            <ThemedText style={styles.infoValue} numberOfLines={2}>{unit.description}</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <ThemedText style={styles.headerTitle}>Cold Storage</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {storageUnits.filter(unit => unit.available).length} Units Available
            </ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.tipsButton}
            onPress={() => router.push('/storage-tips')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.tipsButtonGradient}
            >
              <Ionicons name="information" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {storageUnits.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="cube-outline" size={64} color={Colors.primary} />
          <ThemedText style={styles.emptyTitle}>No Storage Units</ThemedText>
          <ThemedText style={styles.emptyText}>
            Check back later for available storage units
          </ThemedText>
        </ThemedView>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {storageUnits.map(renderStorageUnit)}
        </ScrollView>
      )}
    </ThemedView>
  );
}

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
  tipsButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  tipsButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  storageCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerLeft: {
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  unitName: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardContent: {
    padding: 15,
    gap: 15,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 15,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.light.text + '80',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
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
  },
}); 