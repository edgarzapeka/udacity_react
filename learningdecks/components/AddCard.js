import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import { addCard } from '../actions'
import { addQuestion } from '../utils/api'

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
                   onPress={() => {
                        addQuestion(this.props.deckTitle, {
                            question: this.state.question,
                            answer: this.state.answer
                        })
                        this.props.submitCard(this.state.question, this.state.answer, this.props.deckTitle)
                        this.props.goBack()
                   }}
                   title="Submit"
                   color={purple} 
                />
            </View>
        )
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

function mapStateToProps(decks, { navigation }){
    const { deckTitle } = navigation.state.params

    return{
        deckTitle
    }
}

function mapDispatchToProps(dispatch, { navigation }){
    return {
        submitCard: (question, answer, deckTitle) => {
            dispatch(addCard({
                question: question,
                answer: answer
            }, deckTitle))
        },
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)