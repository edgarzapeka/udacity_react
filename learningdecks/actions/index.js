export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(deck){
    return {
        type: ADD_DECK,
        deck
    }
}