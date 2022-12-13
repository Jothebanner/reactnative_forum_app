import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import deleteToggleReducer from '../redux/reducers/deleteToggleReducer';

const ListItem = ({item}) => {
    const [imageFile, setImageFile] = useState();

    const deleteToggle = useSelector((state) => state.deleteToggleReducer.deleteToggle);

    const dispatch = useDispatch();

    //console.log(item._id);

    let PostImage = null;

    if (!item.media) {
        PostImage = null;
    } else {
        PostImage = <TouchableOpacity onPress={() => Actions.viewImage({imageUri: imageFile})}><FastImage source={{uri: imageFile, priority: FastImage.priority.normal,}} resizeMode={FastImage.resizeMode.contain} style={styles.image} /></TouchableOpacity>;
    }

    useEffect(() => {
        if (item.media != null) {
            setImageFile(
                'https://jacobghawks.com:3026/picture?imageName=' + item.media,
            );
        }
    }, []);

    const deletePost = () => fetch('https://jacobghawks.com:3025/posts/' + item._id, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });

    let deleteButton = null;

    if (deleteToggle) {
        deleteButton = (
            <Button onPress={() => {deletePost(), Actions.homepage()}} title={'Delete'} />
        );
    }

    return (
        <View style={styles.postContainer}>
            <View style={{flex: 1, flexDirection: 'row',}}>
                <View>
                <Text style={styles.text}>{item.postText}</Text>
                {deleteButton}
                </View>
                <View style={{flex: 1, alignItems: 'flex-end',}}>
                {PostImage}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        backgroundColor: 'grey',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        flexWrap: 'wrap',
    },
    title: {
        flex: 1,
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
    },
    text: {
        color: 'white',
        padding: 5,
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 120,
    },
    image: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        width: 80,
        height: 100,
    },
});

export default ListItem;
