export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function submitDeck(deck){
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard(card, deckTitle){
    return {
        type: ADD_CARD,
        card,
        deckTitle
    }
}