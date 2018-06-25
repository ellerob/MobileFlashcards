import { ADD_DECK, RECIEVE_DECKS } from '../actions'

// const initialState = {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_DECKS :
      return {
        ...state,
        ...action.payload
      }
    case ADD_DECK :
      return {
        ...state,
        [action.payload]: {
          title: action.payload,
          numberOfCards: 0,
          questions: [],
        }
      }
    default :
      return state
  }
}

export default decks 