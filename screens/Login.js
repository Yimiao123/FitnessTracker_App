import React from 'react';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
  Text, TextInput, View, AsyncStorage } from "react-native";

import base64 from 'base-64';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginScreen extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: null,
    };
    this.logIn = this.logIn.bind(this);   
  }   


    
  async logIn() {       
    let token;
    let headers = {'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)};

    await fetch('https://mysqlcs639.cs.wisc.edu/login', {
      method: 'GET',
      headers: headers      
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({token: responseJson});
      token = Object.values(responseJson)[0];
      console.log(token);
      
    })
    .catch((error) => {
      console.error(error);
    });     
    
    if(this.state.token.token !== undefined) {
      console.log(this.state.token.token);
      AsyncStorage.setItem('username', this.state.username);
      AsyncStorage.setItem('token', this.state.token.token);   
      
      this.props.navigation.navigate('Profile');
    } else {
      alert("Username or password is incorrect!");
    }
  }

  render() {    
      return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding" enabled keyboardVerticalOffset={60}>        
        <View style={styles.loginScreenContainer}> 
            <Text style={styles.logoText}>Fitness Tracker</Text>
            <Text style={styles.header}>Welcome Back!</Text>  
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#c4c3cb"                               
                onChangeText={val => this.setState({username: val})}                 
                style={styles.inputBox}/>
              <TextInput 
                placeholder="Password" 
                secureTextEntry={true} placeholderTextColor="#c4c3cb"                 
                onChangeText={password => this.setState({password})}                                              
                style={styles.inputBox}/>              
              <TouchableOpacity style={styles.loginButton} onPress={() => this.logIn()}>
                <Text > Login</Text>
              </TouchableOpacity>
              <View style={styles.row}>
              <Text style={styles.signupText}>Don't have an account yet?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.link}>  Signup</Text>
              </TouchableOpacity> 
              </View>             
            </View>
          
        </KeyboardAvoidingView>
      );             
      
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  containerView: {
    backgroundColor:'#BB5314',
    flex: 1,
  },
  header: {
    fontSize: 26,    
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
    marginTop: 4,
  },
  
  inputBox: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
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