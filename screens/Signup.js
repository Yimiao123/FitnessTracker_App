import React from 'react';
import { Alert, Button, KeyboardAvoidingView, SafeAreaView, StyleSheet,
  Text, TextInput, ScrollView, View, Image, AsyncStorage } from "react-native";
import base64 from 'base-64';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: {},
    };
    this.signUp = this.signUp.bind(this);
    
  } 
  
  async signUp() {
        
    let headers= {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    await fetch('https://mysqlcs639.cs.wisc.edu/users', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({message: responseJson});
      console.log(this.state.message);
    })
    .catch((error) => {
      console.error(error);
    });

    if(this.state.message.message !== undefined) {
      Alert.alert(`${this.state.message.message}`);  
      if (this.state.message.message == "User created!"){
        Alert.alert('You have successfully signed up! We will navigate you to login page');
        this.props.navigation.navigate("Login");
      }

    } else {
      alert("Network error");
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding" enabled keyboardVerticalOffset={60}>        
      <View style={styles.loginScreenContainer}> 
          <Text style={styles.logoText}>Fitness Tracker</Text>
          <Text style={styles.header}>Welcome!</Text>  
            <TextInput 
              accessible={true}
              accessibilityLabel={'Enter Username input for sign up'}

             
              placeholderTextColor="#c4c3cb" 
              onChangeText={val => this.setState({username: val})} 
              style={styles.inputBox}/>
            <TextInput 
              accessible={true}
              accessibilityLabel={'Enter Password input for sign up'}
              
              secureTextEntry={true} placeholderTextColor="#c4c3cb" 
              onChangeText={password => this.setState({password})} style={styles.inputBox}/>              
            <TouchableOpacity accessible={true} accessibilityLabel={"Sign up Button"} accessibilityHint={"Double Click me to Submit"} style={styles.SignupButton} onPress={() => this.signUp()}>
              <Text > Signup</Text>
            </TouchableOpacity>
            <View style={styles.row}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity  accessible={true} accessibilityLabel={"Log In Button"} accessibilityHint={"Double Click me to Login page"} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.link}> Login</Text>
            </TouchableOpacity> 
            </View>             
          </View>
        
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
containerView: {
  
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
SignupButton: {
  width: 200,
  height:50,
  backgroundColor: 'deepskyblue',  
  textAlign:'center', 
  borderRadius: 40,
  alignItems: 'center',
  justifyContent:'center',
  marginTop: 10,
  marginLeft: 90,  
},

SignupText: {
  marginLeft: 70,
  fontSize: 16,
  color:'white',
  textAlign: 'center',
},
link: {
  fontWeight: 'bold',
  backgroundColor:'transparent',
  
},
});