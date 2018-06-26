export const ADD_DECK = 'ADD_DECK'
export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const ADD_CARD = 'ADD_CARD'

export const addDeck = title => ({
  type: ADD_DECK,
  payload: title
})

export const recieveDecks = decks => ({
  type: RECIEVE_DECKS,
  payload: decks
})

export const addCard = data => ({
  type: ADD_CARD,
  payload: data
})