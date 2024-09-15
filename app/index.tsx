import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";


const Page = () => {
  const router = useRouter();  
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <ImageBackground source={require('@/assets/images/getting-started.jpg')} 
        style={{ flex: 1 }} resizeMode='cover'>
        <View style={styles.wrapper}>
          <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>
          Stay Updated !
          </Animated.Text>
          <Animated.Text style={styles.description} entering={FadeInRight.delay(700).duration(500)}>
         Get breaking new and persionalize updates directly to your feed.
          </Animated.Text>
          <Animated.View>
        <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText} >Go to Home Screen</Text>
        </TouchableOpacity>
        </Animated.View>
    
    </View>
       </ImageBackground>
    
      
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {  
    flex:1,
    justifyContent:'flex-end',
    paddingHorizontal:30,
    gap:10,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  title:{
    color:Colors.white,
    fontSize:24,
    fontWeight:'600',
    letterSpacing:1.5,
    lineHeight: 36,
     textAlign:'center'
  },
  description: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.1,
    lineHeight: 22,
    textAlign:'center'
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius:10
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  }
});
