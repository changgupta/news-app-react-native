import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { NewItems } from '../news/search';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors'
import { useIsFocused } from '@react-navigation/native';

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setbookmarkNews] =  useState<NewsDataType[]>([]);
  const [isloading, setIsLoading] = useState(true);
   const isFocused = useIsFocused();
  
  const fetchBookmark = async () => {
    try {
        // Retrieve the bookmark data from AsyncStorage
        const token = await AsyncStorage.getItem("bookmark");
        setIsLoading(true);
        // Initialize bookmarks as an empty array if token is null
        let bookmarks: string[] = [];
        if (token) {
            try {
                // Parse the JSON token if it's not null
                bookmarks = JSON.parse(token);
                if (!Array.isArray(bookmarks)) {
                    // Ensure that the parsed result is an array
                    bookmarks = [];
                }
            } catch (error) {
                // Handle JSON parsing errors
                console.error("Error parsing JSON:", error);
                bookmarks = [];
            }
        }

        // If bookmarks are available, make the API request
        if (bookmarks.length > 0) {
          const querystring = bookmarks.join(',');          
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&id=${querystring}`;
 
            try {
                const response = await axios.get(URL);                
                if (response && response.data) {
                    setbookmarkNews(response.data.results);
                } else {
                    setbookmarkNews([]);
                }
            } catch (error) {
                console.error("Error fetching bookmark news:", error);
                setbookmarkNews([]);
            }
        } else {
            // If no bookmarks, set an empty list
            setbookmarkNews([]);
        }
        
        // Update loading state
        setIsLoading(false);

    } catch (error) {
        // Handle any errors that might occur during the async operations
        console.error("Error in fetBookmark function:", error);
        setbookmarkNews([]);
        setIsLoading(false);
    }
  };
  
  useEffect(() => {
   
    fetchBookmark();
  }, [isFocused])
  
  return (

    <>
      <Stack.Screen options={{
          headerShown:true
        }} />
            <View style={styles.container}>
             
            {isloading ? <Loading size={'large'} /> : 
                    (
                        <FlatList data={bookmarkNews} keyExtractor={(_, index) => `list_item${index}`}
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


const styles = StyleSheet.create({
    container: {
      flex:1,
      margin:20
    }      
});