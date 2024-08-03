import { Dimensions, PixelRatio } from "react-native"


export const screenWidth = Dimensions.get('screen').width

export const screenHeight = Dimensions.get('screen').height

export const windowWidth = Dimensions.get('window').width

export const windowHeight = Dimensions.get('window').height

export const MOBILE = 450
export const TABLET = 768

export const pixelRatio = PixelRatio.get();