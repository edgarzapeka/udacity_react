import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <LearningStatusBar />
          <MainNaivgator />
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

function LearningStatusBar({backgroundColor, ...props}){
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks List',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='folder-multiple' size={30} color={tintColor} />
    },
  },
  AddNewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add new deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='folder-plus' size={30} color={tintColor} />
    }
  },
}, {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
  }
}
)

const MainNaivgator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      tabBarLabel: 'Desk List'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      tabBarLabel: 'Desk View'
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add New Card'
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      tabBarLabel: 'Quiz'
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
