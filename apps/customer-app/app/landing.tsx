import { View, Text, TextInput, Pressable, Image, FlatList, StyleSheet, ImageSourcePropType, Platform, InteractionManager } from 'react-native';
import { useRouter } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { useRef, useState, useEffect } from 'react';
// @ts-ignore - Only for native platforms
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  'contact-support': undefined;
  'user-guide': undefined;
};

export default function Landing() {
  const router = useRouter();
  const lottieRef = useRef<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [canRenderLottie, setCanRenderLottie] = useState(Platform.OS !== 'web');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setCanRenderLottie(false);
      const task = InteractionManager.runAfterInteractions(() => setCanRenderLottie(true));
      // @ts-ignore
      return () => task?.cancel?.();
    }
  }, []);

  const navigate = (route: keyof RouteParams) => router.push(route as any);

  const handleMenuPress = () => {
    if (Platform.OS === 'web') {
      setIsMenuOpen((v) => !v);
      return;
    }
    if (lottieRef.current) {
      if (isMenuOpen) lottieRef.current.play(24, 0);
      else lottieRef.current.play(0, 24);
    }
    setIsMenuOpen((v) => !v);
  };

  const voiceIconSvg = `
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#0c4309"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="#0c4309" stroke-width="2"/>
      <line x1="12" y1="19" x2="12" y2="23" stroke="#0c4309" stroke-width="2"/>
      <line x1="8" y1="23" x2="16" y2="23" stroke="#0c4309" stroke-width="2"/>
    </svg>
  `;

  const cameraIconSvg = `
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="13" r="4" fill="none" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `;

  const services: { id: string; title: string; image: ImageSourcePropType; route: keyof RouteParams }[] = [
    { id: '1', title: 'Moving', image: require('../assets/images/moving.png'), route: 'moving' },
    { id: '2', title: 'Cleaning', image: require('../assets/images/cleaning.png'), route: 'cleaning' },
    { id: '3', title: 'Wall Mounting', image: require('../assets/images/wall-mounting.png'), route: 'wall-mounting' },
    { id: '4', title: 'Furniture Assembly', image: require('../assets/images/furniture-assembly.png'), route: 'furniture-assembly' },
    { id: '5', title: 'Home Improvement', image: require('../assets/images/home-improvement.png'), route: 'home-improvement' },
    { id: '6', title: 'Running Errands', image: require('../assets/images/running-errands.png'), route: 'running-errands' },
  ];

  const renderService = ({ item }: { item: { id: string; title: string; image: ImageSourcePropType; route: keyof RouteParams } }) => (
    <Pressable onPress={() => navigate(item.route)} style={styles.serviceItem}>
      <View>
        <Image source={item.image} style={styles.serviceImage} />
      </View>
      <Text style={styles.serviceTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    // root without padding so overlay anchors to the real screen edges
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.contentArea}>
          <Text style={styles.title}>What can we help with?</Text>
          <Text style={styles.popularTitle}>Popular Services</Text>
          <View style={styles.servicesWrapper}>
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>

          <Text style={styles.makeYourCustomServiceText}>Make Your Custom Service</Text>
          <View style={styles.jobDescriptionContainer}>
            <TextInput
              style={styles.jobDescriptionText}
              placeholder="Describe exactly what you need...              (e. g. I need a deep cleaning of my 2 bedroom apartment, including kitchen and bathroom."
              multiline
              numberOfLines={4}
              placeholderTextColor="#666666"
            />
            <View style={styles.inputButtonsContainer}>
              <View style={styles.voiceContainer}>
                <Pressable style={styles.voiceButton}>
                  <SvgXml xml={voiceIconSvg} width="20" height="20" />
                </Pressable>
                <Text style={styles.voiceModeText}>Voice Mode</Text>
              </View>
              <Pressable style={styles.cameraButton}>
                <SvgXml xml={cameraIconSvg} width="20" height="20" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* Screen-wide overlay, outside the padded container (true screen edges) */}
      <View pointerEvents="box-none" style={styles.overlay}>
        {/* Large animation view (visual only, no touches) */}
        <View style={[styles.menuButton, { pointerEvents: 'none', backgroundColor: 'transparent' }]}>
          {Platform.OS === 'web' || !canRenderLottie ? (
            <Text style={[styles.menuIconTextLarge, { color: '#0c4309' }]}>☰</Text>  // Make visible if needed
          ) : (
            <LottieView
              ref={lottieRef}
              source={require('../assets/animations/menuButtonAnimation.json')}
              autoPlay={false}
              loop={false}
              style={styles.lottieAnimationLarge}
            />
          )}
        </View>

        {/* Small pressable area for toggling (matches closed button size) */}
        <Pressable 
          onPress={handleMenuPress} 
          style={styles.menuTogglePressable}
        />
              
        {/* Invisible overlay with visible menu items */}
        {isMenuOpen && (
          <>
    {/* Full-screen dismiss overlay (taps here close the menu) */}
          <Pressable
            style={styles.dismissOverlay}
            onPress={() => {
              if (Platform.OS !== 'web' && lottieRef.current) {
                lottieRef.current.play(24, 0); // Reverse the open animation
              }
              setIsMenuOpen(false);
            }}
          />
          <View style={styles.menuOverlay}>
            <View style={styles.menuContainer}>
              <Pressable 
                style={styles.menuItem} 
                onPress={() => {
                  setIsMenuOpen(false);
                  navigate('booked-services');
                }}
              >
                <View style={styles.menuItemRow}>
                  <Text style={styles.menuItemText}>Booked Services</Text>
                </View>
              </Pressable>
              
              <Pressable 
                style={styles.menuItem} 
                onPress={() => {
                  setIsMenuOpen(false);
                  navigate('past-services');
                }}
              >
                <View style={styles.menuItemRow}>
                  <Text style={styles.menuItemText}>Past Services</Text>
                </View>
              </Pressable>
              
              <Pressable 
                style={styles.menuItem} 
                onPress={() => {
                  setIsMenuOpen(false);
                  navigate('account');
                }}
              >
                <View style={styles.menuItemRow}>
                  <Text style={styles.menuItemText}>Account</Text>
                </View>
              </Pressable>
            </View>
          </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // New root: no padding so overlay sits at true screen edges
  root: {
    flex: 1,
    backgroundColor: '#fff0cfff',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4309',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c4309',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  servicesWrapper: {
    height: 300,
  },
  listContent: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-evenly',
    gap: 10,
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
    maxWidth: '30%',
  },
  serviceImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0c4309',
    marginTop: 10,
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  orText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0c4309',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  orLine: {
    width: 140,
    height: 1,
    backgroundColor: '#cfbf9dff',
  },
  makeYourCustomServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c4309',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  jobDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#cfbf9dff',
    borderRadius: 10,
    paddingTop: 10,
    marginBottom: 20,
    height: 150,
  },
  jobDescriptionText: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingLeft: 15,
    paddingRight: 20,
  },
  inputButtonsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 140,
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  voiceButton: {
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff0cfff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  voiceModeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0c4309',
    textAlign: 'center',
  },
  cameraButton: {
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0c4309',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  inputButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0c4309',
    marginLeft: 6,
  },
  // Menu button positioned consistently in bottom left corner across all devices
  menuButton: {
    position: 'absolute',
    left: -380,      // distance from left edge
    bottom: -350,    // distance from bottom edge (accounts for typical safe areas)
    width: 900,    // consistent size across devices
    height: 900,
  },
  menuTogglePressable: {
  position: 'absolute',
  left: 35,  // Adjust as needed for your button's visible position
  bottom: 35,   // Use safe area for bottom padding
  width: 70,  // Size to match closed button (tune based on your animation/icon)
  height: 70,
  borderRadius: 70, // Make it circular
  backgroundColor: 'transp',  // Invisible hit area
  
  // Optional: add hitSlop if you want to slightly enlarge the touch target without changing visual size
  // hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
},
  lottieAnimationLarge: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  menuIconTextLarge: {
    fontSize: 120,
    color: 'transparent',
    fontWeight: 'bold',
  },
  dismissOverlay: {
  ...StyleSheet.absoluteFillObject, // Covers entire screen
  backgroundColor: 'transparent', // Or 'rgba(0, 0, 0, 0.4)' for dimming
  zIndex: 998, // Below menu
  },
  // Invisible overlay that positions menu items over the animation
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Completely invisible
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    zIndex: 1000,
    pointerEvents: 'box-none', // Allow touches to pass through to background
  },
  menuContainer: {
    backgroundColor: 'transparent', // Container is also invisible
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 38, // Position relative to menu button
    marginBottom: 98, // Shifted down - reduced from 160 to 80
  },
  menuItem: {
    backgroundColor: 'transparent', // Light beige background like your screenshot
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 2,
    minWidth: 200,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: 'transparent',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});

