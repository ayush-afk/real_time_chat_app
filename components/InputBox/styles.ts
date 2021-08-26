import {StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container :{
        flexDirection: 'row',
    },
    maincontainer:{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 50,
        marginRight: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textinput:{
        flex:1,
        marginHorizontal:10,
    },
    icons:{
        marginHorizontal:15,
    },
    buttoncontainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginRight: 5,
    }
});

export default styles;