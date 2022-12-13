/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import newPostActions from '../redux/actions/newPostActions';

import {useDispatch,} from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

const Camera = () => {
  const [image, setImage] = useState()

  const dispatch = useDispatch();

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setImage({data: data.uri});
  };

  const clearPicture = () => {
      setImage(null);
  }

  if (image) {
    //console.log(image.data);
    return (
        <View style={styles.container}>
            <Image source={{uri: image.data}} style={styles.image}/>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <Text onPress={() => {Actions.newpost(), dispatch(newPostActions.updateImage(image))}} style={styles.capture}>Use</Text>
                <Text onPress={() => clearPicture()} style={[styles.capture, {backgroundColor: 'red'}]}>Take Another</Text>
            </View>
        </View>
    );
  }
  return (
    <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'flex-end',
      },
});

export default Camera;
