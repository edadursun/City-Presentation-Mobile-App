import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image, TextInput,Keyboard,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import yardimci from '../WebServer/Network';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import base64 from 'react-native-base64';
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'



const readStore = async () => {
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

export default function Fotografdeneme () {

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [aciklama, setAciklama] = useState(null);

  const navigation = useNavigation();

  const List = () => {
    li
  }

  const savePicture = async ()=>{
    
    let secilenKategori = await readStore();

    let newLocation = [];
    let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      newLocation.push((location.coords.latitude) , (location.coords.longitude));
      console.log("newLocation: ",JSON.stringify(newLocation))


    let resultPic = await yardimci.sharePhoto(aciklama,secilenKategori,JSON.stringify(newLocation),image);
    if (resultPic ==true){
      Alert.alert(
        "Paylaşım Başarılı",
        "Yapılan paylaşım başarılı bir şekilde kaydedilmiştir.",
        [
          {
            text: "Yeni Paylaşım",
            onPress: () => navigation.navigate("Fotografdeneme")
          },
          {
            text: "Geri Dön",
            onPress: () => navigation.navigate("Paylasimlar"),
            style: "cancel"
          }
        ]
      );
  
    }
  }

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === 'granted');
      
    })();
  }, []);

  
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync({quality: 0.1})
        
        if(data.uri){
          setImage(data);
        }

    
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasLocationPermission === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1,alignContent: 'center'}}>
          {!image && (
            <>
              <Camera
                  ref={ref => setCamera(ref)}
                  style={{flex:1}}
                  type={type}
                  ratio={'1:1'} >
                <View style={styles.alignCenter}>
                  <TouchableOpacity style={styles.button} onPress={() => takePicture()} >
                    <Icon name="md-camera-outline" size={40} color="white"/>
                  </TouchableOpacity>
                </View>
              </Camera>
            </>
            )}
          {image && (
            <View style={{ height: '100%' }}>
              <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setAciklama(text) }
                    multiline={true}
                  />
                  <Button title='Paylaş' onPress={() => [savePicture(image) ]}/>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
   );
 }
 const styles = StyleSheet.create({
   cameraContainer: {
       flex: 1,
       flexDirection: 'row'
   },
   fixedRatio:{
       flex: 1,
       aspectRatio: 1
   },
   input: {
    margin: 15,
    height: 40,
    borderWidth: 0.5
 
   },
   button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    },
   socialBarButton:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
 })
 