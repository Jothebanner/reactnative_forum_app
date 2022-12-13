// if you ever have to touch this code again I am so sorry.

import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    Button,
    Image,
    ImageBackground,
    InteractionManager,
    StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';

import newPostActions from '../redux/actions/newPostActions';

const NewPost = () => {
    const [inputText, setInputText] = useState();
    const [isLoading, setLoading] = useState();
    const [buttonText, setButtonText] = useState('');

    const postText = useSelector((state) => state.postTextReducer.postText);
    const postImageName = useSelector(
        (state) => state.postImageNameReducer.postImageName,
    );
    const postImage = useSelector((state) => state.postImageReducer.postImage);
    //console.log(postImage.data);
    const dispatch = useDispatch();

    //console.log('text: ' + postText);

    let buttonThing = '';
    let imageBackground = null;
    if (postImage == '') {
        buttonThing = (
            <Button
                title={'Add Picture'}
                onPress={() => {
                    Actions.camera();
                }}
            />
        );
        imageBackground = null;
    } else {
        buttonThing = (
            <Button
                title={'Remove Picture'}
                onPress={() => {
                    dispatch(newPostActions.updateImage(''));
                }}
            />
        );
        imageBackground = (
            <ImageBackground
                source={{uri: postImage.data}}
                style={{width: 400, height: 400}}
            />
        );
    }

    useEffect(() => {
        if (postImage == null) {
            setButtonText('Add Picture');
        } else {
            setButtonText('Try again lol');
        }
    });

    // Example POST method implementation:
    async function postTextData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    let filename = postImage.data;
    if (filename != null) filename = filename.replace(/^.*[\\\/]/, '');

    //console.log("filename: " + filename);

    dispatch(newPostActions.updateImageName(filename));

    const data = new FormData();
    // I have no idea how this works. Somehow data.append acts the same as setting keys in postman. But RN is much dummer and you have to spell out the specifics
    data.append('picture', {
        uri: postImage.data,
        // let the phone set the image name, terrible idea but probably won't have any repeats for the first test
        name: postImage.data,
        // RN camera always spits out a jpeg image
        type: 'image/jpeg',
    });

    const config = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: data,
    };

    //console.log(postImage);

    return (
        <View>
            <TextInput
                value={postText}
                placeholderTextColor={'white'}
                onChangeText={(text) => {
                    dispatch(newPostActions.updateText(text));
                }}
                style={styles.input}
                multiline={true}
                placeholder="Describe your meal!"></TextInput>

            {buttonThing}
            {imageBackground}

            <Button
                title={'Submit Post'}
                onPress={() => {
                    if (postText || postImage != '') {
                    postTextData('https://jacobghawks.com:3025/posts', {
                        postText: postText,
                        media: postImageName,
                    }).then((data) => {
                        //console.log(data); // JSON data parsed by `data.json()` call
                    }),
                        fetch('https://jacobghawks.com:3026/picture', config)
                            .then((response) => response.json())
                            //.then((data) => console.log(data))
                            .catch((err) => {
                                console.log(err);
                            }),
                        dispatch(newPostActions.updateImage('')),
                        dispatch(newPostActions.updateText('')),
                        Actions.homepage();
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: 'white',
        height: 100,
        fontSize: 20,
    },
});

export default NewPost;
