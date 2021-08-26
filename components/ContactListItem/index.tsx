import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import { User} from '../../types';
import styles from './styles';
import moment from '../../node_modules/moment';
import  {useNavigation} from '@react-navigation/native';
import {
    API,
    graphqlOperation,
    Auth
} from 'aws-amplify';
import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations';


export type ContactListItemProps = {
    user: User;
}
const ContactListItem = (props: ContactListItemProps) =>{
const { user } = props;    
const navigation = useNavigation();
const onClick = async() => {
  try{
    // 1. create a new chatroom
    const newChatRoomData = await API.graphql(
        graphqlOperation(
            createChatRoom,{
                input:{}
            }
        )
    )
    if(!newChatRoomData.data)
    {
        console.log("failed to create a chat room");
        return;
    }
    const newChatRoom = newChatRoomData.data.createChatRoom;

    //console.log(newChatRoom);
    // 2. add user to chat room
    const newUserChatRoom = await API.graphql(
        graphqlOperation(
            createChatRoomUser, {
                input: {
                    userID: user.id,
                    chatRoomID: newChatRoom.id
                }
            }
        )
    )

    // 3. add auth user to chat room
    const userInfo = await Auth.currentAuthenticatedUser();
    await API.graphql(
    graphqlOperation(
        createChatRoomUser, {
            input: {
                userID: userInfo.attributes.sub,
                chatRoomID: newChatRoom.id
            }
        }
    )
    )

    navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: "Hardcoded name",
    })


  }catch (e)
  {
      console.log(e);
  }
}
return (
    <TouchableWithoutFeedback onPress={onClick}>
    <View style={styles.container}>
        <View style={styles.leftcontainer}>
        <Image source = {{ uri: user.imageUri }} style={styles.avatar} />
        <View style={styles.midcontainer}>
        <Text style = {styles.username}>{user.name}</Text>
        </View>
        </View>  
    </View>
    </TouchableWithoutFeedback>
)
};
export default ContactListItem;