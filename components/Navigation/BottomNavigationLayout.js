import {StyleSheet, Text, View} from "react-native";
import {DEVICE_WIDTH} from "../../styles/globalStyles";

const BottomNavigationLayout = () => {
  return (
    <View style={styles.container}>
      <Text>홈</Text>
      <Text>홈</Text>
      <Text>홈</Text>
      <Text>홈</Text>
      <Text>홈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: 64,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default BottomNavigationLayout;