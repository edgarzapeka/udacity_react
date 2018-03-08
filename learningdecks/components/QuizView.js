import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple } from '../utils/colors'


class QuizView extends Component{

    state = {
        currentIndex: 0,
        lastIndex: this.props.deck.questions.length,
        score: 0,
        answer: ''
    }

    submitAnswer = () => {
        this.setState((prevState, props) => ({
            currentIndex: prevState.currentIndex + 1,
            score : (prevState.answer === props.deck.questions[prevState.currentIndex].answer ? prevState.score + 1 : prevState.score),
        }))
    }

    startAgain = () => {
        this.setState({
            currentIndex: 0,
            lastIndex: this.props.deck.questions.length,
            score: 0,
            answer: ''
        })
    }

    render(){
        const { currentIndex, lastIndex, score } = this.state

        if (currentIndex === lastIndex){
            return (
                <View style={styles.container}>
                    <View style={styles.resultViewContainer}>
                        <Text style={{ fontSize: 24 }}>You've done it!</Text>
                        <Text style={{ fontSize: 32, color: purple }}>Your score is: {score}</Text>
                    </View>
                    <View style={styles.buttonStartAgainContainer}>
                        <Button
                            onPress={() => this.startAgain()}
                            title="Start Again"
                            color={purple}
                        />
                    </View>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.statusLine}>
                    <Text style={{ fontSize: 24 }}>{currentIndex}/{lastIndex}</Text>
                </View>
                <View style={styles.cardContainer}>
                    <View>
                        <Text style={styles.title}>Question</Text>
                        <Text style={styles.question}>{this.props.deck.questions[currentIndex].question}</Text>
                    </View>
                    
                    <View>
                        <Text style={styles.title}>Answer</Text>
                        <TextInput
                            style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({answer: text})}
                            value={this.state.answer}
                        />
                    </View>
                    <Button
                        onPress={() => this.submitAnswer()}
                        title="Next"
                        color={purple}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 2,
        
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    question: {
        fontSize: 30,
    },
    title: {
        fontSize: 18,
        color: purple,
        alignSelf: 'center'
    },
    statusLine: {
        alignSelf: 'flex-start',
    },
    resultViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStartAgainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    }
})

function mapStateToProps(decks, { navigation }){
    const { deckID } = navigation.state.params

    return {
        deck: decks[deckID]
    }
}

export default connect(mapStateToProps)(QuizView)