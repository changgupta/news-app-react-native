import { StyleSheet, View,Text, TouchableOpacity, ScrollView,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { NewsDataType } from '@/types'
import Loading from '@/components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'


type Props = {}

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{id: string}> ();
  const [news, setNews] = useState<NewsDataType[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [bookmark, setbookmark] = useState(false);
    
    const getNews = async (category:string='') => { 
    try 
    {
      let categorystring = '';
      if (category.length !== 0) {
        categorystring=`&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&id=${id}`;
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


    const saveBookmark = async (newsId: string) => {
        setbookmark(true)
        await AsyncStorage.getItem("bookmark").then((token : any) => {
            const res = JSON.parse(token);
            if (res != null) {
                let data = res.find((value: string) => value === newsId);
                if (data == null) {
                    res.push(newsId)
                    AsyncStorage.setItem("bookmark", JSON.stringify(res));
                    alert("Bookmark added !")
                }
            }
            else {
                let bookMark = [];
                bookMark.push(newsId);
                 AsyncStorage.setItem("bookmark", JSON.stringify(res));
                    alert("Bookmark added !")
            }
        });
    }

    const removeBookmark = async (newsId: string) => {
    try {
        // Set bookmark to false (assuming this is a state update or similar action)
        setbookmark(false);

        // Retrieve bookmark data from AsyncStorage
        const token = await AsyncStorage.getItem("bookmark");

        // Initialize bookMark to an empty array if token is null or empty
        let bookMark: string[] = [];
        
        if (token) {
            try {
                // Parse the JSON token if it's not null
                bookMark = JSON.parse(token);
                if (!Array.isArray(bookMark)) {
                    // Ensure that the parsed result is an array
                    bookMark = [];
                }
            } catch (error) {
                // Handle JSON parsing errors
                console.error("Error parsing JSON:", error);
                bookMark = [];
            }
        }

        // Filter out the newsId from the bookmark array
        bookMark = bookMark.filter((id: string) => id !== newsId);

        // Save the updated bookmark array back to AsyncStorage
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookMark));

        // Notify the user
        alert("Bookmark removed!");
    } catch (error) {
        // Handle any errors that might occur during the async operations
        console.error("Error removing bookmark:", error);
        alert("Failed to remove bookmark. Please try again.");
    }
};

    const renderBookmark = async (newsId: string) => {
        await AsyncStorage.getItem("bookmark").then((token: any) => {
            const res = JSON.parse(token);
             if (res != null) {
                let data = res.find((value: string) => value === newsId);
                return data == null ? setbookmark(false) : setbookmark(true)
            }
        })
    }
    
    useEffect(() => {
        getNews();
    },[])
    
     useEffect(() => {
         if (!isloading) {
            renderBookmark(news[0].article_id)
        }
         
     }, [isloading])
    
    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} />
                    </TouchableOpacity>),
                headerRight: () => (
                    <TouchableOpacity onPress={() => bookmark ? removeBookmark(news[0].article_id) : saveBookmark(news[0].article_id)}>
                        <Ionicons name={bookmark ? "heart" : "heart-outline"} size={22} color={bookmark ? "red" : Colors.black}/>
                    </TouchableOpacity>),
                title:''
            }} />

            {isloading ? <Loading size={'large'}/> : (
               <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <Text style={styles.title}>{news[0].title} </Text>
                    <View style={styles.newsInfoWrapper}>
                        <Text style={styles.newsInfo}> {news[0].pubDate} </Text>
                        <Text style={styles.newsInfo}> { news[0].source_name} </Text>
                    </View>
                     <Image source={{uri:news[0].image_url}} style={styles.newsImg} />
                   <Text>{news[0].content} </Text> 
               </ScrollView>                
                
            )    
                }
      </>
  
  )
}

export default NewsDetails 

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: Colors.white,       
    },
    contentContainer: {       
        paddingHorizontal: 20,
        paddingBottom:30
    },
    newsImg: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius:10
    },
    newsInfo: {
        fontSize: 12,
      color:Colors.darkGrey   
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
        letterSpacing:0.6
    },
    newsInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      marginBottom:20
    }
   
})