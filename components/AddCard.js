import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onSubmit() {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const { title } = navigation.state.params
    const card = {
      question,
      answer
    }
    const updatedQuestions = {card, title}
    this.props.addCard(updatedQuestions)
    addCardToDeck(title, question, answer)
  
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Question</Text>
        <TextInput
        style={styles.textInput}
        onChangeText={(question) => this.setState({question})}
        value={this.state.question}
        />
        <Text style={styles.text}>Answer</Text>
        <TextInput
        style={styles.textInput}
        onChangeText={(answer) => this.setState({answer})}
        value={this.state.answer}
        />
        <Button
          onPress={(e) => this.onSubmit(e)}
          title="Submit"
          color="#841584"
        />
      </View>
    )
  }
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC'
  },
  text: {
    color: '#2F4F4F',
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    margin: 30,
    width: 200,
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addCard: (data) => dispatch(addCard(data))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(AddCard);


