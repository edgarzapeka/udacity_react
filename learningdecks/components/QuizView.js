import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'


class QuizView extends Component{

    state = {
        currentIndex: null,
        lastIndex: this.props.deck.questions.length,
        score: 0,
        answer: ''
    }

    startQuiz = () => {
        this.setState({ currentIndex: 0 })
    }

    submitAnswer = () => {
        this.setState((prevState, props) => ({
            currentIndex: ++prevState.currentIndex
        }))
    }

    render(){
        const { currentIndex, lastIndex, score } = this.state

        if (currentIndex === null){
            return (
                <View style={styles.container}>
                    <Button
                        onPress={() => this.startQuiz()}
                        title="Start Quiz"
                        color={purple}
                    />
                </View>
            )
        }

        if (currentIndex === lastIndex){
            return (
                <View style={styles.container}>
                    <Text>You've done it!</Text>
                    <Text>Your score is: {score}</Text>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <Text>{this.props.deck.questions[currentIndex].question}</Text>
                <Text>Answer</Text>
                <TextInput
                    style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                />
                <Button
                    onPress={() => this.submitAnswer()}
                    title="Start Quiz"
                    color={purple}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 2,
    }
})

function mapStateToProps(decks, { navigation }){
    const { deckID } = navigation.state.params

    return {
        deck: decks[deckID]
    }
}

export default connect(mapStateToProps)(QuizView)