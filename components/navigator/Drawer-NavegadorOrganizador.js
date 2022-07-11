import { StyleSheet, Button, View, FlatList, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StylesDrawer } from "../styles/Styles";
import MenuDrawer from "../../components/MenuDrawer";
import MenuButton from "../../components/MenuButton";
import HomeOrganizador from "../../screens/HomeOrganizador";
// import CrearRecordatorio from '../../screens/CrearRecordatorio';
import CrearActividad from "../../screens/CrearActividad";
import ProyectoStack from "./Proyecto-Stack";
import RecordatorioStack from "./Recordatorio-Stack";

const Drawer = createDrawerNavigator();

const Menu = ({ navigation }) => {
  return (
    <DrawerContentScrollView contentContainerStyle={StylesDrawer.scroll}>
      <View style={StylesDrawer.view}>
        <View style={StylesDrawer.imageView}>
          <MenuDrawer
          // title={"FreeLanceHelper"}
          />
        </View>
        <View style={StylesDrawer.menu}>
          <MenuButton
            text="Recordatorios"
            OnPress={() => navigation.navigate("RecordatorioStack")}
            image={require("../../assets/icons/Icon-recordatorio-color.png")}
          />

          <MenuButton
            text="Proyectos"
            OnPress={() => navigation.navigate("ProyectoStack")}
            image={require("../../assets/icons/Icon-proyecto-color.png")}
          />
          <MenuButton
            text="CrearActividad"
            OnPress={() => navigation.navigate("CrearActividad")}
            image={require("../../assets/icons/Actividad.png")}
          />
        </View>
        <View style={StylesDrawer.exit}>
          <MenuButton
            text="Salir"
            OnPress={() => navigation.navigate("Login")}
            image={require("../../assets/icons/Icon-Salir.png")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const NavegadorOrganizador = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        headerShown: true,
        swipeEnabled: true,
        headerStyle: {
          backgroundColor: "white",
          height: 80,
        },
        headerTintColor: "#B3B3B3",
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "bold",
        },
        drawerPosition: "left",
        drawerType: "front",
        overlayColor: "#AAAAAA80",
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeOrganizador" component={HomeOrganizador} />
      <Drawer.Screen name="RecordatorioStack" component={RecordatorioStack} />
      <Drawer.Screen name="ProyectoStack" component={ProyectoStack} />
      <Drawer.Screen name="CrearActividad" component={CrearActividad} />
    </Drawer.Navigator>
  );
};

export default NavegadorOrganizador;
