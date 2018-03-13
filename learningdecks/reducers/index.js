import { 
    ADD_DECK,
    RECEIVE_DECKS,
    ADD_CARD,
    SELECTED_CARD    
} from '../actions/index'
import { combineReducers } from 'redux'

function decks(state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return action.decks
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            let stateClice = {
                ...state
            }
            stateClice[action.deckTitle].questions.push(action.card)
            return stateClice
        default:
            return state
    }
}

function deckState(state = "", action){
    switch(action.type){
        case SELECTED_CARD:
            return action.title
        default:
            return state
    }
}

export default combineReducers({decks, deckState})