import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GirisButonu from "./GirisButonu";
import KayıtButonuGirisSayfasi from "./KayıtButonuGirisSayfasi";
import EmailGirisSayfasi from "./EmailGirisSayfasi";
import ParolaGirisSayfasi from "./ParolaGirisSayfasi";
import doLogon from "../WebServer/Networking";
import { render } from "react-dom";

class GirisSayfasi extends Component {

  state = {
    eMail: '',
    password: '',
    //userName: '',
  }

    /*this.state = {
      userName: '',
      password: '',
      eMail: '',
      buttondisabled: false,
    } 
  
    setInputValue(property, val); {
        this.setState ({
          [property]: val,
        })
    } 

    resetForm(); {
        this.setState({
          password: '',
          eMail: '',
          buttondisabled: false,
        })
    }
    */
  
    logIn = (eMail, password) => {
    
      /*if(this.state.eMail ==='') {
        alert("boş bırakma");
        return;
      }
      if(!this.state.password) {
        alert("boş bırakma");
        return;
      }
      this.setState ({
        buttondisabled: true
      })
      let result = doLogon('', password,eMail);
      if( result && result.success){

      }
      else if (result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }
      */
    }

    render(){
      return (
        <View style={styles.container}>

          <GirisButonu
            style={styles.girisButonu}
              disabled = { this.state.buttondisabled}
              onPress = { () => 
              this.logIn(this.state.eMail, this.state.password)
            }>
            </GirisButonu>

          <KayıtButonuGirisSayfasi
            style={styles.kayıtButonu}
          ></KayıtButonuGirisSayfasi>

          <EmailGirisSayfasi
            style={styles.epostaGirisi}
            value = {this.state.eMail ? this.state.eMail :''}
            onChangeText = {this.handleEmail}
          ></EmailGirisSayfasi>

          <ParolaGirisSayfasi
            style={styles.parolaGirisi}
            value = {this.state.password ? this.state.password :''}
            onChangeText = {this.handlePassword}
          ></ParolaGirisSayfasi>

        </View>
      );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(207,97,97,1)"
  },
  girisButonu: {
    height: 44,
    width: 195,
    marginTop: 447,
    marginLeft: 84
  },
  kayıtButonu: {
    height: 44,
    width: 118,
    marginTop: 45,
    marginLeft: 120
  },
  epostaGirisi: {
    height: 43,
    width: 270,
    marginTop: -329,
    marginLeft: 52
  },
  parolaGirisi: {
    height: 43,
    width: 270,
    marginTop: 45,
    marginLeft: 52
  }
});

export default GirisSayfasi;