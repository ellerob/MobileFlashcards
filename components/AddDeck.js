import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: ''
  }

  onSubmit() {
    const { title } = this.state;
    this.props.addDeck(title)
    saveDeckTitle(title)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'blue'}}>What is the title of your new Deck?</Text>
        <TextInput
        style={styles.textInput}
        placeholder="Deck Title"
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
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
    justifyContent: 'center'
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
    addDeck: (title) => dispatch(addDeck(title))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(AddDeck);
