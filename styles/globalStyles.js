import { Dimensions } from "react-native";

export const colors = {
  yellow: '#fcc563',
  black: '#333333',
  white: '#ffffff',
  whiteAlpha: 'rgba(255, 255, 255, 0.4)',
  primary: '#32315b',
  primaryDark: '#313059',
  section: '#35345e',
  label: '#6d6ca3',
  highlight: '#414073',
  lolYellow: '#a0946e',
  lolGreen: '#495a5a',
};

export const basicDemensions = {
  height: 740,
  width: 360
}

export const height = (
  Dimensions.get('screen').height * (1 / basicDemensions.height).toFixed(2)
)

export const width = (
  Dimensions.get('screen').width * (1 / basicDemensions.width).toFixed(2)
)