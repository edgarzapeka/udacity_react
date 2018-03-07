import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { grey } from '../utils/colors'

export default function DeckItem(props){
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{props.deck.title}</Text>
            <Text style={styles.subtitle}>{props.deck.questions.length} cards</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 150,
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        color: grey
    }
})