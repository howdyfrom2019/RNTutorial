import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import BottomNavigationLayout from "./components/Navigation/BottomNavigationLayout";
import {colors} from "./styles/globalStyles";

export default function App() {
  const [tutorial, setTutorial] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>테스트 하고 싶은 앱을 {"\n"}선택해주세요.</Text>
      <View style={{ flex: 9, backgroundColor: colors.label }} />
      <BottomNavigationLayout />
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