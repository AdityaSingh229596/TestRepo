import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert, Button, Text, Dimensions, ToastAndroid } from 'react-native';
// import * as Notifications from 'expo-notifications';
import Counter from '../../components/Counter';
import ListItem from '../../components/ListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackNavigation } from '../../../App'
const { width, height } = Dimensions.get('window');

type PostData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type HomeScreenProps = NativeStackScreenProps<RootStackNavigation, 'Home'>

export type PostDataTypes={
    userId:number,
    id:number,
    title:string,
    body:string
}
const HEADER_HEIGHT = 60;
const PAGINATION_HEIGHT = 60;
const LIMIT = 10;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log('HomeScreen rendered');

  const displayNotification = async (message: string) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT,ToastAndroid.CENTER);
  };
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await displayNotification('FETCHING DATA');
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
      );
      const json = await response.json();
      const totalCount = response.headers.get('x-total-count') || '100';
      setTotalPages(Math.ceil(parseInt(totalCount) / 10));
      setData(json);
      await displayNotification('FETCHING DATA COMPLETE');
    } catch (error) {
      // Handle error
      // console.log('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const computeHeavyDetails = useMemo(() => {
    return (item: PostData) => {
      console.time('heavyComputation');
      let result = '';
      for (let i = 0; i < 10000; i++) {
        result = `${item.title} processed ${i}`;
      }
      console.timeEnd('heavyComputation');
      return result;
    };
  }, []);

  const nextPage = () => setPage(Math.min(page + 1, totalPages));
  const prevPage = () => setPage(Math.max(page - 1, 1));

  const renderItem = ({ item }: { item: PostData }) => (
    <ListItem 
      item={item} 
      computedDetails={computeHeavyDetails(item)} 
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.counterView}>
         <Counter />
      </View>
      <View style={styles.body}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      )}
      </View>
    <View style={styles.pagination}>
        <Button title="Previous" onPress={prevPage} disabled={page === 1} />
        <Text>Page {page} of {totalPages}</Text>
        <Button title="Next" onPress={nextPage} disabled={page === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  counterView:{
    width: '100%',
    height: HEADER_HEIGHT,
    //backgroundColor:"red"
  },
  body:{
    height : height - HEADER_HEIGHT - PAGINATION_HEIGHT,
  },
  pagination: {
    flexDirection: 'row',
    height:PAGINATION_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  list: {
    flex: 1,
  },
});

export default HomeScreen;