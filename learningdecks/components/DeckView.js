import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Button } from 'react-native'
import { black, purple, grey } from '../utils/colors'

class DeckView extends Component{

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Deck View',
        };
      };

    render(){
        const navigator = this.props.navigation
        const { title, questions } = this.props.deck

        return (
            <View style={styles.container}>
                <View style={styles.infoBlock}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{questions.length} cards</Text>
                </View>
                <View style={styles.buttonBlock}>
                    <Button
                       onPress={() => navigator.navigate('AddCard', {deckTitle: title})}
                       title="Add Card"
                       color={black}
                       />
                    <Button
                        disabled={questions.length === 0 ? true : false }
                        onPress={() => navigator.navigate('QuizView', {deckID: title})}
                        title="Start Quiz"
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
        flexDirection: 'column'
    },
    infoBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 2
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        color: grey
    },
    buttonBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 1
    },
    addCardButton: {

    },
    startQuizButton: {

    }
})

function mapStateToProps(decks, { navigation }){
    const { deckID } = navigation.state.params

    return {
        deck: decks[deckID]
    }
}

export default connect(mapStateToProps)(DeckView)