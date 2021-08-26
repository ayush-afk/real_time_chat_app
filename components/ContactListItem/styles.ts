import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
        padding: 10,
        backgroundColor:'white',
    },
    leftcontainer:{
        flexDirection:'row',
    },

    username: {
        fontWeight: 'bold',
        fontSize:19,
    },
    midcontainer:{
        justifyContent: 'space-around',
    },
    avatar : {
        width : 60,
        height: 60,
        marginRight: 10,
        borderRadius: 50,
    },
    
    
});
export default styles;