import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import { ChatRoom} from '../../types';
import styles from './styles';
import moment from '../../node_modules/moment';
import  {useNavigation} from '@react-navigation/native';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';

export type ChatListitemProps = {
    chatRoom: ChatRoom;
}
const ChatListitem = (props: ChatListitemProps) =>{
const { chatRoom } = props;    
const navigation = useNavigation();
const user = chatRoom.chatRoomUsers.items[1].user;

const [otherUser, setOtherUser] = useState([]);
{/*

useEffect(() => {
    const getOtherUser = async() => {
        const userInfo = await Auth.currentAuthenticatedUser();
        if(chatRoom.ChatRoomUsers.items[1].user.id === userInfo.attributes.sub)
        {
            setOtherUser(chatRoom.chatRoomUsers.items[0].user);
        }
        else{
            setOtherUser(chatRoom.chatRoomUsers.items[1].user);
        }
    }
    getOtherUser();
}, [])
*/}
const onClick = () => {
   navigation.navigate('ChatRoom', {
        id: chatRoom.id,
        name: user.name,
    });
    if(!otherUser)
    {
        return null;
    }
}
return (
    <TouchableWithoutFeedback onPress={onClick}>
    <View style={styles.container}>
        <View style={styles.leftcontainer}>
        <Image source = {{ uri: user.imageUri }} style={styles.avatar} />
        <View style={styles.midcontainer}>
        <Text style = {styles.username}>{user.name}</Text>
        <Text style = {styles.lastmessage}>{chatRoom.lastMessage ? chatRoom.lastMessage.content: ""}</Text>
        </View>
        </View>


        <Text style={styles.time}> 
        {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format(format = "DD/MM/YYYY")
        }
        </Text>     
    </View>
    </TouchableWithoutFeedback>
)
};
export default ChatListitem;