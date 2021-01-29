import React from 'react';
import {Text} from 'react-native-paper';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
    TextInput, View, AsyncStorage } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import FoodItem from '../Components/FoodItem';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';


class FoodLibrary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            token : null,
            foods: [],             
            
        };    
        this.loadFood = this.loadFood.bind(this);
        this.addFoodToMeal = this.addFoodToMeal.bind(this);

    }

    componentDidMount(){ 
      this.loadFood();   
    } 
    
    async loadFood() {
        
        this.setState({loading: true});
       
        await fetch('https://mysqlcs639.cs.wisc.edu/foods/', {
            method: 'GET',      
                 
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                foods: responseJson.foods,
                loading:false,
            });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });
        
    }

    async addFoodToMeal(fooditem) {
      
      const token =  await AsyncStorage.getItem('token');
      const mealId = this.props.navigation.getParam("mealId");

      await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + mealId + '/foods', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify({
              name: fooditem.name,              
              calories: fooditem.calories,
              protein: fooditem.protein,
              carbohydrates: fooditem.carbohydrates,
              fat: fooditem.fat,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.error("Error:" + error);
        }); 

        this.props.navigation.navigate('MealDetails');
        
    }
       
    render() {        
        return (            
            <FlatList
            data={this.state.foods}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData => (
                <FoodItem                  
                  title={itemData.item.name.toString()}
                  measure={itemData.item.measure.toString()}
                  calories={itemData.item.calories.toString()}
                  carbohydrates={itemData.item.carbohydrates.toString()}
                  protein={itemData.item.protein.toString()}   
                  fat={itemData.item.fat.toString()}               
                >
                  <Button
                    color="#C2185B"
                    title="Add to Meal"
                    onPress={() => {
                        this.setState({loading: true});
                        this.addFoodToMeal(itemData.item);
                      }
                    }                   
                  />
                  
                </FoodItem>
            )}
            />
            
        );
    }
} 
    
    

export default FoodLibrary;