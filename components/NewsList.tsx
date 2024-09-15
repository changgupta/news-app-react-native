import { StyleSheet, View,Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import Loading from './Loading'
import { Link } from 'expo-router'
import { NewItems } from '@/app/news/search'


type Props = {
    newsList:NewsDataType[]
}

const NewsList = ({ newsList }: Props) => {
  
  return (
      <View style={styles.container} >
          {newsList.length ==0 ?  <Loading size={'large'}/>  : newsList.map((item, index) => (            
             
               <Link href={`../news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity>
                       <NewItems item={item}/>
                      {/* <View  style={styles.itemContainer}>
                  <Image source={{ uri: item.image_url }} style={styles.itemImg} />
                  <View style={styles.itemInfo}>
                  <Text style={styles.itemcategory}>{item.category}</Text>
                      <Text style={styles.itemtitle}>{item.title}</Text>    
                      <View style={styles.itemSourceInfo}>
                          <Image source={{uri:item.source_icon}} style={styles.itemSourceImg} />
                          <Text style={styles.itemSourceName}>{item.source_name}</Text>
                      </View>    
                  </View>
              </View> */}
                      </TouchableOpacity>
                  </Link>
          
              


        ))}
    </View>
  )
}

export default NewsList

const styles = StyleSheet.create({
  container: {
        marginHorizontal: 20,
      marginBottom:50
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
})