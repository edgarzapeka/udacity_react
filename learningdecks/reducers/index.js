import { 
    ADD_DECK,
    RECEIVE_DECKS,
    ADD_CARD    
} from '../actions/index'

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

export default decks