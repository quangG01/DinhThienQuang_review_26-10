import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function App() {
  const [category, setCatergory] = useState(
    [
      {id:1, name :'Resort',image: require("./assets/baiTH4/resort.png")},
      {id:2, name :'Home Stay',image: require("./assets/baiTH4/homestay.png")},
      {id:3, name :'Hotel',image: require("./assets/baiTH4/hotel.png")},
      {id:4, name :'Logde',image: require("./assets/baiTH4/lodge.png")},
      {id:5, name :'Villa',image: require("./assets/baiTH4/villa.png")},
      {id:6, name :'Apartment',image: require("./assets/baiTH4/apartment.png")},
      {id:7, name :'Hostel',image: require("./assets/baiTH4/hostel.png")},
      {id:8, name :'see all',image: require("./assets/baiTH4/seeall.png")}
    ]);
    
  const [location, setLocation] = useState(
    [
      {id:1,image: require("./assets/baiTH4/photo1.png")},
      {id:2,image: require("./assets/baiTH4/photo2.png")},
      {id:3,image: require("./assets/baiTH4/photo3.png")},
      {id:4,image: require("./assets/baiTH4/photo4.png")},
      {id:5,image: require("./assets/baiTH4/photo5.png")},    
    ]);
  const [categoryAPI, setCatergoryAPI] =useState([]);
  const [locationAPI, setLocationAPI] = useState([]);
  useEffect(() => {
    getCategories();
    getLocation();
  },[]);

  const getCategories = async () =>{
    console.log("getCategories function called");
    try{
      const res = await axios.get("https://6459b10395624ceb21ed9e1c.mockapi.io/Categories");
      console.log("Data fetched:", res.data);
      if(Array.isArray(res.data)){
        setCatergoryAPI(res.data);
      }else{
        console.log("Du lieu ko phai la mang:", res.data);
      }
    }catch(error){
      console.log("API fetch error:", error);
    }
  };
  
  const getLocation = async () => {
    try{
      const res = await axios.get("https://6459b10395624ceb21ed9e1c.mockapi.io/Location");
      setLocationAPI(res.data);
    }catch(error){
      console.log("API fetch error:", error);
    }
  };



  return(
    <SafeAreaView style= {{flex:1}}>
      <ScrollView>
      <View style = {{backgroundColor : "#5958b2", height:200, justifyContent:'center', paddingHorizontal:30, rowGap:30}}>
        <View style= {{ flexDirection: 'row'}}>
        <Image style = {{width:40,height:40,borderRadius:20}}  source = {require("./assets/baiTH4/logoicon.png")} />
          
          <View style ={{flexDirection :'row', alignItems:'center',backgroundColor:'white', borderRadius: '30px', marginLeft:5, justifyContent:'space-between',flex :1}}>
              <TextInput placeholder = "search here" style = {{paddingLeft:20 , color : 'gray', flex: 1, height:'100%'}}/>
              <Image source = {require("./assets/baiTH4/findicon.png")}/>
          </View>

        </View>
        <View style = {{flexDirection:"row", justifyContent:'space-between'}}>
          <View style = {{flexDirection:"row"}}>
            <Image source ={require("./assets/baiTH4/personicon.png")} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <View>
              <Text style = {{fontWeight :'bold',color :'white'}} > Welcome! </Text>
              <Text style = {{color :'white'}} > Donna Stroupe </Text>
            </View>
          </View>
        
        
            <View>
              <Image source={require("./assets/baiTH4/ringicon.png")} style ={{widthL:40 , height:40}}/>  
            </View>
        </View>
      </View>

      <View>
      <View style ={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style ={{ fontSize: 20}}> Category</Text>
    <Image source = {require('./assets/baiTH4/3gach.png')} style = {{ height: 40, width: 40 }} />
      </View>

      <FlatList 
        data = {categoryAPI}

        renderItem = {({ item }) =>{
          console.log(item);
          return(
            <View style ={{ alignItems: 'center', padding: 5,flex:1 }}>
            <Image source = {{ uri : item.image}} style ={{width:40,height:40}}/>
            <Text>{item.name} </Text>
            </View>
          );
        }}
        numColumns = {4}
        />
    </View>

      <View>
        <View style = {{flexDirection :'row', margin:20, justifyContent:'space-between', alignItems:'center'}}>
          <text style ={{ fontSize: 20 }}> Popular destination</text>
          <Image source= {require('./assets/baiTH4/3gach.png')} style = {{ height: 40, width: 40 }}/>
        </View>
          <FlatList 
            data = {locationAPI}

            renderItem = {({ item }) =>(
                    <View style ={{ padding : 5  }}>
                      <Image source = {item.image} style={{ width: 100, height: 100, padding: 5, borderRadius: 10 }}/>
                      <Text>{item.name} </Text>
                    </View> 
            )}
            horizontal = {true}
        />
        
      </View>
      <View>
          <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Recommended</Text>
          </View>

          <FlatList
            data={locationAPI}
            keyExtractor={item => item.id.toString()} 
            renderItem={({ item }) => (
              <View style={{ padding: 5 }}>
                <Image source={item.image} style={{ width: 155, height: 200, padding: 5, borderRadius: 10 }} />
              </View>
            )}
            horizontal = {true}
          />
      </View>
      <View style = {{backgroundColor:'#5958b2' , height :100, justifyContent:'space-between', paddingHorizontal:30, flexDirection:'row', alignItems:'center'}}>
          <View>
            <Image source={ require("./assets/baiTH4/homeicon.png")} style ={{width:30, height:30}}  />
            <Text style = {{color:"#fff",fontSize :15}}>Home</Text>
          </View>

          <View>
            <Image source={ require("./assets/baiTH4/exploreicon.png")} style ={{width:30, height:30}}  />
            <Text style = {{color:"#fff",fontSize :15}}>Explore</Text>
          </View>

          <View>
            <Image source={ require("./assets/baiTH4/searchicon.png")} style ={{width:30, height:30}}  />
            <Text style = {{color:"#fff",fontSize :15}}>Search</Text>
          </View>

          <View>
            <Image source={ require("./assets/baiTH4/profileicon.png")} style ={{width:30, height:30}}  />
            <Text style = {{color:"#fff",fontSize :15}}>Profile</Text>
          </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  );
}































const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#5958b2',
    },
    rowContainer1: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer2: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 35,
        width: '65%',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    logoImg: {
        height: 40,
        width: 40,
        marginLeft: 40,
    }
});
