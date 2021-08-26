import React, { useEffect, useState } from 'react';
import style from './styles';
import {View, TextInput} from 'react-native';
import styles from './styles';
import {
    API,
    Auth,
    graphqlOperation,
} from 'aws-amplify';
import {createMessage,
    updateChatRoom} from '../../src/graphql/mutations';
import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const InputBox = (props) => {

    const { chatRoomID } = props;
    const [message,setMessage] = useState('');
    const[myUserId, setMyUserId] = useState([]);
    useEffect(()=>
    {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        }
        fetchUser();
    },
    []
    )
    

    const onMicrophonePress = () => {
        console.warn('microphone used');
    }
    {/*
    const updateChatRoomLastMessage = async(messageId: string)=>{
        try{
        await API.graphql(
                graphqlOperation(
                    updateChatRoom,{
                        input: {
                            id: chatRoomID,
                            lastMessageID : messageId,
                        }
                    }

                )
            )

        }catch(e)
        {console.log(e);
        }
    }*/}

    const onSendPress = async() => {
        try{
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage,{
                    input:{
                        content: message,
                        userID: myUserId,
                        chatRoomID
                    }
                }
                )
            )
            //await updateChatRoomLastMessage(newMessageData.data.createMessage.id)
        }catch (e)
        {
            console.log(e);
        }
        setMessage('');
    }


    const onPress = () => {
        if(!message)
        {
            onMicrophonePress();
        }
        else{
            onSendPress();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.maincontainer}>
                <FontAwesome5 name="laugh" size={24} color="grey"/>
                <TextInput 
                placeholder="Type a message"
                style={styles.textinput}
                multiline
                value={message}
                onChangeText= {setMessage}
                />
                <Entypo name="attachment" size={22} color="grey" style={styles.icons}/>
               { !message && <Fontisto name="camera" size={22} color="grey" />}
            </View>
            <TouchableOpacity onPress={onPress}>
            <View style={styles.buttoncontainer}>
               {!message 
                ? <MaterialCommunityIcons name="microphone" size={24} color="white"/>
                : <MaterialIcons name="send" size={24} color="white"/>
               }
            </View>
            </TouchableOpacity>
        </View>
    );
}
export default InputBox;