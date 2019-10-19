import React from 'react';
import Home from './../HomeScreen';
import NewAnalysis from './../FormComponent/index';
import SideBar from '../SideBar/SideBar.js';
import Share from './../Share/Share';
import Welcome from './../FormComponent/Welcome';
import {
    DrawerNavigator
} from 'react-navigation';
import LaunchScreen from './../LaunchScreen';
import HowToUse from '../HowToUse/index';
import FinalScreen from '../FinalScreen/index';

const HomeScreenRouter = DrawerNavigator({
    Welcome: {
        screen: Welcome
    },
    HowToUse: {
        screen: HowToUse
    },
    Home: {
        screen: Home
    },
    NewAnalysis: {
        screen: NewAnalysis
    },
    Share: {
        screen: Share
    },
    LaunchScreen: {
        screen: LaunchScreen
    },
    FinalScreen: {
        screen: FinalScreen
    },
}, {
    contentComponent: props => < SideBar {
        ...props
    }
    />,
    initialRouteName: 'LaunchScreen',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
}, );
export default HomeScreenRouter;