import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

const ImageModal = (imageSrc) => {
    return (
        <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => Actions.pop()}>
            <Image source={{uri: imageSrc.imageUri}} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        height: '100%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
});

export default ImageModal;
