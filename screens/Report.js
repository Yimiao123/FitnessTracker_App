import React from 'react';
import {Text, DataTable, Button, Divider, ProgressBar} from 'react-native-paper';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet,
    TextInput, View, ScrollView, AsyncStorage } from "react-native";
import * as Progress from 'react-native-progress';
import moment from 'moment';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/UI/HeaderButton';

class Report extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasEdit: false,            
            todayActivities: [],
            aggregatedTime: 0,
            DailyActivity: 0,
		    DailyCalories: 0,
		    DailyCarbohydrates: 0,
		    DailyFat: 0,
            DailyProtein: 0, 
            actiPercentage: 0,
        };
        this.loadProfile = this.loadProfile.bind(this);
        this.update = this.update.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        return {               
            headerTitle: 'Daily Report',
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


    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
              this.forceUpdate();
            }
          );
        this.loadProfile();
        
    }

    update() {        
        if (this.state.aggregatedTime >= this.state.DailyActivity ) {
            this.setState({actiPercentage: 1});
        } else {
            this.setState({actiPercentage:this.state.aggregatedTime/this.state.DailyActivity});
        }
        this.forceUpdate();
    }  

    async loadProfile(){ 
        this.profileEdit = true;   
    const token =  await AsyncStorage.getItem('token');
    const username =  await AsyncStorage.getItem('username');
    

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
    };
    await fetch('https://mysqlcs639.cs.wisc.edu/users/' + username, {
          method: 'GET',
          headers: headers,
      })
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({            
            DailyActivity: responseData.goalDailyActivity,
            DailyCalories: responseData.goalDailyCalories,
            DailyCarbohydrates: responseData.goalDailyCarbohydrates,
            DailyFat: responseData.goalDailyFat,
            DailyProtein: responseData.goalDailyProtein
          });
      })
      .catch((error) => {
          console.error(error);
      });

      this.focusListener = this.props.navigation.addListener('didFocus', async() => {
        await fetch('https://mysqlcs639.cs.wisc.edu/users/' + username, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
              password: responseData.password,
              firstName: responseData.firstName,
              lastName: responseData.lastName,
              DailyActivity: responseData.goalDailyActivity,
              DailyCalories: responseData.goalDailyCalories,
              DailyCarbohydrates: responseData.goalDailyCarbohydrates,
              DailyFat: responseData.goalDailyFat,
              DailyProtein: responseData.goalDailyProtein
            });
        })
        .catch((error) => {
            console.error(error);
        });
    });    
             
       
        await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'GET',
            headers: {'x-access-token': token},
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let temp = responseJson.activities;
            let filtered = temp.filter(item => item.date.substring(0,10) == moment().format().substring(0,10));
            
            let tempTime = filtered.map(data => data.duration).reduce((acc, data) => data + acc, 0);
            
            this.setState({
                activities: responseJson.activities,
                todayActivities: filtered,
                loading:false,
                aggregatedTime:tempTime,
            });
            if (this.state.aggregatedTime >= this.state.DailyActivity ) {
                this.setState({actiPercentage: 1});
            } else {
                this.setState({actiPercentage:this.state.aggregatedTime/this.state.DailyActivity});
            }

            
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
            
            let tempTime = filtered.map(data => data.duration).reduce((acc, data) => data + acc, 0);
            
            this.setState({
                activities: responseJson.activities,
                todayActivities: filtered,
                loading:false,
                aggregatedTime:tempTime,
            });
            if (this.state.aggregatedTime >= this.state.DailyActivity ) {
                this.setState({actiPercentage: 1});
            } else {
                this.setState({actiPercentage:this.state.aggregatedTime/this.state.DailyActivity});
            }

            
        })
        .catch((error) => {
            console.error("Error:" + error);
        });
    });
        
    }  

    render() {
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <View>            
            <Text style={styles.header1}>Activity</Text>
            <Text>Completion:{`${this.state.aggregatedTime}`} min</Text>
            <Progress.Bar progress={this.state.actiPercentage} width={200} />
            <Text>Goal:{`${this.state.DailyActivity}`} min</Text>
            </View>
            </ScrollView>
            </SafeAreaView>
        )
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
      fontSize:40,
      fontWeight:'bold',
      marginBottom:20,
      marginTop:20,
    },

    header1 : {
        fontSize:28,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10,
      },
  });
        

  



export default Report;
