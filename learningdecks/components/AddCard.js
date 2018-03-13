import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'
import { addCard } from '../actions'
import { addQuestion } from '../utils/api'
import CheckBox from 'react-native-checkbox'

class AddCard extends Component{

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Add Card',
        };
      };

    state = {
        question: '',
        answer: '',
        answerType: 'bool', //openAnswer & bool
        boolAnswer: true
    }

    submitQuestion = () => {
        if (this.state.question === "" || ( this.state.answerType !== 'bool' ? this.state.answer === "" : false )){
            Alert.alert(
                'Validation Error!',
                'You have to fill all the fields',
                [
                    {text: 'Ok', onPress: () => console.log('Validation Error. Empty Question Fields') }
                ],
                { cancelable: false }
            )
            return
        }

        const deck = {
            question: this.state.question,
            answer: this.state.answerType === 'bool' ? this.state.boolAnswer : this.state.answer,
            answerType: this.state.answerType 
        }

        addQuestion(this.props.deckTitle, deck)
        this.props.submitCard(deck, this.props.deckTitle)

        // Yeah, it's a such a hack but it works perefectly. 
        // By the way no ideay way it's not updating with redux.
        // It seems that when I call goBack() it doens't call connect(mapStateToProps)
        // I would very appreciate if you tell me how to do it correct way. Thanks
        this.props.goBack()
        this.props.goBack()
        this.props.navigation.navigate('DeckView')
    }

    render(){
        const { answerType, boolAnswer } = this.state

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Enter question:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question} />
                <Text style={styles.title}>Select answer type:</Text>
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        label='Correct / Incorrect'
                        labelStyle = {{color: purple}}
                        checked={answerType === 'bool' ? true : false}
                        onChange={() => this.setState({answerType: 'bool'})}
                    />
                    <CheckBox
                        label='Open answer'
                        labelStyle = {{color: purple}}
                        checked={answerType === 'bool' ? false : true}
                        onChange={() => this.setState({answerType: 'openAnswer'})}
                    />
                </View>
                <Text style={styles.title}>The Correct Answer:</Text>
                {answerType === 'bool' ? 
                (
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        label='Correct'
                        labelStyle = {{color: purple}}
                        checked={boolAnswer}
                        onChange={() => this.setState({boolAnswer: true})}
                    />
                    <CheckBox
                        label='Incorrect'
                        labelStyle = {{color: purple}}
                        checked={!boolAnswer}
                        onChange={() => this.setState({boolAnswer: false})}
                    />
                </View>)
                :
                (
                <View style={{width: '100%'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({answer: text})}
                        value={this.state.answer} />
                </View>
                )}
                <Button
                    onPress={() => this.submitQuestion()}
                    title="Submit"
                    color={purple} 
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title:{
        fontSize: 18,
        color: purple,
        alignSelf: 'center',
    },
    input: {
        borderColor: purple,
        borderWidth: 2,
        height: 40,
        width: '100%'
    }
})

function mapStateToProps(decks, { navigation }){
    const { deckTitle} = navigation.state.params

    return{
        deckTitle        
    }
}

function mapDispatchToProps(dispatch, { navigation }){
    return {
        submitCard: (deck, deckTitle) => {
            dispatch(addCard(deck, deckTitle))
        },
        goBack: () => navigation.goBack(null)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)