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

  const MealFoodItem = props => {
     
    return (
        <Card style={styles.product}>
          <SafeAreaView style={styles.touchable}>            
              <View>
                
                <View >
                  <Text style={styles.title}>{props.title}</Text>
                  
                  <Paragraph>
                  <Text style={styles.subtitle}>Calories : {props.calories} </Text>                  
                  </Paragraph>
                  <Paragraph>
                  <Text style={styles.subtitle}>Protein : {props.protein} </Text>                  
                  </Paragraph>
                  <Paragraph>
                  <Text style={styles.subtitle}>Carbohydrates: {props.carbohydrates}</Text>                  
                  </Paragraph>
                  <Paragraph>
                  <Text style={styles.subtitle}>Fat : {props.fat} </Text>                  
                  </Paragraph>
                </View>
                
                <View >
                    <TouchableOpacity style={styles.actions}>
                  {props.children}
                  </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        paddingHorizontal: 20
      }
    });
    
    export default MealFoodItem;