import { ADD_DECK, RECIEVE_DECKS, ADD_CARD, GET_DECK } from '../actions'

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
    case RECIEVE_DECKS:
    case GET_DECK:
      return {
        ...state,
        ...action.payload
      }
    case ADD_DECK :
      return {
        ...state,
        [action.payload]: {
          title: action.payload,
          questions: [],
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.payload.title]: {
          title: action.payload.title,
          questions: [
            ...state[action.payload.title].questions,
            {
              question: action.payload.card.question,
              answer: action.payload.card.answer,
            },
          ],
        }
      }
    default :
      return state
  }
}

export default decks 