import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { fetchDecks, clearDecks, initializeDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import DeckItem from './DeckItem'

class DeckList extends Component{
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
        
        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map((key) => {
                    return (<DeckItem key={key} deck={decks[key]}/>)
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
  });

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)