import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/Colors';

export function LogoutButton() {
  const { setUserId, setUserRole } = useUser();

  const handleLogout = () => {
    setUserId(null);
    setUserRole(null);
    router.push('/');
  };

  return (
    <TouchableOpacity 
      style={styles.logoutButton} 
      onPress={handleLogout}
    >
      <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 8,
    marginRight: 8,
  },
}); 