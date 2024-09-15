import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import CheckBox from '@/components/CheckBox'
import { UseNewsCategories } from '@/hooks/UseNewsCategories';
import { UseNewsCountries } from '@/hooks/UseNewsCountries';
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = UseNewsCategories();
  const { newsCountries, toggleNewsCountry } = UseNewsCountries();
  const [searchQuery, setsearchQuery] = useState("");
  const [category,setcategory]= useState("");
  const [country,setcountry]= useState("");
  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>      
      <SearchBar withHorizontalPadding={false}
      setSearchQuery={setsearchQuery}
      />
      <View style={{paddingHorizontal: 20,}}>
   <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item,index) => (

          <CheckBox key={item.id} label={item.title} checked={item.selected}
            onPress={() => { 
              toggleNewsCategory(item.id)
              setcategory(item.slug);
            }} />
        ))}
        </View>
         <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item,index) => (

          <CheckBox key={index} label={item.name} checked={item.selected}
            onPress={() => { 
              toggleNewsCountry(index);
              setcountry(item.code)
            }} />
        ))}
        </View>

        <Link href={{
          pathname: `../news/search`,
          params:{query:searchQuery,category,country}
        }} asChild
        >
          <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnTxt}>Search </Text>
        </TouchableOpacity>
        </Link>
        
        
      </View>
      
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    //paddingHorizontal:20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom:20
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical:10
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight:'600'
  }
})