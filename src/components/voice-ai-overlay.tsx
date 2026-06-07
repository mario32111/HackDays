import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Animated,
  Platform,
  useColorScheme,
} from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface VoiceAiOverlayProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  prompt?: string;
}

export function VoiceAiOverlay({ visible, onClose, title, prompt }: VoiceAiOverlayProps) {
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  // Use useState with lazy initializers to avoid accessing refs in render
  const [pulseScale] = useState(() => new Animated.Value(1));
  const [pulseOpacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;

    if (visible) {
      // Loop pulse animation
      animation = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseScale, {
              toValue: 1.25,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseScale, {
              toValue: 1.0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(pulseOpacity, {
              toValue: 0.1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.4,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
      animation.start();
    } else {
      pulseScale.setValue(1);
      pulseOpacity.setValue(0.4);
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [visible, pulseScale, pulseOpacity]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      
      {/* Backdrop */}
      <View style={styles.backdrop}>
        <Pressable style={styles.dismissPressable} onPress={onClose} />
        
        {/* Bottom Sheet Card */}
        <View style={[
          styles.bottomSheet, 
          { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
        ]}>
          
          {/* Close button */}
          <View style={styles.closeRow}>
            <Pressable 
              onPress={onClose} 
              style={({ pressed }) => [
                styles.closeButton,
                { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                pressed && styles.buttonPressed
              ]}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={16}
                tintColor={theme.text}
              />
            </Pressable>
          </View>

          {/* Micro Button Section */}
          <View style={styles.micContainer}>
            {/* Animated Pulse circle behind mic */}
            <Animated.View style={[
              styles.pulseCircle,
              {
                backgroundColor: isDark ? '#FFFFFF' : '#000000',
                transform: [{ scale: pulseScale }],
                opacity: pulseOpacity,
              }
            ]} />
            
            {/* Main Microphone Button */}
            <Pressable style={({ pressed }) => [
              styles.micButton,
              { backgroundColor: isDark ? '#FFFFFF' : '#000000' },
              pressed && styles.buttonPressed
            ]}>
              <SymbolView
                name={{ ios: 'mic.fill', android: 'mic', web: 'mic' }}
                size={32}
                tintColor={isDark ? '#000000' : '#FFFFFF'}
              />
            </Pressable>
          </View>

          {/* Content Description */}
          <View style={styles.textContainer}>
            <ThemedText style={styles.micTitle}>
              {title || 'Escuchando tus antojos...'}
            </ThemedText>
            <ThemedText style={styles.micPrompt} themeColor="textSecondary">
              {prompt || '"Quiero unos tacos al pastor cerca del centro..."'}
            </ThemedText>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dismissPressable: {
    ...StyleSheet.absoluteFill,
  },
  bottomSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six + Spacing.four,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08)',
        maxWidth: 500,
        alignSelf: 'center',
        width: '100%',
      }
    })
  },
  closeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.two,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: Spacing.four,
  },
  pulseCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    })
  },
  textContainer: {
    alignItems: 'center',
    marginTop: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  micTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  micPrompt: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
