import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
    const{ top:safeTop}=useSafeAreaInsets();
  return (
    <View style={styles.container} >
          <View style={styles.userInfo}>
              <Image source={require('@/assets/images/chandan_profile.jpg')} style={styles.usrImg} />
              <View>
                  <Text style={styles.welcomeTxt}>Welcome</Text>
                  <Text style={styles.userName}>Chandan !</Text> 
              </View>
          </View>
          <View>
              <TouchableOpacity>
                      <Ionicons name='notifications-outline' size={24} color={Colors.black}/>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {       
        paddingHorizontal: 20,      
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    usrImg: {
        width: 50,
        height: 50,
        borderRadius:30
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',      
        gap:10
    },
    welcomeTxt: {
        fontSize: 12,
        color:Colors.darkGrey   
    },
    userName: {
        fontSize: 14,
        fontWeight:'700',
        color:Colors.black   
    }
})