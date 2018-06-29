import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECK_STORAGE_KEY = 'MobileFlashCards:decks'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.AsyncStorage(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.detDate(tomorrow.getDate() +1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync (
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })

}

function createNotification () {
  return {
    title: 'Time to revise',
    body: 'Dont forget to revise today',
    ios: {
      sound: true
    }
  }
}