import AsyncStorage from 'react-native'

const STORAGE_KEY = 'Learning_decks'

export function fetchDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(data => {
            console.log(data)
            return data
        })
}

export function addDeck({ key, dock }){
    return AsyncStorage.setItem(key, JSON.stringify({
        [key]: dock
    }))
}