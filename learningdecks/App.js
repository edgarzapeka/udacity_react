import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <LearningStatusBar />
        <MainNaivgator />
      </View>
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
      header: null
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
    screen: Tabs
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
