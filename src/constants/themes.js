import { Platform, useColorScheme } from "react-native";
import { MOBILE, screenWidth } from "./screenSizes";


const COLORS = {
  primary: "#EF8F21",
  primary_light1: "#EF8F2117",
  primary_light2: "#EF8F2132",
  primary_light3: "#533A8217",
  primary_light4: "#533A8212",

  secondary: "#27A097",

  gray: "#cfd0d1",
  gray2: "#C1C0C8",

  lightGray: '#f2f2f2',
  white: "#fff",
  white_light: '#cfe1fd',
  yellow: '#ffd104',
  lightWhite: "#FAFAFC",
  black: '#0d0b36',
  green: '#228B22',
  red: '#FF0000',
};

const SUBCOLORS = {
  pre1: '#8A2BE2',
  pre2: '#f6c779',
  pre3: '#AAD922',
  pre4: '#B4D9EF',
  pre5: '#bfaae3',
  pre6: '#4169E1',
  pre7: '#99EDC3',
  pre8: '#BF5700',
}


const SIZES = {
  xSmall: screenWidth > MOBILE ? Platform.OS === 'ios' ? 16 : 14 : 10,
  small: screenWidth > MOBILE ? Platform.OS === 'ios' ? 18 : 16 : 12,
  normal: screenWidth > MOBILE ? Platform.OS === 'ios' ? 20 : 18 : 14,
  medium: screenWidth > MOBILE ? Platform.OS === 'ios' ? 22 : 20 : 16,
  large: screenWidth > MOBILE ? Platform.OS === 'ios' ? 26 : 24 : 20,
  xLarge: screenWidth > MOBILE ? Platform.OS === 'ios' ? 30 : 28 : 24,
  xxLarge: screenWidth > MOBILE ? Platform.OS === 'ios' ? 38 : 36 : 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};


export { COLORS,  SIZES, SHADOWS, SUBCOLORS, };