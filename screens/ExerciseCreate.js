import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Text, ScrollView, 
    SafeAreaView, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import {Divider,TextInput, Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
class ExerciseCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:[],
            name: '',
            duration: '',
            date: '',
            calories: '',

        };
        this.createActivity = this.createActivity.bind(this);
        this.handleConversion = this.handleConversion.bind(this);
        
    }

    handleConversion(key, val, type="string") {
        let newVal;

        if(type === "float") {
            newVal = String(val);
            this.setState({ [key]: newVal});
        } else {
            this.setState({ [key]: val});
        }
    }
    
    async createActivity() {
        
        const token =  await AsyncStorage.getItem('token');       

        await fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            
            body: JSON.stringify({
                name: this.state.name,
                duration: this.state.duration,
                date: this.state.date,
                calories: this.state.calories,
            })
        })
        .then((response) => response.json())        
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.error("Error:" + error);
        });
    
        let activity = {
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
                <Text style={styles.bigHeader}>Add your Activity</Text>
                    <Text style={styles.header1}>Name</Text>   
                    <TextInput 
                        placeholder="Name" 
                        placeholderTextColor="#c4c3cb" 
                        
                        onChangeText={val => this.handleConversion('name', val)} 
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
                        
                        onChangeText={val => this.handleConversion('duration', val)} 
                        style={styles.inputBox}
                        keyboardType={'numeric'} />
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.header1}>Calories</Text> 
                    <TextInput 
                        placeholder="Goal Daily Protein" 
                        placeholderTextColor="#c4c3cb" 
                        
                        onChangeText={val => this.handleConversion('calories', val)}                         
                        style={styles.inputBox}
                        keyboardType={'numeric'} />    
                    
                                                          
                <TouchableOpacity style={styles.loginButton} onPress={() => this.createActivity()}>
                    <Text > Create Activity</Text>                
                </TouchableOpacity>
                
                
                </SafeAreaView>
                            
                </ScrollView>          
            </KeyboardAvoidingView>
        );
    } 
    
       
    
}
    export default ExerciseCreate;
    
    
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