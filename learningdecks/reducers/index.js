import { ADD_DECK } from '../actions/index'

function decks(state = {}, actions){
    switch(action.type){
        case ADD_DECK:
            return {
                ...actions.state,
                ...actions.deck
            }
        default:
            return state
    }
}

export default decks