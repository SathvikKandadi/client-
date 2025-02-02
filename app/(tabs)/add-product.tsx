import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ScrollView, View, Image } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from '@/components/TextInput';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { URL } from '@/constants/URL';

export default function AddProduct() {
  const { userId } = useUser();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const categories = ['Fruits', 'Vegetables', 'Cereals', 'Pulses', 'Spices'];

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaTypes:'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const sourceUri = result.assets[0].uri;
  
      // Define the target folder and file name
      const targetPath = `${FileSystem.documentDirectory}images/`;
      const fileName = sourceUri.split('/').pop(); // Get the original file name
      const targetUri = targetPath + fileName;
  
      // Ensure the folder exists
      await FileSystem.makeDirectoryAsync(targetPath, { intermediates: true });
  
      // Move the file to the target folder
      await FileSystem.moveAsync({
        from: sourceUri,
        to: targetUri,
      });
  
      // Set the image URI to show the preview
      setImage(targetUri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !category || !quantity || !price || !description || !location) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const formData = {
        name,
        category,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        description,
        farmerLocation: location,
        image,
        farmerId: userId,
      };
      
      const response = await fetch(`${URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert(
          'Success', 
          'Product added successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                router.push({
                  pathname: '/(tabs)/farmer',
                  params: { refresh: Date.now().toString() }
                });
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Add this function to generate recommended prices
  const getRecommendedPrice = () => {
    const priceRanges = {
      fruits: { min: 40, max: 120 }, // Common fruit prices per kg in INR
      vegetables: { min: 20, max: 60 }, // Common vegetable prices
      cereals: { min: 25, max: 45 }, // Common cereal prices
      pulses: { min: 80, max: 150 }, // Common pulses prices
      spices: { min: 200, max: 500 }, // Common spices prices
    };

    if (!category) {
      Alert.alert('Select Category', 'Please select a category first to get a price recommendation.');
      return;
    }

    const range = priceRanges[category as keyof typeof priceRanges];
    const recommendedPrice = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
    setPrice(recommendedPrice.toString());
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Add New Product</ThemedText>
        <ThemedText style={styles.headerSubtitle}>List your products for customers</ThemedText>
      </LinearGradient>

      <ThemedView style={styles.content}>
        <TouchableOpacity 
          style={styles.imageUpload}
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <LinearGradient
              colors={[Colors.primary + '20', Colors.secondary + '10']}
              style={styles.uploadPlaceholder}
            >
              <Ionicons name="camera-outline" size={32} color={Colors.primary} />
              <ThemedText style={styles.uploadText}>Add Product Image</ThemedText>
            </LinearGradient>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="cube-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Product Name</ThemedText>
            </View>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
              style={styles.input}
              placeholderTextColor={Colors.light.text + '80'}
            />
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="apps-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Category</ThemedText>
            </View>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat.toLowerCase() && styles.categoryChipSelected
                  ]}
                  onPress={() => setCategory(cat.toLowerCase())}
                >
                  <ThemedText 
                    style={[
                      styles.categoryChipText,
                      category === cat.toLowerCase() && styles.categoryChipTextSelected
                    ]}
                  >
                    {cat}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formField, { flex: 1 }]}>
              <View style={styles.inputHeader}>
                <Ionicons name="scale-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.label}>Quantity (kg)</ThemedText>
              </View>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Enter quantity in kg"
                keyboardType="numeric"
                style={[styles.input, styles.inputField]}
                placeholderTextColor={Colors.light.text + '80'}
              />
            </View>

            <View style={[styles.formField, { flex: 1 }]}>
              <View style={styles.inputHeader}>
                <Ionicons name="pricetag-outline" size={20} color={Colors.primary} />
                <ThemedText style={styles.label}>Price (₹/kg)</ThemedText>
              </View>
              <View style={styles.priceInputContainer}>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price per kg"
                  keyboardType="numeric"
                  style={[styles.input, styles.priceInput]}
                  placeholderTextColor={Colors.light.text + '80'}
                />
                <TouchableOpacity 
                  style={styles.recommendButton}
                  onPress={getRecommendedPrice}
                >
                  <ThemedText style={styles.recommendButtonText}>Recommend Price</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="location-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Location</ThemedText>
            </View>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
              style={styles.input}
              placeholderTextColor={Colors.light.text + '80'}
            />
          </View>
          

          <View style={styles.formField}>
            <View style={styles.inputHeader}>
              <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.label}>Description</ThemedText>
            </View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
              style={styles.descriptionInput}
              placeholderTextColor={Colors.light.text + '80'}
            />
          </View>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => handleAddProduct()}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.buttonText}>Add Product</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    minHeight: 48,
    justifyContent: 'center',
  },
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
  imageUpload: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    gap: 10,
  },
  uploadText: {
    fontSize: 16,
    color: Colors.primary,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  form: {
    gap: 20,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,

  },
  categoryPicker: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 16,
    height: 48,
  },
  pickerItem: {
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  categoryChipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  priceInputContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  priceInput: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  recommendButton: {
    backgroundColor: Colors.primary + '20',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  recommendButtonText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
}); 