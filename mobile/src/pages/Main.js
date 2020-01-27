import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View,Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

function Main({ navigation }){

  const [currentRegion,getCurrentRegion] = useState(null)

  useEffect(()=>{
    async function loadInitialPosition(){
     const { granted } = await requestPermissionsAsync()
     if(granted){
       const {coords} = await getCurrentPositionAsync({
         enableHighAccuracy:true
       })
       const { latitude, longitude } = coords;

       getCurrentRegion({
         latitude,
         longitude,
         latitudeDelta:0.04,
         longitudeDelta:0.04
       })
     }
    }
    loadInitialPosition()
  },[])

  if(!currentRegion){
    return null
  }

  return (
    <>
    <MapView initialRegion={currentRegion} style={styled.map}>
      <Marker coordinate={{ latitude: -20.4995158, longitude: -54.5967255 }}>
        <Image
          style={styled.avatar}
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/5659433?s=460&v=4'
          }}
        />
        <Callout onPress={()=>{
          navigation.navigate('Profile',{ github_username: 'GilsonSantoss'})
        }}>
          <View style={styled.callout}>
            <Text style={styled.devName}>Gilson Santos</Text>
            <Text style={styled.devBio}>Bio</Text>
            <Text style={styled.devTech}>Techs: Vuejs React, React-Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
     <View style={styled.form}>
      <TextInput 
      style={styled.searchInput}
      placeholder="Buscar devs por techs..."
      placeholderTextColor="#999"
      autoCapitalize="words"
      autoCorrect={false}>
      </TextInput>

      <TouchableOpacity onPress={()=>{}} style={styled.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF"/>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styled = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#7d40e7"
  },
  callout: {
    width: 250,
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 8
  },
  devName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#999",
    marginTop: 5
  },
  devTech: {
    color: "#666",
    marginTop: 5
  },
  form: {
    position:'absolute',
    flexDirection:'row',
    bottom:20,
    right:20,
    zIndex:5,
    left:20,
  },
  searchInput: {},
  loadButton:{
    width:48,
    height:48
  }
});

export default Main