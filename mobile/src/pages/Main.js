import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View,Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

function Main({ navigation }){
  const [devs,setDevs] = useState([])
  const [currentRegion,setCurrentRegion] = useState(null)
  const [techs,setTechs] = useState('')

  useEffect(()=>{
    async function loadInitialPosition(){
     const { granted } = await requestPermissionsAsync()
     if(granted){
       const {coords} = await getCurrentPositionAsync({
         enableHighAccuracy:true
       })
       const { latitude, longitude } = coords;

       setCurrentRegion({
         latitude,
         longitude,
         latitudeDelta:0.04,
         longitudeDelta:0.04
       })
     }
    }
    loadInitialPosition()
  },[])

  async function loadDevs(){ 
    const { latitude, longitude } = currentRegion
    const response = await api.get('/search', {
      params:{
        latitude,
        longitude,
        techs
      }
    })
    console.log(response.data)
    setDevs(response.data)
  }

  function handleRegionChanged(region){
    setCurrentRegion(region)
  }

  if(!currentRegion){
    return null
  }

  return (
    <> 
      <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styled.map}>
        {devs.map(dev => (
            <Marker
              key={dev._id}
              coordinate={{ 
                latitude: dev.location.coordinate[1],
                longitude: dev.location.coordinate[0]
              }}>
          <Image
            style={styled.avatar}
            source={{
              uri: dev.avatar_url
            }}
          />
          <Callout onPress={()=>{
            navigation.navigate('Profile', {
              github_username: dev.github_username
            })
          }}>
            <View style={styled.callout}>
              <Text style={styled.devName}>{ dev.name }</Text>
              <Text style={styled.devBio}>{dev.bio}</Text>
              <Text style={styled.devTech}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
          ))
        }
      </MapView>
     <View style={styled.form}>
          <TextInput 
          style={styled.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}>
          </TextInput>
          <TouchableOpacity onPress={loadDevs} style={styled.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF" />
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
    top:20,
    right:20,
    zIndex:5,
    left:20,
  },
  searchInput: {
    flex:1,
    height:50,
    backgroundColor: "#FFF",
    color:"#333",
    borderRadius:25,
    paddingHorizontal:20,
    fontSize:16,
    shadowColor:"#000",
    shadowOpacity:.2,
    shadowOffset:{
      width:4,
      height:4
    },
    elevation:2,
  },
  loadButton:{
    width:48,
    height:48,
    color:"#fff",
    backgroundColor:"#8e4dff",
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    marginLeft:15,
    shadowColor: "#000",
    shadowOpacity: .2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,

  }
});

export default Main