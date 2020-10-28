import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomePage(){
    return(
        <View style={styles.container}>
            Expense Home
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent:'center',
    }
});