import { StyleSheet, View,TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'


type Props = {
    withHorizontalPadding: boolean,
    setSearchQuery:Function
}

const SearchBar = ({ withHorizontalPadding,setSearchQuery}: Props) => {
  
  return (
      <View style={[styles.container,withHorizontalPadding  && {paddingHorizontal:20}]}  >
          <View style={ styles.searchBar}>
              <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
              <TextInput placeholder='Search' placeholderTextColor={Colors.lightGrey} style={styles.searcTxt}
                  autoCapitalize='none'
              onChangeText={query=>setSearchQuery(query)}
              />
          </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
      padding: 10,
      marginBottom:2
    // marginHorizontal:10
    },
    searchBar: {
        backgroundColor: '#E4E4E4',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: 'row',
        gap:5
    },
    searcTxt: {
        fontSize: 14,
        flex: 1,
        color:Colors.darkGrey
    }
})