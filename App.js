import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {useCallback, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {colors} from "./styles/globalStyles";
import Weather from "./apps/Weather";
import Icon from "./components/Icon/Icon";

const Tab = createBottomTabNavigator();

const Home = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>hi</Text>
    </View>
  )
}
export default function App() {
  const [page, setPage] = useState(0);

  const onChangePage = useCallback((id) => {
    setPage(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>테스트 하고 싶은 앱을 {"\n"}선택해주세요.</Text>
      <View style={{ flex: 9 }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName = '';
                let label = '';
                switch (route.name) {
                  case 'Home':
                    iconName = 'home-filled';
                    label = '홈';
                    break;
                  case 'Weather':
                    iconName = 'wb-sunny';
                    label = '날씨';
                    break;
                  case 'Travel':
                    iconName = 'card-travel';
                    label = '여행일정';
                    break;
                  case 'Todo':
                    iconName = 'list-alt';
                    label = 'TO-DO';
                    break;
                  default:
                    iconName = 'wb-sunny';
                    label = '에러';
                }
                return (
                  <Icon data={{ iconName }} focus={focused} />
                )
              },
              tabBarActiveTintColor: colors.label,
              tabBarInactiveBackTintColor: colors.section,
              headerShown: false,
            })
          }
          >
            <Tab.Screen name={"Home"} component={Home} initialParams={{ page: 0 }} />
            <Tab.Screen name={"Weather"} component={Weather} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
    marginLeft: 24,
    letterSpacing: -2,
  }
});