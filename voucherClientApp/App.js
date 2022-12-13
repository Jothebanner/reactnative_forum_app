/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import {Actions, Router, Scene, Stack} from 'react-native-router-flux';

import HomePage from './components/HomePage';
import NewPost from './components/NewPost';
import Camera from './components/Camera';
import ImageModal from './components/ImageModal';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
    <Router sceneStyle={{backgroundColor: 'black'}} titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor: 'black', color: 'white'}}>
      <Scene key="root">
        <Scene
          key="homepage"
          component={HomePage}
          title={'Home Page'}
          hideNavBar={true}
          initial
        />
        <Scene backButtonTintColor={'white'} key="camera" component={Camera} back={true} />
        <Scene backButtonTintColor={'white'} key="newpost" component={NewPost} title="NewPost" onBack={()=>{Actions.homepage()}} back={true} />
        <Scene key='viewImage' component={ImageModal} hideNavBar={true} />
      </Scene>
    </Router>
    </Provider>
  );
};

export default App;
