import React,{Component} from 'react';
import * as Crypto from 'expo-crypto';
import AsyncStorageLib from '@react-native-async-storage/async-storage';


class Network extends React.Component {

            state ={
                ws_user : '...',
                ws_pwd : '...',
                nickname : '',
            }
            
            handleUser = (text) => {
                this.setState({ ws_user: text })
            }

            handlePwd = (text) => {
                this.setState({ ws_pwd: text })
            }
            

            handleNickname = (text) => {
                this.setState({ nickname : text })
            }


            encodeMyKeys = async() => {
                const asd = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256, this.state.ws_user + this.state.ws_pwd
                ).then(data => {
                    return data
                });
                return asd

            }

            StoreData = async(user) => {
                try {
                    this.setState.nickname = user;
                    await AsyncStorageLib.setItem("nick", user);
                } catch (error) {
                    alert("Storage Hatası", error);
                }
            }

            readNick = async () => {
                try {
                    const value = await AsyncStorageLib.getItem('nick');
                    if (value !== null) {
                      return value;
                    }
                } catch (e) {
                    console.log("readstore: ", e)
                    alert(e)
                }
              }

            doLogon = async(password,email) => {

                const myBodydata = JSON.stringify({
                    eposta : email,
                    passwd : password,
                    hashed : await this.encodeMyKeys(),
                    do : 'do-logon'
                })
                let res = await this.postData(myBodydata); //başarılı => nickNAme 6 token dönecek

                if(res){
                    this.StoreData(res.data);
                    return true;
                } else {
                    return false;
                }
            }

            doUserAdd = async(email, username, password) => { 
                // Register yapılacağı zaman kullanıcı bilgileri buraya gelir. Burada web server için body kısmı oluşturulup postData 
                // fonsksiyonuna gönderilir.
                const myBodydata2 = JSON.stringify({
                    eposta : email,
                    nick : username,
                    passwd : password,
                    hashed : await this.encodeMyKeys(),
                    do : 'do-register'
                })
                let doUserResult = await this.postData(myBodydata2);
            
                if(doUserResult){
                    return true;
                } else {
                    return false;
                }
            }

            getComments = async(id) => {

                const myBodydata = JSON.stringify({
                    py_id: id,
                    hashed : await this.encodeMyKeys(),
                    do : 'get-yorum'
                })
                let getCommentJson = await this.postData(myBodydata); 
                if(getCommentJson){
                    return getCommentJson;
                }if(getCommentJson.data ===null){
                    alert("Gosterilecek herhangi bir paylasim bulunmamaktadır.")
                }  
                else {
                    return false;
                }
            }

            setComments = async(id,setYorum) => {

                const myBodydata = JSON.stringify({
                    py_id: id,
                    yorum: setYorum,
                    nick: await this.readNick(),                    
                    hashed : await this.encodeMyKeys(),
                    do : 'do-yorum'
                })
                let setCommentJson = await this.postData(myBodydata); 
                if(setCommentJson){
                    return setCommentJson;
                }if(setCommentJson.data ===null){
                    alert("Gösterilecek herhangi bir paylaşım bulunmamaktadır.")
                }  
                else {
                    return false;
                }
            }


            createFormData = async(fotograf) => {
                const data = new FormData();
               
                data.append('dosya', {
                  name: 'photo',
                  type: 'jpg',
                  uri:
                    Platform.OS === 'android' ? fotograf.uri : fotograf.uri.replace('file://', ''),
                });
                console.log("1.createFormData: ",data)

                return data;
            };

            sharePhoto = async(aciklama,kategori,konum,fotograf) => {
                
                const myBodydata3 = JSON.stringify({
                    nick: await this.readNick(),
                    aciklama: aciklama,
                    kategori: kategori,
                    konum: konum,
                    dosya: await this.createFormData(fotograf),
                    hashed : await this.encodeMyKeys(),
                    do : 'do-share'
                })
                const form1 = await this.readNick()
                const form2 =  await this.encodeMyKeys()
                let formData = new FormData();
                formData.append('nick', form1)
                formData.append('aciklama', aciklama)
                formData.append('kategori', kategori)
                formData.append('konum', konum)
                formData.append('dosya', {uri: fotograf.uri, name: 'name1.jpg', type: 'image/jpg'})
                formData.append('hashed', form2)
                formData.append('do', 'do-share')

                let photoRes = await this.postDataImage(formData); 
                if(photoRes){
                    return true;
                } else {
                    return false;
                }
            }
            
            showShares = async(bolum) => {

                const myBodydata = JSON.stringify({
                    kategori: bolum,
                    hashed : await this.encodeMyKeys(),
                    do : 'get-shares'
                })
                let shareRes = await this.postData(myBodydata); 
                if(shareRes){
                    return shareRes;
                }if(shareRes.data ===null){
                    alert("Gösterilecek herhangi bir paylaşım bulunmamaktadır.")
                } 
                else {
                    return false;
                }
            }
            postData = async(pBodyData) => {
                //Gelen veriler web server a gönderilir.
                var URL = '...';

                try {
                    let response = await fetch(URL, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                                },
                        body: pBodyData
                    });

                    let responseJson = await response.json();
                            
                    if (responseJson.result == '1') {
                        return responseJson;
                    
                    } else {
                        alert(JSON.stringify(responseJson.error_txt));
                        return false;
                    }
                    
                } catch (error) {
                    console.log("CatchError", error)
                    alert( error);
                }
            }
            postDataImage = async(pBodyData) => {
                //Gelen veriler web server a gönderilir.
                var URL = '...';

                    let response = await fetch(URL, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'content-type': 'multipart/form-data',
                        },
                        body: pBodyData
                    });
                    let responseJson = await response.json();
                    if (responseJson.result == '1') {
                        return responseJson;
                    
                    } else {
                        alert(JSON.stringify(responseJson.error_txt));
                        return false;
                    }
                    
            }
            

}

const yardimci = new Network();
export default yardimci;