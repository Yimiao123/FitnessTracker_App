import React from 'react';
import {Text} from 'react-native-paper';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
    TextInput, View, AsyncStorage } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import MealItem from '../Components/MealItem';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';
import DatePicker from 'react-native-datepicker';



class MealView extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            token : null,
            meals: [],
            
            
        };
        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);


    }    



    static navigationOptions = ({ navigation }) => {
        return {               
            headerTitle: 'Your Meals',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  accessible={true}
                  accessibilityHint="Double click me to log out"
                  iconName='ios-exit'
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  accessible={true}
                  accessibilityHint="Double click me to add more meals"
                  iconName='ios-add'
                  onPress={() => {
                    navigation.navigate('CreateMeal');
                  }}
                />
              </HeaderButtons>            
            ),
        };
          
    };

    async componentDidMount(){
        const token = await AsyncStorage.getItem('token');
        
        this.setState({token: token});
        this.setState({loading: true});
       
        await fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
            method: 'GET',
            headers: {'x-access-token': this.state.token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                meals: responseJson.meals,
                
            });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            await fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
                method: 'GET',
                headers: {'x-access-token': this.state.token},
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({meals: responseJson.meals});
            })
            .catch((error) => {
                console.error("Error:" + error);
            });
        });
    }

    editHandler(curId, curName, Date) {
        this.props.navigation.navigate('EditMeal', {          
          id: curId,
          name: curName,          
          date: Date,
          
        });
    }

    async deleteHandler(id) {
    
        await fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id, {
            method: 'DELETE',
            headers: {'x-access-token': this.state.token},
          })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });  

        await fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
            method: 'GET',
            headers: {'x-access-token': this.state.token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                meals: responseJson.meals,
                loading:false,
            });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });   

        
          
    }  
    

   
    render() {
      console.log(this.state.meals);
        
        return (            
            <FlatList accessible={false}
            data={this.state.meals}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData => (
                <MealItem                 
                  title={itemData.item.name.toString()}                  
                  date={itemData.item.date.toString()}                  
                                                
                >
                  <Button
                    
                    color="#C2185B"
                    title="Meal Details"
                    accessibilityLabel="meal Details"
                    
                    onPress={() => {
                      
                      this.props.navigation.navigate({
                        routeName:'MealDetails',
                        params:{
                          mealId:itemData.item.id,
                          
                        }
                      });
                    }}                    
                   />
                  <Button
                  
                    color="#C2185B"
                    title="Edit"
                    onPress={() => {
                        this.editHandler(itemData.item.id, itemData.item.name, itemData.item.date)
                      }}                    
                  />
                  <Button
                    color="#C2185B"
                    title="Delete"
                    onPress={() => {
                        this.deleteHandler(itemData.item.id)
                    }}                    
                   />
                </MealItem>
            )}
            />
            
        );
    }
}         
    
    

export default MealView;