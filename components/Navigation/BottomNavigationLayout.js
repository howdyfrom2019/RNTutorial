import {StyleSheet, Text, View} from "react-native";
import {DEVICE_WIDTH} from "../../styles/globalStyles";
import Icon from "../Icon/Icon";
import {useCallback} from "react";

const BottomNavigationLayout = ({ page, callback }) => {

  const onChangeCurrPageHandler = useCallback((id) => {
    if (!callback) return;
    return callback && callback(id);
  }, [callback]);

  return (
    <View style={styles.container}>
      <Icon
        data={{ id: 0, iconName: 'home-filled', label: '홈'}}
        focus={page === 0}
        callback={onChangeCurrPageHandler}
      />
      <Icon
        data={{ id: 1, iconName: 'wb-sunny', label: '날씨'}}
        focus={page === 1}
        callback={onChangeCurrPageHandler}
      />
      <Icon
        data={{ id: 2, iconName: 'card-travel', label: '여행일정'}}
        focus={page === 2}
        callback={onChangeCurrPageHandler}
      />
      <Icon
        data={{ id: 3, iconName: 'list-alt', label: 'TO-DO'}}
        focus={page ===3}
        callback={onChangeCurrPageHandler} />
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