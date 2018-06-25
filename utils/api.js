import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashCards:decks'

export function saveDeckTitle (title) {
  console.log('SAVEDECK', title)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: { title: title, questions: [] } }))
  
}

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((decks) => JSON.parse(decks))
}

// AsyncStorage.getItem(title).then((res) => console.log(res))