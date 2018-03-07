import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'

class AddCard extends Component{

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Add Card',
        };
      };

    state = {
        question: '',
        answer: ''
    }

    render(){
        return (
            <View>
                <Text>Enter the question:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question} />
                <Text>Enter answer:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer} />
                <Button
                   onPress={() => console.log('yo')}
                   title="Submit"
                   color={purple} 
                />
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }){
    const { deckTitle } = navigation.state.params

    return{
        deckTitle
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title:{

    },
    buttonSubmit:{

    }
})

export default connect(mapStateToProps)(AddCard)