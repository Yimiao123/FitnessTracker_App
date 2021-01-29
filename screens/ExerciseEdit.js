import React from 'react';
import { 
    ScrollView,
    View,
    Text,    
    StyleSheet, 
    ActivityIndicator,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage
} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import {Ionicons} from  '@expo/vector-icons';

import { TextInput, Button, Divider} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

class ExerciseEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:[],
            token: null,          
            Name: '',
			      Duration: '',
			      Calories: '',
			      Id: '',
            date: '',  
            
        };
        this.updateActivity = this.updateActivity.bind(this);
        
    }
    componentDidMount() {
        
        this.loadActivities();

    }

    

    //store all the exercies info in an object
    async loadActivities() {
      
        this.setState({
          Calories: this.props.navigation.getParam('calories'),          
          date: this.props.navigation.getParam('date'),
          Id: this.props.navigation.getParam('id'),
          Name: this.props.navigation.getParam('name'),
          Duration: this.props.navigation.getParam('duration'),
          token: await AsyncStorage.getItem('token'),
        });
    }  
  

    async updateActivity() {
       
        let headers = {'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.state.token,
      };
        await fetch('https://mysqlcs639.cs.wisc.edu/activities/' + this.state.Id, {
        method: 'PUT',
        headers: headers,
        body:JSON.stringify({
          name: this.state.Name,
          duration: this.state.Duration,
          date: this.state.date,
          calories: this.state.Calories,
        })             
      })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.message);
      })
      .catch((error) => {
        console.error(error);
      });    
      let activity = {
        id: this.state.Id,
        name: this.state.name,
        duration: this.state.duration,
        date: this.state.date,
        calories: this.state.calories,
    }
    this.setState({activity:activity});
    this.props.navigation.navigate('ViewExercise', {activity: activity});
  } 

  render() {     
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding" enabled keyboardVerticalOffset={60}>        
        <ScrollView style={styles.loginScreenContainer}> 
           <SafeAreaView style={styles.safeContainer}> 
            <Text style={styles.bigHeader}>Edit your Activity</Text>
                <Text style={styles.header1}>Name</Text>   
                <TextInput 
                    placeholder="Name" 
                    placeholderTextColor="#c4c3cb" 
                    value={this.state.Name.toString()}
                    onChangeText={val => this.setState({Name: val})} 
                    style={styles.inputBox}/>
                <Divider style={styles.divider}></Divider>
                <Text style={styles.header1}>Date</Text> 
                <DatePicker
                        style={{width:'100%'}}
                        date={this.state.date}
                        mode="datetime"
                        placeholder={"Select your activity date"}
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        maxDate={new Date()}
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderRadius: 2,
                            borderWidth: 2,
                            height:'100%',
                        }
                        }}
                        onDateChange={(date) => { 
                          let result = date.split(' ');
                          let result1 = result[0] + 'T' + result[1] + ":00-06:00"
                          
                          this.setState({date: result1})
                      }}
                    />
                     <View style={{
                        display:"flex", 
                        flexDirection:"row",
                        justifyContent:"flex-start",
                        alignItems:"center",
                        margin:13
                    }}>
                    
                    </View>
                    <Button style={{borderRadius:20, marginLeft:10, marginRight:10}} color='#777777' mode='outlined' icon="calendar-today"
                    onPress={() => this.setState({date:moment().format()})}                  
                    > Use current time </Button>
                   
                <Divider style={styles.divider}></Divider>
                <Text style={styles.header1}>Duration</Text> 
                <TextInput 
                    placeholder="duration" 
                    label="Minute"
                    placeholderTextColor="#c4c3cb" 
                    value={this.state.Duration.toString()}
                    onChangeText={val => this.setState({Duration: val})} 
                    style={styles.inputBox}
                    keyboardType={'numeric'} />
                <Divider style={styles.divider}></Divider>
                <Text style={styles.header1}>Calories</Text> 
                <TextInput 
                    placeholder="Goal Daily Protein" 
                    placeholderTextColor="#c4c3cb" 
                    value={this.state.Calories.toString()}
                    onChangeText={val => this.setState({Calories: val})}                         
                    style={styles.inputBox}
                    keyboardType={'numeric'} />

                
                                                      
            <TouchableOpacity style={styles.loginButton} onPress={() => this.updateActivity()}>
                <Text > Updata Activity</Text>                
            </TouchableOpacity>
            
            
            </SafeAreaView>
                        
            </ScrollView>          
        </KeyboardAvoidingView>
    );
} 

   

}
export default ExerciseEdit;


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

divider:{
  marginTop:15,
  marginBottom:15,
  backgroundColor:"#777777"
},
header1: {
    fontSize: 27,    
    fontWeight: 'bold',
    paddingVertical: 14,
    
},
dialogQuick:{
  fontSize:18,
  fontWeight:'bold',
  marginLeft:5,
  color:"#777777"
},

loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
topContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
signupText: {
  textAlign:"center",
  marginLeft: 50,
  color:'rgba(255,255,255,0.6)',
    fontSize:16
},
row: {
  flexDirection: 'row',
  
},

inputBox: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 50,
  marginRight: 50,
  marginTop: 5,
  marginBottom: 5,
},
loginButton: {
  width: 200,
  height:50,
  backgroundColor: 'deepskyblue',  
  textAlign:'center', 
  borderRadius: 40,
  alignItems: 'center',
  justifyContent:'center',
  marginTop: 10,
  marginLeft: 75,
  
},
loginText: {
  fontSize: 16,
  color:'white',
  textAlign: 'center',
},
link: {
  fontWeight: 'bold',
  backgroundColor:'transparent',
  
},
});