import React, {Fragment} from "react";
import { FlatList } from 'react-native-gesture-handler';
import MealFoodItem from '../Components/MealFoodItem';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';

import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
    TextInput, View, AsyncStorage } from "react-native";
import {Card, Paragraph} from 'react-native-paper';

class MealDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            foods:[],
            filteredCarbon: 0,
            filteredFat:0,
            filteredProtein: 0,
            filteredCalories:0,
        };        
        this.update = 0; 
        this.mealId = this.props.navigation.getParam('mealId');  
        this.card = this.card.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }    

    static navigationOptions = ({ navigation }) => {
        return {               
            headerTitle: 'Meal Details',
            
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  iconName='ios-add'
                  onPress={() => {
                    navigation.navigate('FoodLibrary', {mealId: navigation.getParam('mealId')});
                  }}
                />
              </HeaderButtons>            
            ),
        };          
    };
    
    async componentDidMount() { 
            
        
        const token = await AsyncStorage.getItem('token');      
               

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            await fetch('https://mysqlcs639.cs.wisc.edu/meals/'+ this.mealId + '/foods', {
                method: 'GET',
                headers: {'x-access-token': token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let temp = responseJson.foods;
            let tempCalories = temp.map(data => data.calories).reduce((acc, data) => data + acc, 0);
            let tempCarb = temp.map(data => data.carbohydrates).reduce((acc, data) => data + acc, 0); 
            let tempFat = temp.map(data => data.fat).reduce((acc, data) => data + acc, 0);
            let tempProtein = temp.map(data => data.protein).reduce((acc, data) => data + acc, 0);     
            this.setState({
                foods: responseJson.foods,
                filteredCarbon: tempCarb,
                filteredFat: tempFat,
                filteredProtein: tempProtein,
                filteredCalories: tempCalories,
                
                });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });
    });
    }    


    async deleteHandler(id) {     
        const token = await AsyncStorage.getItem('token');     
        await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.mealId + '/foods/' + id, {
            method: 'DELETE',
            headers: {'x-access-token': token},
          })
          .then((response) => response.json())   
          .then((responseJson) => {
            alert(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });  

          await fetch('https://mysqlcs639.cs.wisc.edu/meals/'+ this.mealId + '/foods', {
            method: 'GET',
            headers: {'x-access-token': token},
    })
    .then((response) => response.json())
    .then((responseJson) => {
        let temp = responseJson.foods;
        let tempCalories = temp.map(data => data.calories).reduce((acc, data) => data + acc, 0);
        let tempCarb = temp.map(data => data.carbohydrates).reduce((acc, data) => data + acc, 0); 
        let tempFat = temp.map(data => data.fat).reduce((acc, data) => data + acc, 0);
        let tempProtein = temp.map(data => data.protein).reduce((acc, data) => data + acc, 0);     
        this.setState({
            foods: responseJson.foods,
            filteredCarbon: tempCarb,
            filteredFat: tempFat,
            filteredProtein: tempProtein,
            filteredCalories: tempCalories,
            
            });
    })
    .catch((error) => {
        console.error("Error:" + error);
    });      
    }


    card() {
        return (
            <FlatList
            data={this.state.foods}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData => (
                <MealFoodItem                  
                  title={itemData.item.name.toString()}                  
                  calories={itemData.item.calories.toString()}
                  carbohydrates={itemData.item.carbohydrates.toString()}
                  protein={itemData.item.protein.toString()}   
                  fat={itemData.item.fat.toString()}               
                >
                  <Button
                    color="#C2185B"
                    title="Delete"
                    onPress={() => {
                        this.deleteHandler(itemData.item.id)
                    }}                  
                  />
                  
                </MealFoodItem>
            )}
            />

        )
    }


    
    render() { 
        
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding" enabled keyboardVerticalOffset={60}>        
            
               <SafeAreaView style={styles.safeContainer}>
               <Card>
                <Card.Title accessibilityRole='header' title="Meal Summary" />
                <Card.Content>                               
                <Paragraph>Total Calories: {this.state.filteredCalories.toFixed(1)}</Paragraph>
                <Paragraph>Total Protein: {this.state.filteredProtein.toFixed(1)}</Paragraph>                
                <Paragraph>Total carbohydrates: {this.state.filteredCarbon.toFixed(1)}</Paragraph>
                <Paragraph>Total Fat: {this.state.filteredFat.toFixed(1)}</Paragraph>
                </Card.Content> 
                </Card>
                {this.card()}
               </SafeAreaView>
               
            </KeyboardAvoidingView>

            
            
            
            
            
            
            
        );
    }





}

const styles = StyleSheet.create({
    
    containerView: {
      
      flex: 1,
      marginBottom: 30,
    },
    
    safeContainer: {
        flex: 1,
        marginBottom: 30,
    },
    header: {
      fontSize: 26,    
      fontWeight: 'bold',
      paddingVertical: 14,
      textAlign: 'center',
    },
});

export default MealDetails;