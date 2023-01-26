import { MaterialIcons } from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors} from "../../styles/globalStyles";

const Icon = ({ data, focus, callback }) => {
  const { iconName, label, id } = data;
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={(e) => {
        e.preventDefault();
        e.stopPropagation();
        callback && callback(id);
      }}>
      <MaterialIcons
        name={`${iconName ? iconName : 'disabled-by-default'}`}
        size={24}
        color={focus ? colors.label : colors.section} />
      {label && <Text style={{...styles.label, color: focus ? colors.label : colors.section}}>{label}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 12,
    marginTop: 4,
  }
});

export default Icon;