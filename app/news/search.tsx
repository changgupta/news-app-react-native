import { FlatList,StyleSheet, Text, View,ScrollView, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'



type Props = {}

const Page = (props: Props) => {

    const {query,category,country } = useLocalSearchParams<{
        query:string,category:string,country:string
    }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isloading, setIsLoading] = useState(true);
    

    const getNews = async () => { 
    try 
    {
      let categorystring = '';
      let countrystring = '';
      let querystring= '';
      if (category) {
        categorystring=`&category=${category}`
        }
        if (country) {
        countrystring=`&country=${country}`
        }
        if (query) {
        querystring=`&q=${query}`
      }
        const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&image=1&size=10${categorystring}${countrystring}${querystring}`;
       
      const response = await axios.get(URL);     
      if (response && response.data) {
          setNews(response.data.results) 
          setIsLoading(false)
      }
    }
    catch (err : any)
    {
      console.log('error message' + err.message);
    }

    }

    useEffect(() => {
        getNews();
    },[])
    

    return (
        <>
         <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} />
                    </TouchableOpacity>),
                // headerRight: () => (
                //     <TouchableOpacity onPress={() => { }}>
                //         <Ionicons name='heart-outline' size={22} />
                //     </TouchableOpacity>),
                title:'Search'
            }} />
            <View style={styles.container}>
             
            {isloading ? <Loading size={'large'} /> : 
                    (
                        <FlatList data={news} keyExtractor={(_, index) => `list_item${index}`}
                            showsVerticalScrollIndicator={false}                          
                            renderItem={({ index, item }) => {
                                return (
                                 <Link href={`../news/${item.article_id}`} asChild key={index}>
                                    <TouchableOpacity>
                                     <NewItems item={item} />
                                     </TouchableOpacity>
                                </Link>)
                          }}
                            


                        />

                )  
                 
             }   
            </View>
        
        </>
    )
}

export default Page

export const NewItems = ({item }:{item:NewsDataType}) => (
    
     <View  style={styles.itemContainer}>
                  <Image source={{ uri: item.image_url }} style={styles.itemImg} />
                  <View style={styles.itemInfo}>
                  <Text style={styles.itemcategory}>{item.category}</Text>
                      <Text style={styles.itemtitle}>{item.title}</Text>    
                      <View style={styles.itemSourceInfo}>
                          <Image source={{uri:item.source_icon}} style={styles.itemSourceImg} />
                          <Text style={styles.itemSourceName}>{item.source_name}</Text>
                      </View>    
                  </View>
              </View>
)

const styles = StyleSheet.create({
    container: {
      flex:1,
        marginHorizontal: 10,
      marginVertical:20
    },
        contentContainer: {       
        paddingHorizontal: 20,
        paddingBottom:30
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        gap:10
    },
    itemImg: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight:10
    },
    itemInfo: {
        flex: 1,
        gap: 5,
        justifyContent:'space-between'
    },
    itemcategory: {
        fontSize: 13,
        color: Colors.darkGrey,
        textTransform:'capitalize'
    },
    itemtitle: {
        fontSize: 14,
        fontWeight:'600',
        color: Colors.black       
    },
    itemSourceInfo: {
        flexDirection: 'row',
        gap: 8,
        alignItems:'center'
    },
    itemSourceImg: {
        width: 20,
        height: 20,
        borderRadius:20
    },
    itemSourceName: {
        fontSize: 12,
        fontWeight: '400',
        color:Colors.darkGrey
    }
});