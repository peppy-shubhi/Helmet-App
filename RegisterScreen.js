import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from './Firebase';

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Add Helmet',
  };
  constructor() {
    super();
    this.state = {
      HelmetId: '',
      Number1: '',
      Number2: '',
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    var that = this;
    firebase.database().ref('Users/').set({
        HelmetId: that.state.HelmetId,
        Number1: that.state.Number1,
        Number2: that.state.Number2,
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
        that.props.navigation.navigate('BoardRegister');
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'HelmetId'}
              value={this.state.HelmetId}
              onChangeText={(text) => this.updateTextInput(text, 'HelmetId')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Number 1'}
              value={this.state.Number1}
              onChangeText={(text) => this.updateTextInput(text, 'Number1')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Number 2'}
              value={this.state.Number2}
              onChangeText={(text) => this.updateTextInput(text, 'Number2')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveBoard()} />
        </View>
      </ScrollView>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})