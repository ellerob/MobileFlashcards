import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashCards:decks'

export function clear () {
  return AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
}

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((decks) => JSON.parse(decks))
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    const deck = JSON.parse(results)
    return deck[title]
  })
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    const deck = JSON.parse(results)
    deck[title].questions.push(card)
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck))
  })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: { title: title, questions: [] } }))
}


// AsyncStorage.getItem(title).then((res) => console.log(res))