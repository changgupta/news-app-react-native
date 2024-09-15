import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [searchQuery, setsearchQuery] = useState("");
  
  const getBreakingNews = async () => { 
    try 
    {
      const URL =  `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=in&language=en&image=1&size=5`;
      const response = await axios.get(URL);     
      if (response && response.data) {
        setBreakingNews(response.data.results)     
        setIsLoading(false);
      }
    }
    catch (err : any)
    {
      console.log('error message' + err.message);
    }

  }

   const getNews = async (category:string='') => { 
    try 
    {
      let categorystring = '';
      if (category.length !== 0) {
        categorystring=`&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=in&language=en&image=1&size=10${categorystring}`;
      const response = await axios.get(URL);     
      if (response && response.data) {
        setNews(response.data.results) 
      }
    }
    catch (err : any)
    {
      console.log('error message' + err.message);
    }

  }

  useEffect(() => { 
    getBreakingNews();
    getNews();
    
  }, []);

  const onCatChanged = (category: string) => {
    setNews([]);
    getNews(category);
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]} >
      <Header />
      <SearchBar withHorizontalPadding={true} setSearchQuery={setsearchQuery} />
      {isloading ? (
        <Loading size={'large'}/>
      ) : ( <BreakingNews newsList={breakingNews } />)}
      <Categories onCategoryChanged={onCatChanged} />
       <NewsList newsList={news}/>
      
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})