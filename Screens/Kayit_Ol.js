import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import yardimci from '../WebServer/Network'

class KayitOlma extends Component {

    state = {
        email: '',
        username: '',
        password1: '',
        password2: ''
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword1 = (text) => {
        this.setState({ password1: text })
    }
    handlePassword2 = (text) => {
        this.setState({ password2: text })
    }

    handleUsername = (text) => {
      this.setState({ username: text })
    }

    resetForm = () => {
        this.setState({
            password: '',
            email: '',
            buttondisabled: false,
        })
    }

   handleRegister = async (email,username, password1, password2) => {

      if(this.state.email === '' || this.state.password1 === '' || this.state.password2 === '' || this.state.username === '') {
            alert("Alanlar boş bırakılamaz");
            return;
      }

      if (this.state.password1 === this.state.password2){

         var lengthpassword = this.state.password1.length;
         if ( lengthpassword >= 6) {

            this.setState ({
               buttondisabled: true
            })
            
            
            let result = await yardimci.doUserAdd (email, username, password1);

            if(result == true){
               this.props.navigation.navigate('GirisYapma');
            }
            
         } else {
            alert("Parola en az 6 karakterden oluşmalıdır.");
         }

      } else{
         alert("Parolalar birbiriyle eşleşmelidir.");
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
                     onChangeText = {this.handleEmail}/>

                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Username"
                     autoCapitalize = "none"
                     onChangeText = {this.handleUsername}/>
                  
                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Password"
                     autoCapitalize = "none"
                     secureTextEntry
                     onChangeText = {this.handlePassword1}/>

                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Password Again"
                     autoCapitalize = "none"
                     secureTextEntry
                     onChangeText = {this.handlePassword2}/>
      
                  <TouchableOpacity
                     style = {styles.registerButton}
                     onPress = {
                        () => this.handleRegister(this.state.email, this.state.username, this.state.password1, this.state.password2)
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
      paddingTop: 125,
      backgroundColor:"#dce3dc"

   },
   input: {
      margin: 15,
      height: 40,
      fontSize:16,
      borderColor: '#404a40',
      borderWidth: 0.5
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
    margin: 8,
    height: 45,
 },
   submitButtonText:{
      color: 'white',
      fontSize: 16
   }
})

export default KayitOlma;
