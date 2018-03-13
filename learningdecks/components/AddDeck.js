import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { black, purple } from '../utils/colors'
import { addDeck, fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { submitDeck } from '../actions'

class AddDeck extends Component{
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Add Deck',
        };
      };

    state = {
        deckTitle: ''
    }

    submit = () => {
        if (this.state.deckTitle === ""){
            Alert.alert(
                'Validation Error!',
                'You have to type Deck Title',
                [
                    {text: 'Ok', onPress: () => console.log('Validation Error. Empty Deck Title') }
                ],
                { cancelable: false }
            )
            return
        }

        this.props.dispatch(submitDeck({ [this.state.deckTitle]: {
            title: this.state.deckTitle,
            questions: []
        } }))

        addDeck(this.state.deckTitle, {
            title: this.state.deckTitle,
            questions: []
        })

        this.setState({deckTitle: ''})
        this.props.navigation.goBack()
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>Create New Deck</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({deckTitle: text})}
                    value={this.state.deckTitle}
                />
                <Button
                    onPress={this.submit}
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
      padding: 15
    },
    deckTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24
    },
    input: {
        borderColor: purple,
        borderWidth: 2,
        height: 40,
        width: '100%',
        marginTop: 50,
        marginBottom: 50
    },
  });

function mapStateToProps(decks, { navigation }){
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)