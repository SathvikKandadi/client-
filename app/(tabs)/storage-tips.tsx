import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const tips = [
  {
    title: 'Temperature Control',
    icon: 'thermometer-outline',
    tips: [
      'Maintain consistent temperature between 0-4°C',
      'Monitor temperature regularly',
      'Avoid temperature fluctuations',
      'Use temperature logging devices'
    ]
  },
  {
    title: 'Humidity Management',
    icon: 'water-outline',
    tips: [
      'Keep relative humidity between 85-95%',
      'Use humidity controllers if necessary',
      'Prevent condensation on products',
      'Monitor humidity levels daily'
    ]
  },
  {
    title: 'Product Handling',
    icon: 'hand-left-outline',
    tips: [
      'Clean products before storage',
      'Use appropriate packaging materials',
      'Maintain proper spacing between items',
      'Handle with care to prevent damage'
    ]
  },
  {
    title: 'Safety Measures',
    icon: 'shield-checkmark-outline',
    tips: [
      'Regular equipment maintenance',
      'Emergency power backup',
      'Proper ventilation system',
      'Regular safety inspections'
    ]
  }
];

export default function StorageTips() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Storage Guidelines</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Best practices for product storage</ThemedText>
      </LinearGradient>

      <ThemedView style={styles.content}>
        {tips.map((section, index) => (
          <ThemedView key={section.title} style={styles.card}>
            <LinearGradient
              colors={[Colors.primary + '20', Colors.secondary + '10']}
              style={styles.cardHeader}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={section.icon as any} size={24} color={Colors.primary} />
              </View>
              <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
            </LinearGradient>

            <View style={styles.tipsList}>
              {section.tips.map((tip, tipIndex) => (
                <View key={tipIndex} style={styles.tipRow}>
                  <View style={styles.bulletPoint}>
                    <Ionicons name="checkmark" size={16} color={Colors.success} />
                  </View>
                  <ThemedText style={styles.tipText}>{tip}</ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>
        ))}

        <ThemedView style={styles.noteCard}>
          <Ionicons name="information-circle" size={24} color={Colors.warning} />
          <ThemedText style={styles.noteText}>
            Regular monitoring and maintenance of these conditions is essential for optimal storage results.
          </ThemedText>
        </ThemedView>
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
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  card: {
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
    alignItems: 'center',
    padding: 15,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  tipsList: {
    padding: 15,
    gap: 12,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text + 'DD',
  },
  noteCard: {
    backgroundColor: Colors.warning + '10',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.warning,
    lineHeight: 20,
  },
}); 