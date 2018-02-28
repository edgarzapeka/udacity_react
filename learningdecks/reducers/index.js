import { ADD_DECK, RECEIVE_DECKS } from '../actions/index'

function decks(state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return action.decks
        case ADD_DECK:
            return {
                ...action.state,
                ...action.deck
            }
        default:
            return state
    }
}

export default decks