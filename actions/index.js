export const ADD_DECK = 'ADD_DECK'
export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const RECIEVE_DECK = 'RECIEVE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_DECK = 'GET_DECK'

export const addDeck = title => ({
  type: ADD_DECK,
  payload: title
})

export const deleteDeck = deck => ({
  type: ADD_DECK,
  payload: deck
})

export const addCard = data => ({
  type: ADD_CARD,
  payload: data
})

export const recieveDecks = decks => ({
  type: RECIEVE_DECKS,
  payload: decks
})

export const getDeck = title => ({
  type: GET_DECK,
  payload: title
})

