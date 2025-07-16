import { View, Text, TextInput, Pressable, Image, FlatList, StyleSheet, ImageSourcePropType, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

// Define valid routes as a type based on _layout.tsx
type RouteParams = {
  'landing': undefined;
  'moving': undefined;
  'cleaning': undefined;
  'furniture-assembly': undefined;
  'home-improvement': undefined;
  'running-errands': undefined;
  'wall-mounting': undefined;
  'booked-services': undefined;
  'past-services': undefined;
  'account': undefined;
  'faq': undefined;
  'contact-support': undefined;
  'user-guide': undefined;
};

export default function Landing() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  
  // Reanimated shared values for smooth animations
  const menuOpacity = useSharedValue(0);
  const menuScale = useSharedValue(0.3);
  const menuTranslateY = useSharedValue(20);
  
  const helpOpacity = useSharedValue(0);
  const helpScale = useSharedValue(0.3);
  const helpTranslateY = useSharedValue(20);
  
  // Convert route to string path for navigation
  const navigate = (route: keyof RouteParams) => router.push(route as any);

  const showMenu = () => {
    setMenuVisible(true);
    menuOpacity.value = withTiming(1, { duration: 300 });
    menuScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    menuTranslateY.value = withSpring(0, { damping: 15, stiffness: 200 });
  };

  const hideMenu = () => {
    menuOpacity.value = withTiming(0, { duration: 200 });
    menuScale.value = withTiming(0.3, { duration: 200 });
    menuTranslateY.value = withTiming(20, { duration: 200 }, () => {
      runOnJS(setMenuVisible)(false);
    });
  };

  const showHelp = () => {
    setHelpVisible(true);
    helpOpacity.value = withTiming(1, { duration: 300 });
    helpScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    helpTranslateY.value = withSpring(0, { damping: 15, stiffness: 200 });
  };
  
  const hideHelp = () => {
    helpOpacity.value = withTiming(0, { duration: 200 });
    helpScale.value = withTiming(0.3, { duration: 200 });
    helpTranslateY.value = withTiming(20, { duration: 200 }, () => {
      runOnJS(setHelpVisible)(false);
    });
  };

  // Animated styles for the modals
  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [
      { scale: menuScale.value },
      { translateY: menuTranslateY.value }
    ],
  }));

  const helpAnimatedStyle = useAnimatedStyle(() => ({
    opacity: helpOpacity.value,
    transform: [
      { scale: helpScale.value },
      { translateY: helpTranslateY.value }
    ],
  }));

  // Background overlay animated styles
  const menuOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(menuOpacity.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

  const helpOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(helpOpacity.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

  // Your custom search icon SVG
  const searchIconSvg = `
    <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="5" stroke="#555555" stroke-width="2" fill="none" />
      <line x1="11.5" y1="11.5" x2="17" y2="17" stroke="#555555" stroke-width="2" />
    </svg>
  `;

  const services: { id: string; title: string; image: ImageSourcePropType; route: keyof RouteParams }[] = [
    { id: '1', title: 'Moving', image: require('../assets/images/moving.png'), route: 'moving' },
    { id: '2', title: 'Cleaning', image: require('../assets/images/cleaning.png'), route: 'cleaning' },
    { id: '3', title: 'Furniture Assembly', image: require('../assets/images/furniture-assembly.png'), route: 'furniture-assembly' },
    { id: '4', title: 'Home Improvement', image: require('../assets/images/home-improvement.png'), route: 'home-improvement' },
    { id: '5', title: 'Running Errands', image: require('../assets/images/running-errands.png'), route: 'running-errands' },
    { id: '6', title: 'Wall Mounting', image: require('../assets/images/wall-mounting.png'), route: 'wall-mounting' },
  ];

  const renderService = ({ item }: { item: { id: string; title: string; image: ImageSourcePropType; route: keyof RouteParams } }) => (
    <Pressable
      onPress={() => navigate(item.route)}
      style={styles.serviceItem}
    >
      <View>
        <Image source={item.image} style={styles.serviceImage} />
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What can we help with?</Text>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchIcon}>
          <SvgXml xml={searchIconSvg} width="24" height="24" />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          placeholder="Try 'Moving' or 'Housekeeping'"
          placeholderTextColor="#666666"
        />
      </View>
      <Text style={styles.popularTitle}>Popular Services</Text>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.bottomNav}>
        <Pressable onPress={showMenu} style={[styles.menuIcon, menuVisible && styles.menuIconActive]}>
          <Text style={styles.menuIconText}>☰</Text>
        </Pressable>
        <Pressable onPress={showHelp} style={[styles.helpIcon, helpVisible && styles.helpIconActive]}>
          <Text style={[styles.helpIconText, helpVisible && styles.helpIconTextActive]}>?</Text>
        </Pressable>
      </View>

      {/* Menu Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={hideMenu}
      >
        <Animated.View style={[styles.modalOverlay, menuOverlayStyle]}>
          <Pressable style={styles.overlayPressable} onPress={hideMenu} />
          <Animated.View 
            style={[
              styles.modalContainer, 
              styles.menuModalContainer,
              menuAnimatedStyle
            ]}
          >
            <Pressable style={styles.modalOption} onPress={() => { hideMenu(); navigate('booked-services' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>✓</Text>
              <Text style={styles.optionText}>Booked Services</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={() => { hideMenu(); navigate('past-services' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>🕒</Text>
              <Text style={styles.optionText}>Past Services</Text>
            </Pressable>
            <Pressable style={[styles.modalOption, styles.lastModalOption]} onPress={() => { hideMenu(); navigate('account' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>👤</Text>
              <Text style={styles.optionText}>Account</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* Help Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={helpVisible}
        onRequestClose={hideHelp}
      >
        <Animated.View style={[styles.modalOverlay, helpOverlayStyle]}>
          <Pressable style={styles.overlayPressable} onPress={hideHelp} />
          <Animated.View style={[styles.modalContainer, styles.helpModalContainer, helpAnimatedStyle]}>
            <Pressable style={styles.modalOption} onPress={() => { hideHelp(); navigate('faq' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>❓</Text>
              <Text style={styles.optionText}>Frequently Asked Questions</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={() => { hideHelp(); navigate('contact-support' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>💬</Text>
              <Text style={styles.optionText}>Ask a Question</Text>
            </Pressable>
            <Pressable style={[styles.modalOption, styles.lastModalOption]} onPress={() => { hideHelp(); navigate('user-guide' as keyof RouteParams); }}>
              <Text style={styles.optionIcon}>📖</Text>
              <Text style={styles.optionText}>User Guide</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0cfff',
    paddingHorizontal: 20,
    paddingTop: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4309',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfbf9dff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 29, // Account for icon width to center text truly
    paddingRight: 29, // Equal padding on right for true center
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c4309',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 15,
  },
  row: {
    justifyContent: 'center',
    gap: 15,
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
    maxWidth: '40%',
  },
  serviceImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0c4309',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingRight: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff0cfff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderColor: 'rgba(12, 67, 9, 0.1)',
  },
  menuIconActive: {
    backgroundColor: '#fff0cfff',
    transform: [{ scale: 1.05 }],
  },
  menuIconText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#0c4309',
  },
  helpIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0c4309',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  helpIconActive: {
    backgroundColor: '#cfbf9dff',
  },
  helpIconText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  helpIconTextActive: {
    color: '#0c4309',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 120,
    paddingLeft: 20,
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(12, 67, 9, 0.08)',
  },
  menuModalContainer: {
    position: 'absolute',
    bottom: 130,
    left: 25,
    borderBottomLeftRadius: 8,
  },
  helpModalContainer: {
    position: 'absolute',
    bottom: 130,
    right: 65,
    borderBottomRightRadius: 8,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    minHeight: 56,
  },
  lastModalOption: {
    borderBottomWidth: 0,
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 16,
    width: 24,
    color: '#0c4309',
    textAlign: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#0c4309',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff0cfff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

