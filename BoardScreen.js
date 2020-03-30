import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, PermissionsAndroid } from 'react-native';
import SendSMS from 'react-native-sms';
//import SmsAndroid  from 'react-native-sms-android';
import SmsAndroid  from 'react-native-get-sms-android';
import firebase from './Firebase';
import Geolocation from 'react-native-geolocation-service';
import axios from 'react-native-axios';

type Props = {};
export default class BoardScreen extends Component<Props> {

  static navigationOptions = {
    title: 'Witty Helmet',
  };

  componentDidMount() {
    let flag=0;
    firebase.database().ref('SoSs/').on('value', async function (snapshot) {
        console.log(snapshot.val());
        if(flag==1)
        {
          let granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS, {
              title: 'Send SMS',
              message: 'Need access to send sms',
            },
          )
          let granted2 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
              title: 'Access Location',
              message: 'Need access to use GPS',
            },
          )
          if(granted===PermissionsAndroid.RESULTS.GRANTED && granted2===PermissionsAndroid.RESULTS.GRANTED)
          {
            var curposition;
            var address;
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    curposition = position;
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
            setTimeout(function afterTwoSeconds() {
              return axios.get('https://api.opencagedata.com/geocode/v1/json?q='+curposition.coords.latitude+'+'+curposition.coords.longitude+'&key=2acf59c697904b4cbbce529e81ca2e3c')
                  .then(function(response) {
                    //console.log(JSON.parse(response._bodyText));
                    console.log("!!!!!!!!!");
                    //console.log(response);
                    var responseJson = response.data;
                    console.log(responseJson);
                    console.log(responseJson.results[0].formatted);
                    address = responseJson.results[0].formatted;
                    return address;
                  })
                  .then(function(address){
                      console.log(address);
                      firebase.database().ref('Users/').once('value', function (snapshot) {
                        console.log("YUSSSSSSSSSSSSSS");
                        if(snapshot.val().Number1!="")
                        {
                            SmsAndroid.autoSend(snapshot.val().Number1, 'Helmet app emergency, Reach: '+address+'. Latitude: '+curposition.coords.latitude+' , Longitude: '+curposition.coords.longitude+' fast!!!', (fail) => {
                              console.log("Failed with this error: " + fail)
                            }, (success) => {
                                console.log("SMS sent successfully");
                          });
                        }
                        if(snapshot.val().Number2!="")
                        {
                            SmsAndroid.autoSend(snapshot.val().Number2, 'Helmet app emergency, Reach: '+address+'. Latitude: '+curposition.coords.latitude+' , Longitude: '+curposition.coords.longitude+' fast!!!', (fail) => {
                              console.log("Failed with this error: " + fail)
                            }, (success) => {
                                console.log("SMS sent successfully");
                          });
                        }
                    });

                  })
            }, 5000);
            
          }
          else
          {
            console.log("NOOOOOOOOOOOOO");
          }
        }
        flag=1;
    });
  }


  async someFunction() 
  {
      // SendSMS.send({
      //     body: 'The default body of the SMS!',
      //     recipients: ['7388365831'],
      //     successTypes: ['sent', 'queued'],
      //     allowAndroidSendWithoutReadPermission: true
      // }, (completed, cancelled, error) => {
   
      //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
   
      // });

      // SmsAndroid.sms(
      //   '7388365831', // phone number to send sms to
      //   'This is the sms text', // sms body
      //   'sendDirect', // sendDirect or sendIndirect
      //   (err, message) => {
      //     if (err){
      //       console.log("error");
      //     } else {
      //       console.log(message); // callback message
      //     }
      //   }
      // );

      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS, {
          title: 'Send SMS',
          message: 'Need access to send sms',
        },
      )
      // if(granted===PermissionsAndroid.RESULTS.GRANTED)
      // {
      //   firebase.database().ref('Users/').on('value', function (snapshot) {
      //       console.log("YUSSSSSSSSSSSSSS");
      //       if(snapshot.val().Number1!="")
      //       {
      //           SmsAndroid.autoSend(snapshot.val().Number1, 'Helmet app emergency', (fail) => {
      //             console.log("Failed with this error: " + fail)
      //           }, (success) => {
      //               console.log("SMS sent successfully");
      //         });
      //       }
      //       if(snapshot.val().Number2!="")
      //       {
      //           SmsAndroid.autoSend(snapshot.val().Number2, 'Helmet app emergency', (fail) => {
      //             console.log("Failed with this error: " + fail)
      //           }, (success) => {
      //               console.log("SMS sent successfully");
      //         });
      //       }
      //   });
        
      // }
      let granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'Access Location',
            message: 'Need access to use GPS',
        },
      )
      if(granted===PermissionsAndroid.RESULTS.GRANTED && granted2===PermissionsAndroid.RESULTS.GRANTED)
      {
        var curposition;
        var address;
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                curposition = position;
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        setTimeout(function afterTwoSeconds() {
          return axios.get('https://api.opencagedata.com/geocode/v1/json?q='+curposition.coords.latitude+'+'+curposition.coords.longitude+'&key=2acf59c697904b4cbbce529e81ca2e3c')
              .then(function(response) {
                //console.log(JSON.parse(response._bodyText));
                console.log("!!!!!!!!!");
                //console.log(response);
                var responseJson = response.data;
                console.log(responseJson);
                console.log(responseJson.results[0].formatted);
                address = responseJson.results[0].formatted;
                return address;
              })
              .then(function(address){
                  console.log(address);
                  firebase.database().ref('Users/').once('value', function (snapshot) {
                    console.log("YUSSSSSSSSSSSSSS");
                    if(snapshot.val().Number1!="")
                    {
                        SmsAndroid.autoSend(snapshot.val().Number1, 'Helmet app emergency, Reach: '+address+'. Latitude: '+curposition.coords.latitude+' , Longitude: '+curposition.coords.longitude+' fast!!!', (fail) => {
                          console.log("Failed with this error: " + fail)
                        }, (success) => {
                            console.log("SMS sent successfully");
                      });
                    }
                    if(snapshot.val().Number2!="")
                    {
                        SmsAndroid.autoSend(snapshot.val().Number2, 'Helmet app emergency, Reach: '+address+'. Latitude: '+curposition.coords.latitude+' , Longitude: '+curposition.coords.longitude+' fast!!!', (fail) => {
                          console.log("Failed with this error: " + fail)
                        }, (success) => {
                            console.log("SMS sent successfully");
                      });
                    }
                });

              })
        }, 5000);
        
      }
      else
      {
        console.log("NOOOOOOOOOOOOO");
      }
      

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Witty Helmet!</Text>
        <TouchableHighlight onPress={this.someFunction} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send SMS</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate('BoardRegister');
                        }} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Details</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});