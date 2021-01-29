import React from 'react';
import { Button,View,Text, SafeAreaView, AsyncStorage,StyleSheet, ScrollView, StatusBar} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ActivityItem from '../Components/ActivityItem';
import MealItem from '../Components/MealItem';
import moment from 'moment';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activities: [],          
          todayActivities: [],
          meals:[],
          todayMeals:[],
        };        
        
        this.loadActivities = this.loadActivities.bind(this);
        this.loadMeal = this.loadMeal.bind(this);        
        this.TodayCard1 = this.TodayCard1.bind(this);
        this.TodayCard2 = this.TodayCard2.bind(this);
        
    }   
    

    componentDidMount() {

      this.loadActivities();         

    }

    async loadActivities() {
      const token = await AsyncStorage.getItem('token');
       
       
        await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'GET',
            headers: {'x-access-token': token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let temp = responseJson.activities;
            let filtered = temp.filter(item => item.date.substring(0,10) == moment().format().substring(0,10));
            this.setState({
                activities: responseJson.activities,
                todayActivities: filtered,
                
            });

            
        })
        .catch((error) => {
            console.error("Error:" + error);
        });

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
                method: 'GET',
                headers: {'x-access-token': token},
            })
            .then((response) => response.json())
            .then((responseJson) => {
              let temp = responseJson.activities;
              let filtered = temp.filter(item => item.date.substring(0,10) == moment().format().substring(0,10));
              this.setState({
                  activities: responseJson.activities,
                  todayActivities: filtered,
                 
              });
  
              
          })
            .catch((error) => {
                console.error("Error:" + error);
            });
        });
        this.loadMeal();
    }

    async loadMeal() {
      const token = await AsyncStorage.getItem('token');
       
       
        await fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
            method: 'GET',
            headers: {'x-access-token': token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let temp = responseJson.meals;
            let filtered = temp.filter(item => item.date.substring(0,10) == moment().format().substring(0,10));
            this.setState({
                activities: responseJson.ameals,
                todayMeals: filtered,
                
            });

            
        })
        .catch((error) => {
            console.error("Error:" + error);
        });

        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            await fetch('https://mysqlcs639.cs.wisc.edu/meals/', {
                method: 'GET',
                headers: {'x-access-token': token},
            })
            .then((response) => response.json())
            .then((responseJson) => {
              let temp = responseJson.meals;
              let filtered = temp.filter(item => item.date.substring(0,10) == moment().format().substring(0,10));
              this.setState({
                  meals: responseJson.meals,
                  todayMeals: filtered,
                 
              });
  
              
          })
            .catch((error) => {
                console.error("Error:" + error);
            });
        });


    }

    TodayCard1() {
      return (
        <FlatList
            data={this.state.todayActivities}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData => (
                <ActivityItem                  
                  title={itemData.item.name.toString()}
                  duration={itemData.item.duration.toString()}
                  date={itemData.item.date.toString()}
                  calories={itemData.item.calories.toString()}                  
                >                  
                </ActivityItem>
            )}
            />
      )
      
    }

    TodayCard2() {
      return (            
        <FlatList
        data={this.state.todayMeals}
        keyExtractor={item=>item.id.toString()}
        renderItem={itemData => (
            <MealItem                 
              title={itemData.item.name.toString()}                  
              date={itemData.item.date.toString()}                  
                                            
            >
              <Button
                color="#C2185B"
                title="Meal Details"
                onPress={() => {
                  this.props.navigation.navigate({
                    routeName:'MealDetails',
                    params:{
                      mealId:itemData.item.id,
                      
                    }
                  });
                }}                    
               />
              
            </MealItem>
        )}
        />
        
    );
    }
    static navigationOptions = ({ navigation }) => {
      return {               
          headerTitle: 'Daily Summary',
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
          
      };
        
  };
    
    

    render() {
        
            return (
              <SafeAreaView style={styles.safeContainer}>
              
              <Text style={{fontSize: 20, marginTop: 16, }}>
                {this.state.date}
              </Text>              
              <Text style={styles.bigHeader}>Today's Activity</Text>
              {this.TodayCard1()} 

              <Text style={styles.bigHeader}>Today's Meal</Text>
               {this.TodayCard2()}   
             </SafeAreaView>
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
  bigHeader: {
    fontSize:26,
    fontWeight:'bold',
    marginBottom:20,
    marginTop:20,
  },
});
      
export default Home;

    