import React from 'react';
import {
    View,
    Text,    
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    
  } from 'react-native';
import { Paragraph } from 'react-native-paper';

  import Card from './UI/Card';

  const MealItem = props => {
     
    return (
        <Card style={styles.product}>
          <SafeAreaView style={styles.touchable}>    
                <View >
                  <Text style={styles.title}>{props.title}</Text>
                  <View >                
                  <Paragraph>                  
                  <Text style={styles.subtitle}>Date : {props.date}</Text>                  
                  </Paragraph>                  
                  </View> 
                </View>                
                
                <View >
                    <TouchableOpacity style={styles.actions}>
                  {props.children}
                  </TouchableOpacity>
                </View>
          </SafeAreaView>
        </Card>
      );
    };
    
    const styles = StyleSheet.create({
      product: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignContent:'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        marginTop:10,
        
        marginLeft: 15,
        marginRight: 15,
        


      },
      touchable: {
        borderRadius: 10,
        overflow: 'visible'
      },
      
      details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
      },
      title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
      },
      subtitle: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
      },
      actions: {
        
        justifyContent: 'space-between',
        alignItems: 'center',
        
        paddingHorizontal: 20
      }
    });
    
    export default MealItem;