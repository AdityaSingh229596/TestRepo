import React, { memo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter: React.FC = () => {
    console.log('Counter component rendered');

    const [count, setCount] = React.useState<number>(0);
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <View style={styles.container}>
            <Button title="Increase(+)" onPress={()=>increment()} />
            <Text style={styles.counterText}>Counter: {count}</Text>
            <Button title="Decrease(-)" onPress={()=>decrement()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height:"100%",
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    counterText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default memo(Counter);