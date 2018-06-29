
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TextInput,
  Alert
} from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentQuestionId: 0,
      userAnswer: '',
      isFront: true,
      correct: null,
      correctQuestions: 0
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard(answer) {
    this.setState({ isFront: !this.state.isFront })

    if (this.state.userAnswer === answer) {
      this.setState({ correct: true, correctQuestions: this.state.correctQuestions +1 })
    } else {
      this.setState({ correct: false })
    }

    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  flipCardBack() {
    this.flipCard()
    this.setState({ currentQuestionId: this.state.currentQuestionId + 1, userAnswer: '' })
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const questions = this.props.navigation.state.params.questions || null

    if (questions.length === 0) return null

    const question = questions && Object.values(questions)[this.state.currentQuestionId]
    const isLastCard = (this.state.currentQuestionId + 1) === questions.length;

    return (
      <View style={styles.container}>
        {this.state.isFront &&
          <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <View>
              <Text style={styles.flipText}>
                {`Question ${question.question}`}
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter answer"
                onChangeText={(userAnswer) => this.setState({ userAnswer })}
                value={this.state.userAnswer}
              />
              <Button
                onPress={() => this.flipCard(question.answer)}
                title="Submit"
                color="#841584"
              />
            </View>
          </Animated.View>
        }
        {!this.state.isFront &&
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              {`Answer ${question.question}`}
            </Text>
            {
              this.state.correct && (
                <Text>Well done!</Text>
              )
            }
            {
              !this.state.correct && (
                <Text>Incorrect</Text>
              )
            }
            {
              !isLastCard && (
                <Button style={styles.button}
                  onPress={() => this.flipCardBack()}
                  title="Next Question"
                  color="#841584"
                />
              )
            }
            {
              isLastCard && (
                clearLocalNotification()
                  .then(setLocalNotification),
                Alert.alert(
                  'End of Quiz',
                  `You got ${this.state.correctQuestions} questions correct out of ${questions.length}`,
                  [
                    { text: 'Back to Home', onPress: () => this.props.navigation.navigate('Home')},
                  ],
                  { cancelable: false }
                )
              )
            }
          </Animated.View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: 1000
  },
  flipCard: {
    width: 300,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ABEBC6',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: '#AED6F1',
    backfaceVisibility: 'hidden',
    top: 0,
  },
  flipText: {
    width: 200,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Quiz;

// reference to https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.ios.js for flip animation