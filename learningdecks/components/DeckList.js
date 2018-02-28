import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fetchDecks, clearDecks, initializeDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

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
            <View style={styles.container}>
                {Object.keys(decks).map((key) => {
                    return (<Text>{decks[key].title}</Text>)
                })}
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
    },
  });

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)