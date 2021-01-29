import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileScreen from './screens/Profile';
import {Ionicons, Feather, FontAwesome5} from '@expo/vector-icons';

import HomeScreen from './screens/Home';
import ReportScreen from './screens/Report';
import ExerciseViewScreen from './screens/ExerciseView';
import ExerciseEditScreen from './screens/ExerciseEdit';
import ExerciseCreateScreen from './screens/ExerciseCreate';
import MealViewScreen from './screens/MealView';
import MealEditScreen from './screens/MealEdit';
import MealCreateScreen from './screens/MealCreate';
import FoodViewScreen from './screens/FoodLibrary';
import MealDetailScreen from './screens/MealDetails';



// login <-> signup
// login -> profile(register sucessfully)


const defaultStackNavOptions = {
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: '#4a148c',
  
};

const ActivitiesNavigator = createStackNavigator(
  {
    ViewExercise: ExerciseViewScreen,    
    CreateExercise: ExerciseCreateScreen,
    EditExercise: ExerciseEditScreen,
  },
  {  
    navigationOptions: {  
    drawerIcon: drawerConfig => (
      <Ionicons
        name='ios-create'
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultStackNavOptions
}
);


const MealsNavigator = createStackNavigator(
  {
    ViewMeal: MealViewScreen,    
    CreateMeal: MealCreateScreen,
    EditMeal: MealEditScreen,
    MealDetails: MealDetailScreen,
    FoodLibrary: FoodViewScreen,    

  },
  {  
    navigationOptions: {  
    drawerIcon: drawerConfig => (
      <Ionicons
        name='ios-create'
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultStackNavOptions
}
);

const HomeStack = createStackNavigator(
  {Home: HomeScreen},
{  
  navigationOptions: {  
  drawerIcon: drawerConfig => (
    <Ionicons
      name='ios-create'
      size={23}
      color={drawerConfig.tintColor}
    />
  )
},
defaultNavigationOptions: defaultStackNavOptions
}
);

const ReportStack = createStackNavigator(
  {Report: ReportScreen},
{  
  navigationOptions: {  
  drawerIcon: drawerConfig => (
    <Ionicons
      name='ios-create'
      size={23}
      color={drawerConfig.tintColor}
    />
  )
},
defaultNavigationOptions: defaultStackNavOptions
}
);




const tabScreenConfig = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#4a148c',
      tabBarLabel: 'Home'
    }
  },
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#4a148c',
      tabBarLabel: 'Meals'
        
    }
  },
  Activity: {
    screen: ActivitiesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome5 name="running" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#4a148c',
      tabBarLabel: 'Activity'
        
    }
  },
  Report: {
    screen: ReportStack,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Feather name="target" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#4a148c',
      tabBarLabel: 'Report'
        
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome5 name="user-edit" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#4a148c',
      tabBarLabel: 'Profile'
        
    }
  },
  
  

};


const MainTabs = createBottomTabNavigator(tabScreenConfig, {
  
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans'
    },
    activeTintColor: '#ff6f00',
    
  },
  
  
});





const navigator = createSwitchNavigator(
  {    
    Login: LoginScreen,
    Signup: SignupScreen,
    Default: MainTabs,   
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Fitness Tracker',
    },
  }
);



export default createAppContainer(navigator);