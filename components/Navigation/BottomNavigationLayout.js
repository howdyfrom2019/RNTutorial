import {StyleSheet, Text, View} from "react-native";
import {DEVICE_WIDTH} from "../../styles/globalStyles";
import Icon from "../Icon/Icon";

const BottomNavigationLayout = ({ page, callback }) => {
  return (
    <View style={styles.container}>
      <Icon iconName={'home-filled'} label={'홈'} focus={page === 0} />
      <Icon iconName={'wb-sunny'} label={'날씨'} focus={page === 1} />
      <Icon iconName={'card-travel'} label={'여행일정'} focuse={page === 2} />
      <Icon iconName={'list-alt'} label={'TO-DO'} focus={page ===3} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  }
})

export default BottomNavigationLayout;