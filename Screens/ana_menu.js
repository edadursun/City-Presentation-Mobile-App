
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'

class AnaMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  kategori: "Restaurant/Kafe",  image:"https://img.icons8.com/external-nawicon-glyph-nawicon/64/000000/external-restaurant-location-nawicon-glyph-nawicon.png"},
        {id:2,  kategori: "Turistik Yerler",  image:"https://img.icons8.com/ios/50/000000/museum.png"},      
        {id:3,  kategori: "Arıza",            image:"https://img.icons8.com/external-outline-icons-pause-08/64/000000/external-breakdown-insurance-outline-icons-pause-08.png"}, 
      ]
    };
  }

  clickEventListener = (isim) => {
    if(isim === 'Arıza'){ 
      isim = "A"
    }
    if(isim === 'Turistik Yerler'){ 
      isim = 'T'
    }
    if(isim === 'Restaurant/Kafe'){ 
      isim = 'R'
    }
    this.StoreKategori(isim);
    this.props.navigation.navigate('Paylasimlar');
  };

  StoreKategori = async(bolum) => {
    try {
        await AsyncStorageLib.setItem('bolum', bolum);
        const gelenBolum = await AsyncStorageLib.getItem("bolum");
    } catch (error) {
        alert(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.kategori)}}>
              
              <Image style={styles.image} source={{uri: item.image}}/>

                <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.kategori}</Text>
                    <Text style={styles.count}>{item.count}</Text>

                </View>
            
            </TouchableOpacity>
          )}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:1,
    backgroundColor:"#dce3dc"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:63,
    height:63,
    borderRadius:20,
    borderWidth:1,
    //borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:15,
    flex:1,
    alignSelf:'center',
    color:"#280c3d",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
}); 


export default AnaMenu;