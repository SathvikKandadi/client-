import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from '@/components/TextInput';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@/constants/URL';

export default function AddVolunteer() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddVolunteer = async () => {
    try {
      const formData = {
        name,
        place,
        age: parseInt(age),
        phoneNumber
      };

      const response = await fetch(`${URL}volunteers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Thank you for volunteering!');
        setName('');
        setPlace('');
        setAge('');
        setPhoneNumber('');
      } else {
        Alert.alert('Error', 'Failed to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.accent, Colors.primary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Join Our Mission</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Help farmers reach more customers</ThemedText>
      </LinearGradient>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.card}>
          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Full Name</ThemedText>
            </View>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              style={styles.input}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="location-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Location</ThemedText>
            </View>
            <TextInput
              value={place}
              onChangeText={setPlace}
              placeholder="Enter your location"
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formField, { flex: 1 }]}>
              <View style={styles.inputHeader}>
                <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.label}>Age</ThemedText>
              </View>
              <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Your age"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={[styles.formField, { flex: 1.5 }]}>
              <View style={styles.inputHeader}>
                <Ionicons name="call-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.label}>Phone Number</ThemedText>
              </View>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Your phone number"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleAddVolunteer}
          >
            <LinearGradient
              colors={Colors.gradients.primary as any}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.buttonText}>Register as Volunteer</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.infoCard}>
          <ThemedText style={styles.infoTitle}>Why Volunteer?</ThemedText>
          <View style={styles.benefitRow}>
            <Ionicons name="heart-outline" size={24} color={Colors.primary} />
            <ThemedText style={styles.benefitText}>Help local farmers grow their business</ThemedText>
          </View>
          <View style={styles.benefitRow}>
            <Ionicons name="people-outline" size={24} color={Colors.primary} />
            <ThemedText style={styles.benefitText}>Connect with your community</ThemedText>
          </View>
          <View style={styles.benefitRow}>
            <Ionicons name="leaf-outline" size={24} color={Colors.primary} />
            <ThemedText style={styles.benefitText}>Support sustainable agriculture</ThemedText>
          </View>
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
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
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
    minHeight:36,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  submitButton: {
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
  infoCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 15,
    padding: 20,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 5,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.light.text + 'CC',
    flex: 1,
  },
}); 