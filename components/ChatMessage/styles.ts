import {StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor: 'grey',
    },
    messageBox:{
        backgroundColor: 'white',
        marginRight: 60,
        borderRadius: 10,
        padding:10,
    },
    name:{
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message:{
    },
    time:{
        alignSelf:"flex-end",
        color: Colors.light.tint,
        fontWeight: '200'
    },
});

export default styles;