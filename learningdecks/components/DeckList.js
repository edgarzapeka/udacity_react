import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { fetchDecks, clearDecks, initializeDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { grey } from '../utils/colors'

class DeckList extends Component{

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Deck List',
        };
      };

    componentDidMount(){

        fetchDecks().then(data => {
            if (data === null){
                initializeDecks()
                this.props.dispatch(receiveDecks({}))
            } else{
                this.props.dispatch(receiveDecks(data))   
            }
        })
    }

    render(){
        const decks = this.props.decks
        const navigator = this.props.navigation
        
        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map((key) => {
                    return (
                    <TouchableOpacity style={styles.deckContainer} key={key} onPress={() => navigator.navigate('DeckView', {deckID: key})}>
                        <Text style={styles.title}>{decks[key].title}</Text>
                        <Text style={styles.subtitle}>{decks[key].questions.length} cards</Text>
                    </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    deckContainer: {
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
  });

function mapStateToProps(decks, { navigation }){
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)