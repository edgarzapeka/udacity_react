export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const SELECTED_CARD = 'SELECTED_CARD'

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function selectCard(title){
    return {
        type: SELECTED_CARD,
        title
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