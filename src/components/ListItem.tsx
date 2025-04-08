import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PostData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type ListItemProps = {
  item: PostData;
  computedDetails: string;
  navigation: any
};

const ListItem: React.FC<ListItemProps> = React.memo(({ item, computedDetails ,navigation }) => {
  console.log('ListItem rendered id:', item.id);
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("PostDetail",{postId:item.id})}>
      <Text style={styles.itemId}>ID: {item.id}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDetails}>{computedDetails}</Text>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    width:"94%",
    alignSelf:"center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemTitle: {
    color: '#333',
    marginBottom: 5,
  },
  itemDetails: {
    color: '#666',
    fontSize: 12,
  },
});

export default ListItem;