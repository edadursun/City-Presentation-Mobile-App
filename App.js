import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GirisYapma from "./Screens/giris_yapma";
import AnaMenu from "./Screens/ana_menu";
import KayitOlma from "./Screens/Kayit_Ol";
import Paylasimlar from "./Screens/Paylasimlar";
import YorumlarClass from "./Screens/youmlar_class";
import Fotografdeneme from "./Screens/fotografdeneme";
import { Button } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native'
import yardimci from "./WebServer/Network";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const navigation = useNavigation();
  return(
    <Stack.Navigator >
        <Stack.Screen name= "GirisYapma"        component={GirisYapma} options={{ title: 'Giriş Yap', headerBackTitle: ''}}/>
        <Stack.Screen name= "KayitOlma"         component={KayitOlma} options={{ title: 'Kayıt Ol', headerBackTitle: '' }}/>
        <Stack.Screen name= "AnaMenu"           component={AnaMenu} options={{ title: 'Ana Menü', headerBackTitle: '', headerBackVisible:false,
          headerRight: () => (
            <Button onPress={() => {navigation.navigate("GirisYapma")}}
            title = 'Çıkış Yap' 
            color="#fff"
            />
          ) 
          }}/>
        <Stack.Screen name= "Fotografdeneme"    component={Fotografdeneme} options={{ title: 'Fotoğraf Çek', headerBackTitle: ''}}/>
        <Stack.Screen name= "Paylasimlar"       component={Paylasimlar} options={{
          title: 'Paylaşımlar',
          headerBackTitle: '',
          headerRight: () => (
            <Button
              onPress={() => {navigation.navigate("Fotografdeneme" )}}
              title="Paylaş"
              color="#fff"
            />
          ),
        }}
        />
        <Stack.Screen name= "YorumlarClass"           component={YorumlarClass}/>

      
    </Stack.Navigator>
  );
};

const App = () => {
  return(
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
};

export default App;

