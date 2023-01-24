import { MaterialIcons } from '@expo/vector-icons';
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../styles/globalStyles";

const Icon = ({ iconName, label, focus }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MaterialIcons
        name={`${iconName ? iconName : 'disabled-by-default'}`}
        size={24}
        color={focus ? colors.label : colors.section} />
      <Text style={{...styles.label, color: focus ? colors.label : colors.section}}>{label}</Text>
    </View>
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