import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { black, purple } from '../utils/colors'

export default class AddDeck extends Component{
    state = {
        deckTitle: ''
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>Create New Deck</Text>
                <TextInput
                    style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({deckTitle: text})}
                    value={this.state.text}
                />
                <Button
                    onPress={() => console.log('Submitted!')}
                    title='Submit'
                    color={purple}
                    accessibilityLabel="Submit button"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deckTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24
    }
  });