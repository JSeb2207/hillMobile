import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import RegistroScreen from "./src/screens/RegistroScreen";
import HomeScreen from "./src/screens/Inicio";
import NotificacionesScreen from "./src/screens/NotificacionesScreen";
import ProgresoScreen from "./src/screens/ProgresoScreen";
import LogrosScreen from "./src/screens/LogrosScreen";
import OpcionesScreen from "./src/screens/OpcionesScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import PrivacidadScreen from "./src/screens/PrivacidadScreen";

export type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  Tabs: undefined;
  Perfil: undefined;
  Privacidad: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          
          switch (route.name) {
            case "Inicio":
              iconName = "home";
              break;
            case "Notificaciones":
              iconName = "notifications";
              break;
            case "Progreso":
              iconName = "bar-chart";
              break;
            case "Logros":
              iconName = "trophy";
              break;
            case "Opciones":
              iconName = "settings";
              break;
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Privacidad" component={PrivacidadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}