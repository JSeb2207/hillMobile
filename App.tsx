import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Inicio";
import NotificacionesScreen from "./src/screens/NotificacionesScreen";
import ProgresoScreen from "./src/screens/ProgresoScreen";
import LogrosScreen from "./src/screens/LogrosScreen";
import OpcionesScreen from "./src/screens/OpcionesScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Notificaciones") {
              iconName = "notifications";
            } else if (route.name === "Progreso") {
              iconName = "bar-chart";
            } else if (route.name === "Logros") {
              iconName = "trophy";
            } else if (route.name === "Opciones") {
              iconName = "settings";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Notificaciones" component={NotificacionesScreen} />
        <Tab.Screen name="Progreso" component={ProgresoScreen} />
        <Tab.Screen name="Logros" component={LogrosScreen} />
        <Tab.Screen name="Opciones" component={OpcionesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
