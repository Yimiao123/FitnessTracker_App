import React, {createRef} from 'react';
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import { Alert, findNodeHandle, AccessibilityInfo, KeyboardAvoidingView, SafeAreaView, StyleSheet,
  Text, TextInput, ScrollView, View, AsyncStorage } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';


export default class ProfileScreen extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
        token: null,
        username: null,        
        password: "",
        firstName: "",
        lastName: "",
        DailyActivity: 0,
		    DailyCalories: 0,
		    DailyCarbohydrates: 0,
		    DailyFat: 0,
        DailyProtein: 0,     
        step: 0,           
    };
    
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    
    
    
  }
  // get profile
componentDidMount() {     
    this.loadProfile();    
}




async loadProfile(){ 
    this.profileEdit = true;   
    const token =  await AsyncStorage.getItem('token');
    const username =  await AsyncStorage.getItem('username');
    this.setState({token: token});
    this.setState({username: username});

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

    }
    

async updateProfile() {
      let headers = {'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': this.state.token,
    };
      await fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        password: this.state.password,
        firstName: this.state.firstName,        
        lastName: this.state.lastName,     
        goalDailyActivity: this.state.DailyActivity,
        goalDailyCalories: this.state.DailyCalories,
        goalDailyCarbohydrates: this.state.DailyCarbohydrates,
        goalDailyFat: this.state.DailyFat,
        goalDailyProtein: this.state.DailyProtein
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson.message);
    })
    .catch((error) => {
      console.error(error);
    });        
}

async handleLogOut() {
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username"); 
        

        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
}

async handleDelete() {
    
    try {
        let res = await this.deleteUser();
        console.log(res);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");        
        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);        
    }
}

deleteUser() {
    
    fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.state.username, {
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
      
    }   

render() {   
  
        return (
          <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView style={styles.containerView} behavior="padding" enabled keyboardVerticalOffset={60}>        
            
            <ScrollView style={styles.loginScreenContainer}> 
                
                <Text style={styles.header} accessibilityHint={'There are 7 steps here, filling up the form step by step'}>Profile</Text>
                    <Text style={styles.header1}>First Name</Text>   
                    <TextInput 
                        accessible={true}                        
                        accessibilityLabel={'Step 1, enter your first name here please'}                         
                        placeholderTextColor="#c4c3cb" 
                        value={this.state.firstName}                        
                        onChangeText={val => this.setState({firstName: val})}                        
                        style={styles.inputBox}/>
                    <Text style={styles.header1}>Last Name</Text>                     
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 2,enter your last name here please'}
                        placeholderTextColor="#c4c3cb"
                        value={this.state.lastName}                         
                        onChangeText={val => this.setState({lastName: val})} 
                        style={styles.inputBox}/>
                    <Text style={styles.header1}>goal Daily Calories</Text>
                    
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 3, enter your daily goal of calories please'}    
                        accessibilityHint={'You are at the end of the page, use three fingers to scroll'}                      
                        placeholderTextColor="#c4c3cb" 
                        value={this.state.DailyCalories.toString()}
                        onChangeText={val => this.setState({DailyCalories: val}) }                        
                        style={styles.inputBox}
                        keyboardType={'numeric'} />
                      <Divider></Divider>
                    
                    <Text style={styles.header1}>goal Daily Protein</Text> 
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 4, enter your daily goal of protein please'} 
                                                
                        placeholderTextColor="#c4c3cb" 
                        value={this.state.DailyProtein.toString()}                       
                        onChangeText={val => this.setState({DailyProtein: val}) }                       
                        style={styles.inputBox}
                        keyboardType={'numeric'} />
                    
                    <Text style={styles.header1}>goal Daily Carbohydrates</Text> 
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 5, enter your daily goal of carbohydrates please'} 
                        placeholderTextColor="#c4c3cb" 
                        value={this.state.DailyCarbohydrates.toString()}
                        onChangeText={val => this.setState({DailyCarbohydrates: val}) }                       
                        style={styles.inputBox}
                        keyboardType={'numeric'} />
                    <Text style={styles.header1}>goal Daily Fat</Text> 
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 6, enter your daily goal of fat please'} 
                        placeholderTextColor="#c4c3cb" 
                        value={this.state.DailyFat.toString()}
                        onChangeText={val => this.setState({DailyFat: val})}                        
                        style={styles.inputBox}
                        keyboardType={'numeric'} />
                    <Text style={styles.header1}>goal Daily Activity</Text> 
                    <TextInput 
                        accessible={true}
                        accessibilityLabel={'Step 7, enter your daily goal of activities please'}                        
                        placeholderTextColor="#c4c3cb"
                        value={this.state.DailyActivity.toString()} 
                        onChangeText={val => this.setState({DailyActivity: val})}                        
                        style={styles.inputBox}
                        keyboardType={'numeric'} /> 
                                                          
                <TouchableOpacity accessible={true} // optional, this is the default
                                  accessibilityLabel={'Make sure to fill up the text fields one by one, Double Click me to update the profile information'} // overrides child content                          
                                  
                                  style={styles.loginButton} 
                                  onPress={() => {Alert.alert('Update Button clicked',                                   
                                  
                                  );
                                  this.updateProfile()}}>
                    <Text > Update Profile</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleLogOut()}>
                    <Text > Log out</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleDelete()}>
                    <Text > Delete Account</Text>                
                </TouchableOpacity>
                </ScrollView>
                                           
                          
            </KeyboardAvoidingView>
            </SafeAreaView> 
        );
    } 
    
       
    
}


const styles = StyleSheet.create({
    
    containerView: {
      padding: 8,
      flex: 1,
      marginBottom: 2,
    },
    
    safeContainer: {
        flex: 1,
        marginBottom: 30,
    },
    header: {
      fontSize: 24,    
      fontWeight: 'bold',
      paddingVertical: 14,
      textAlign: 'center',
    },
    header1: {
        fontSize: 20,    
        fontWeight: 'bold',
        paddingVertical: 14,
        textAlign: 'center',
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