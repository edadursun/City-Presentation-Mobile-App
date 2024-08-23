import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,TouchableWithoutFeedback,Keyboard } from 'react-native'
import yardimci from '../WebServer/Network'

class GirisYapma extends Component{

         state = {
            email: '',
            password: '',
            userName: ''
         }

         handleEmail = (text) => {
            this.setState({ email: text })
         }

         handlePassword = (text) => {
            this.setState({ password: text })
         }

         resetForm = () => {
            this.setState({
                  password: '',
                  email: '',
            });
         }

         handleLogin = async(email,password) => {

            if(this.state.email === '' || this.state.password === '') {
                  alert("Alanlar boş bırakılamaz");
                  return;
            }

            this.setState ({
                  buttondisabled: true
            })
                     
            let result = await yardimci.doLogon(password,email);
            
            console.log("result: " +result);

            if(result == true){
                  this.props.navigation.navigate('AnaMenu');
            }
            if(result == false){
               this.resetForm
            }
            
         }

   render() {
      return (
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style = {styles.container}>
               
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Email"
                  autoCapitalize = "none"
                  textAlignVertical='top'
                  onChangeText = {this.handleEmail}/>
               
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Password"
                  autoCapitalize = "none"
                  secureTextEntry
                  onChangeText = {this.handlePassword}/>
               
               <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                     () => this.handleLogin(this.state.email, this.state.password)
                  }>
                  <Text style = {styles.submitButtonText}> Submit </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style = {styles.registerButton}
                  onPress = {
                     () => this.props.navigation.navigate('KayitOlma')
                  }>
                  <Text style = {styles.submitButtonText}> Register </Text>
               </TouchableOpacity>
            </View>
         </TouchableWithoutFeedback>
      );
   };
}

const styles = StyleSheet.create({
   container: {
      flex:1,
      marginTop:2,
      paddingTop: 175,
      backgroundColor:"#dce3dc"
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#404a40',
      borderWidth: 0.5,
      fontSize:16,
    },
   submitButton: {
      backgroundColor: '#404a40',
      padding: 10,
      margin: 15,
      height: 40,
   },
   registerButton: {
    backgroundColor: '#404a40',
    padding: 10,
    margin: 15,
    height: 40,
 },
   submitButtonText:{
      color: 'white',
      fontSize:16,
   }
})

export default GirisYapma;
