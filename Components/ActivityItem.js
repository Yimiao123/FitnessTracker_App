import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
  } from 'react-native';
import { Paragraph } from 'react-native-paper';

  import Card from './UI/Card';

  const ActivityItem = props => {
     
    return (
        <Card style={styles.product}>
          <SafeAreaView style={styles.touchable}>            
              <View>
                
                <View >
                  <Text style={styles.title}>{props.title}</Text>
                  <Paragraph>
                  <Text style={styles.subtitle}>Duration : {props.duration} min </Text>                  
                  </Paragraph>
                  <Paragraph>
                  <Text style={styles.subtitle}>Date : {props.date}</Text>                  
                  </Paragraph>
                  <Paragraph>
                  <Text style={styles.subtitle}>Calories : {props.calories} Kcal</Text>                  
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
    
    export default ActivityItem;