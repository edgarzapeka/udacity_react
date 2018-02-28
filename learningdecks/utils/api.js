import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'Learning_decks'

export function fetchDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(data => {
            return JSON.parse(data)
        })
}

export function addDeck( key, deck ){
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: deck
    })).then(console.log('added'))
}

export function clearDecks(){
    return AsyncStorage.clear()
}

export function initializeDecks(){
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}))
}