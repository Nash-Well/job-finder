import { StyleSheet } from "react-native";
import { COLORS, SIZES } from '../../constants/index.js'


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLORS.lightWhite 
    },

    scrollContainer: {
        flex: 1,
        padding: SIZES.medium
    },

    infoContainer: {
        padding: SIZES.medium,
        paddingBottom: 100,
    }
})

export default styles;