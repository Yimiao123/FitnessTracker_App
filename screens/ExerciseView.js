import React from 'react';
import {Text} from 'react-native-paper';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
    TextInput, View, AsyncStorage } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import ActivityItem from '../Components/ActivityItem';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';



class ExerciseView extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            token : null,
            activities: [],  
            reload: false,                
        };
        
        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {               
            headerTitle: 'Your Activities',
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"                  
                  
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
                  iconName='ios-add'
                  onPress={() => {
                    navigation.navigate('CreateExercise');
                  }}
                />
              </HeaderButtons>            
            ),
        };
          
    };

    componentDidMount(){ 
      this.loadActivity();
    }

    async loadActivity() {
      
        const token = await AsyncStorage.getItem('token');
        
        this.setState({token: token});
        this.setState({loading: true});
       
        await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'GET',
            headers: {'x-access-token': this.state.token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                activities: responseJson.activities,
                loading:false,
            });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
                method: 'GET',
                headers: {'x-access-token': this.state.token},
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({activities: responseJson.activities});
            })
            .catch((error) => {
                console.error("Error:" + error);
            });
        });
    }

    editHandler(curId, curName, curDuration, Date, curCalories) {
        this.props.navigation.navigate('EditExercise', {
          token: this.state.token,
          id: curId,
          name: curName,
          duration: curDuration,
          date: Date,
          calories: curCalories,
        });
    }

    async deleteHandler(id) {        
        await fetch('https://mysqlcs639.cs.wisc.edu/activities/' + id, {
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

        await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'GET',
            headers: {'x-access-token': this.state.token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                activities: responseJson.activities,
                
            });
        })
        .catch((error) => {
            console.error("Error:" + error);
        });        
    }
   
    render() {      
        
        return (            
            <FlatList
            data={this.state.activities}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData => (
                <ActivityItem                  
                  title={itemData.item.name.toString()}
                  duration={itemData.item.duration.toString()}
                  date={itemData.item.date.toString()}
                  calories={itemData.item.calories.toString()}                  
                >
                  <Button                    
                    
                    color="#C2185B"
                    title="Edit"
                    onPress={() => {
                        this.editHandler(itemData.item.id, itemData.item.name, itemData.item.duration, itemData.item.date, itemData.item.calories)}}
                    
                  />
                  <Button
                    color="#C2185B"
                    title="Delete"
                    onPress={() => {
                        this.deleteHandler(itemData.item.id)
                    }}                    
                   />
                </ActivityItem>
            )}
            />
            
        );
    }
}





          
    
    

export default ExerciseView;