import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";

export default function HillLogo() {
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 900,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.center}>
      <Animated.Image
        source={require("../../assets/hill.png")}
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  logo: { width: 160, height: 160 },
});
