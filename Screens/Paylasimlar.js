import React, { Component } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import yardimci from '../WebServer/Network';
import MapView from "react-native-maps";
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import openMap from 'react-native-open-maps';
import { createOpenLink } from 'react-native-open-maps';

export default class Paylasimlar extends Component {
  
  constructor(props){
    super(props)
      this.state = {
        dataSource: []
      }
  }
  StoreId = async(id) => {
    try {
        await AsyncStorageLib.setItem('py_id', id);
        const gelenBolum = await AsyncStorageLib.getItem("py_id");
    } catch (error) {
        alert(error);
    }
  }

  readStore = async () => {
    try {
        const value = await AsyncStorageLib.getItem('bolum');
        if (value !== null) {
          return value;
        }
    } catch (e) {
        console.log("readstore: ", e)
        alert(e)
    }
  }

  async componentDidMount() {
    try {
      let resultJson = await yardimci.showShares(await this.readStore());
      let newJSON = []
      this.setState({
        dataSource: resultJson.data
      })
    } catch (error) {
      console.log("try-catch: ",error)
    }
  } 

  goToComments = (id,yorumsayisi) => {
    console.log("datasource_id: ", id)
    this.StoreId(id)
    if(yorumsayisi == 0){
      Alert.alert(
        "",
        "Yorum Bulunmamaktadır",
        [
          {
            text: "Yorum Yap",
            onPress: () => this.props.navigation.navigate('YorumlarClass', {
              py_id : id,
            })
          },
          {
            text: "İptal",
            onPress: () => this.props.navigation.navigate("Paylasimlar"),
            style: "cancel"
          }
        ]
      );
    }else(
      this.props.navigation.navigate('YorumlarClass', {
        py_id : id,
      })
    )

  }
  
  goToMaps = (location) => {

    let newLocation = []
    newLocation = JSON.parse(location)
    Alert.alert(
      "Yönlendirme",
      "Fotoğraf konumu haritalarda açılacaktır. Devam etmek istiyor musunuz?",
      [
        {
          text: "Evet",
          onPress: () => openMap({latitude:parseFloat(newLocation[0]), longitude: parseFloat(newLocation[1])})
        },
        {
          text: "İptal",
          onPress: () => this.props.navigation.navigate("Paylasimlar"),
          style: "cancel"
        }
      ]
    );
  }

  _renderItem = ({item,index}) => {
      if( this.state.dataSource === null){
        alert("Herhangi bir gönderi bulunamamaktadır")
        return;
      }
    return (
      <View style={styles.card}>
          <Image style = {styles.cardImage}
              source={{ uri: item.dosya_adi }}
          />
          <View style={styles.cardHeader}>
              <View>
                <Text style={styles.title}>{item.nickname}</Text>
                <Text style={styles.description}>{item.aciklama}</Text>
                <View style={styles.timeContainer}>
                    <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                    <Text style={styles.time}>{item.ekleme_zamani}</Text>
                </View>
              </View>
          </View> 
          <View style={styles.cardFooter}>
              <View style={styles.socialBarContainer}>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton} onPress={() => this.goToComments(item.id,item.yorum_sayisi)}>
                        <Icon name="chatbubble-outline" size={26}  />
                        <Text style={styles.socialBarlabel}> Yorumlar {item.yorum_sayisi}</Text>
                  </TouchableOpacity>
                </View>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity style={styles.socialBarButton} onPress = {() => this.goToMaps(item.konum)}>
                        <Icon name="navigate-outline" size={26}/> 
                        <Text style={styles.socialBarlabel}>Konuma Git</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>

      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
            data={this.state.dataSource}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
            renderItem={this._renderItem}
            keyExtractor={(x,i) => i}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:2,
    backgroundColor: '#dce3dc'
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#dce3dc",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 300,
    width: 325,
    justifyContent: 'center',
  },
  /******** card components **************/
  title:{
    fontSize:20,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  