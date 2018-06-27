import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { recieveDecks } from '../actions';
import { getDecks, clear } from '../utils/api'

class Decks extends Component {

  componentDidMount() {
    getDecks()
      .then(decks => this.props.recieveDecks(decks))
      .catch(console.log('ERROR'))
  }

  renderItem = ({ item }) => { 
    const numberCards=item.questions.length
    return(
      <TouchableOpacity onPress={() =>
        this.props.navigation.navigate('Deck', {deck: item})}>
      <View style = {styles.itemContainer}>
        <Text>{item.title}</Text>
        <Text>{`${numberCards} Cards `}</Text>
        <Button
          onPress={() => clear()}
          title="Delete"
          color="#841584"
        />
      </View>
    </TouchableOpacity>
    )
  }
  
  render() {
    const { decks } = this.props;
    return (
      <View styles = {styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        /> 
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  itemContainer: {
    borderWidth: 2,
    borderColor: '#808080',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    padding: 50,
  },
}
)

function mapStatetoProps(state) {
  return {
    decks: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recieveDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

export default withNavigation(connect(
  mapStatetoProps,
  mapDispatchToProps
)(Decks));
