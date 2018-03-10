import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { purple, red, black } from '../utils/colors'
import CheckBox from 'react-native-checkbox'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'


class QuizView extends Component{

    state = {
        currentIndex: 0,
        lastIndex: this.props.deck.questions.length,
        score: 0,
        answer: '',
        cardSide: 'front',
        checkboxAnswer: false
    }

    submitAnswer = () => {
        this.setState((prevState, props) => ({
            currentIndex: prevState.currentIndex + 1,
            answer: '',
            score : (this.checkAnswer(
                props.deck.questions[prevState.currentIndex].answerType,
                props.deck.questions[prevState.currentIndex].answer,
                prevState.answer,
                prevState.checkboxAnswer) ? prevState.score + 1 : prevState.score),
        }))

        clearLocalNotifications().then(setLocalNotification)
    }

    checkAnswer = (answerType, answer, userAnswer, checkboxAnswer) => {
        if (answerType === 'bool'){
            return answer.toString() === checkboxAnswer.toString()
        }
        return answer.toLowerCase().replace(/\s+/, "") === userAnswer.toLowerCase().replace(/\s+/, "")
    }

    startAgain = () => {
        this.setState({
            currentIndex: 0,
            lastIndex: this.props.deck.questions.length,
            score: 0,
            answer: '',
            cardSide: 'front',
            checkboxAnswer: true
        })
    }

    flipCard = () => {
        if (this.state.cardSide === 'front'){
            this.setState({cardSide: 'back'})
        } else{
            this.setState({cardSide: 'front'})
        }
    }

    render(){
        const { currentIndex, lastIndex, score, cardSide, checkboxAnswer } = this.state
        const deck = this.props.deck

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
                        <View style={{alignSelf: 'flex-end'}}>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.cardTouchable} onPress={() => this.flipCard()}>
                    <View style={styles.cardContainer}>
                    { cardSide === 'back' ? 
                        (
                            <View style={styles.cardContainer}>
                                <Text style={styles.title}>Answer:</Text>
                                <Text style={styles.answer}>{deck.questions[currentIndex].answer.toString() }</Text>
                                <Button
                                    onPress={() => this.flipCard()}
                                    title="Back"
                                    color={purple}
                                />
                            </View>
                        ): 
                        ( 
                            <View style={styles.cardContainer}>
                                <Text style={styles.title}>Question</Text>
                                <View>
                                    <Text style={styles.question}>{this.props.deck.questions[currentIndex].question}</Text>
                                </View>
                                
                                <View>
                                    <Text style={styles.title}>Answer</Text>
                                    {deck.questions[currentIndex].answerType === 'bool' ?
                                    (
                                        <View>
                                            <CheckBox
                                                label='True'
                                                labelStyle = {{color: purple}}
                                                checked={checkboxAnswer}
                                                onChange={() => this.setState({checkboxAnswer: true})}
                                            />
                                            <CheckBox
                                                label='False'
                                                labelStyle = {{color: purple}}
                                                checked={!checkboxAnswer}
                                                onChange={() => this.setState({checkboxAnswer: false})}
                                            />
                                        </View>
                                    )
                                    : (
                                        <TextInput
                                            style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
                                            onChangeText={(text) => this.setState({answer: text})}
                                            value={this.state.answer}
                                        />
                                    )}
                                </View>
                                <Button
                                    onPress={() => this.submitAnswer()}
                                    title="Next"
                                    color={purple}
                                />
                            </View>
                        )}
                    </View>
                    </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 2,
        padding: 20
    },
    cardTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: black,
        borderRadius: 40,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: black,
        borderRadius: 40,
        width: '100%',
        height: '100%'
    },
    question: {
        fontSize: 30,
    },
    title: {
        fontSize: 18,
        color: purple,
        alignSelf: 'center',
    },
    statusLine: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        display: 'flex'
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
    },
    answer:{
        fontSize: 34,
        fontWeight: 'bold',
        color: red
    }
})

function mapStateToProps(decks, { navigation }){
    const { deckID } = navigation.state.params

    return {
        deck: decks[deckID]
    }
}

export default connect(mapStateToProps)(QuizView)