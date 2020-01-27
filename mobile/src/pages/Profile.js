import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import WebView from 'react-native-webview'

function Profile({ navigation }){
  const githubUsername = navigation.getParam('github_username')
  return (
    <WebView
      style={styled.wrapper}
      source={{ uri: `https://github.com/${githubUsername}` }}
    ></WebView>
  );
}

const styled = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor:'#F2F2F2',
    justifyContent:'center',
  }
})

export default Profile