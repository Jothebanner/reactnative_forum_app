import React, {useState, useEffect} from 'react';

import {SafeAreaView, StyleSheet, ScrollView, View, Text, FlatList,} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import MasonryList from '@appandflow/masonry-list';

import {Actions} from 'react-native-router-flux';

import ListItem from './ListItem';
import { useDispatch, useSelector } from 'react-redux';
import newPostActions from '../redux/actions/newPostActions';
import deleteToggleReducer from '../redux/reducers/deleteToggleReducer';

const HomePage = () => {
const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [buttonToggled, setButtonToggled] = useState(false);

    const deleteToggled = useSelector((state) => state.deleteToggleReducer.deleteToogle);

    const dispatch = useDispatch();

    let buttonColor = 'white';
    if (buttonToggled) {
        buttonColor = 'red';
    }

  useEffect(() => {
    fetch('https://jacobghawks.com:3025/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>
        {!data ? (null) : (
        <FlatList
            style={styles.list}
            data={data}
            keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
                <ListItem item={item}/>
          )}
        />
        )}
        {/* {!data ? (null) : (
        <MasonryList>
            data={data}
           keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
                <ListItem item={item}/>)}
            getHeightForItem={({ item }) => item.height +2}
            numColumns={2}
        </MasonryList>
        )} */}
        <TouchableOpacity style={{flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
            <Text onPress={() => Actions.newpost()} style={styles.newPost}>New Post</Text>
            <Text onPress={() => Actions.homepage()} style={styles.newPost}>Refresh</Text>
            <Text onPress={() => {dispatch(newPostActions.toggleDelete()), setButtonToggled(!buttonToggled)}} style={[styles.deletePost, {
    backgroundColor: buttonColor}]}>Delete Posts</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    flex: 0,
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
  },
  text: {
      color: 'white',
  },
  list: {
      flex: 1,
  },
  newPost: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 20,
  },
  deletePost: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 20,
  },
});

export default HomePage;