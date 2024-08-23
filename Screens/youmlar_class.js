import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,  
} from 'react-native';
import yardimci from '../WebServer/Network';
import { useState } from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";


export default class YorumlarClass extends Component {

    constructor(){
        super()
          this.state = {
            dataSource: []
          }
      }
      state = {
        yorumText: '',
        refreshing: false
      }

      onChangeText = (text) => this.setState({yorumText:text});

      readId = async () => {
        try {
            const value = await AsyncStorageLib.getItem('py_id');
            if (value !== null) {
              return value;
            }
        } catch (e) {
            console.log("readId: ", e)
            alert(e)
        }
      }

      async componentDidMount() {

        try {
          let commentJson = await yardimci.getComments(await this.readId());
          let newJSON = []
          this.setState({
            dataSource: commentJson.data
          })
          console.log("asd",this.state.dataSource)
        } catch (error) {
          console.log("try-catch: ",error)
        }
      }

      shareYourComment = async() =>{
        console.log("yorum", this.state.yorumText )
        
        let result = await yardimci.setComments(await this.readId(),this.state.yorumText);
            
            console.log("result: " +result);

            if(result === true){
                  this.props.navigation.navigate('YorumlarClass');
                  
            }
            if(result === false){
               this.resetForm
            }
      }

      
      render() {
        return (
            <SafeAreaView style={{ flex:1 }}>
                <FlatList
                    style={styles.root}
                    data={this.state.dataSource}
                    extraData={this.state}
                    ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator}/>
                    )
                    }}
                    keyExtractor={(x,i)=>i}
                    renderItem={(item) => {
                    const Notification = item.item;
                    return(
                        <View style={styles.container}>
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                                <Text  style={styles.name}>{Notification.yorum_nickname}</Text>
                                <Text style={styles.time}> {Notification.tarih} </Text>
                            </View>
                            <Text rkType='primary3 mediumLine'>{Notification.yorum}</Text>
                        </View>
                        </View>
                    );
                    }}/>

                <KeyboardAvoidingView behavior='position'>    
                    <View style = {styles.container2}>
                        <TextInput style={styles.input} placeholder="Add a comment..." onChangeText={this.onChangeText} />
                        <TouchableOpacity  onPress={() => this.shareYourComment()}>
                                <Icon name="md-send" size={38} color="black"/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>  
            </SafeAreaView>
        );
      }
}


const styles = StyleSheet.create({
    root: {
      backgroundColor: "#ffffff",
      marginTop:10,
    },
    button: {
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
        paddingLeft: 15,
      },
    input: {
        flex: 1,
        height: 45,
        fontSize: 15,
        borderWidth:0.8
    },
    container: {
      paddingLeft: 19,
      paddingRight: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    content: {
      marginLeft: 16,
      flex: 1,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    image:{
      width:45,
      height:45,
      borderRadius:20,
      marginLeft:20
    },
    time:{
      fontSize:11,
      color:"#808080",
    },
    name:{
      fontSize:16,
      fontWeight:"bold",
    }
  }); 