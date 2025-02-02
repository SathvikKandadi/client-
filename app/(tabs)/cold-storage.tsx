// import { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { RelativePathString, router } from 'expo-router';
// import { useUser } from '@/context/UserContext';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// type StorageFacility = {
//   id: string;
//   name: string;
//   address: string;
//   capacity: string;
//   contact: string;
//   available: boolean;
// };

// type MeetingPoint = {
//   id: string;
//   location: string;
//   time: string;
//   description: string;
// };

// export default function ColdStorage() {
//   const { userId } = useUser();
//   const [facilities, setFacilities] = useState<StorageFacility[]>([]);
//   const [meetingPoints, setMeetingPoints] = useState<MeetingPoint[]>([]);

//   useEffect(() => {
//     fetchColdStorages();
//   }, []);

//   const fetchColdStorages = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/coldstorages');
//       const data = await response.json();
//       setFacilities(data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch cold storages');
//     }
//   };

//   const handleBookStorage = async (id: string) => {
//     if (!userId) {
//       Alert.alert('Error', 'Please login first');
//       router.push('/(auth)/login');
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/coldstorages/book/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });
      
//       if (response.ok) {
//         Alert.alert('Success', 'Storage booked successfully');
//         fetchColdStorages();
//       } else {
//         Alert.alert('Error', 'Failed to book storage');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const renderFacility = ({ item }: { item: StorageFacility }) => (
//     <ThemedView style={styles.facilityCard}>
//       <ThemedText type="subtitle">{item.name}</ThemedText>
//       <ThemedText>{item.address}</ThemedText>
//       <ThemedText>Capacity: {item.capacity}</ThemedText>
//       <ThemedText>Contact: {item.contact}</ThemedText>
//       <ThemedView style={[
//         styles.availabilityBadge,
//         { backgroundColor: item.available ? '#4CAF50' : '#f44336' }
//       ]}>
//         <ThemedText style={styles.badgeText}>
//           {item.available ? 'Available' : 'Full'}
//         </ThemedText>
//       </ThemedView>
//     </ThemedView>
//   );

//   const renderMeetingPoint = ({ item }: { item: MeetingPoint }) => (
//     <ThemedView style={styles.meetingCard}>
//       <ThemedText type="subtitle">{item.location}</ThemedText>
//       <ThemedText>{item.time}</ThemedText>
//       <ThemedText>{item.description}</ThemedText>
//     </ThemedView>
//   );

//   return (
//     <ScrollView>
//       <ThemedView style={styles.container}>
//         <ThemedText type="title">Cold Storage Facilities</ThemedText>
        
//         <FlatList
//           data={facilities}
//           renderItem={renderFacility}
//           keyExtractor={(item) => item.id}
//           scrollEnabled={false}
//           contentContainerStyle={styles.facilitiesList}
//         />

//         <TouchableOpacity 
//           style={styles.tipsButton}
//           onPress={() => router.push('/storage-tips')}
//         >
//           <ThemedText style={styles.buttonText}>Storage Tips & Precautions</ThemedText>
//         </TouchableOpacity>

//         {/* <ThemedText type="title" style={styles.meetingTitle}>Meeting Points</ThemedText>
//         <FlatList
//           data={meetingPoints}
//           renderItem={renderMeetingPoint}
//           keyExtractor={(item) => item.id}
//           scrollEnabled={false}
//           contentContainerStyle={styles.meetingList}
//         /> */}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   facilitiesList: {
//     gap: 15,
//     marginTop: 20,
//   },
//   facilityCard: {
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     gap: 5,
//   },
//   availabilityBadge: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//     marginTop: 5,
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   tipsButton: {
//     backgroundColor: '#0a7ea4',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   meetingTitle: {
//     marginTop: 30,
//   },
//   meetingList: {
//     gap: 15,
//     marginTop: 20,
//   },
//   meetingCard: {
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     gap: 5,
//   },
// }); 