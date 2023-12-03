import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import JobDetail from '../screens/JobDetail';
import Search from '../screens/Search';

import { COLORS, icons, images } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeaderBtn } from '../components'

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
    const navigation = useNavigation()
    
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
                name="Home" 
                component={ Home } 
                options={{
                    title: '',
                    headerTitleAlign:'center',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: COLORS.lightWhite },

                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={ icons.menu } dimension="60%" />
                    ),

                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={ images.profile } dimension="100%" />
                    ),
                }}/>
            <Stack.Screen 
                name="job-details" 
                component={ JobDetail } 
                options={{
                    title: '',
                    headerBackVisible: false,
                    headerShadowVisible: false,
                    headerTitleAlign:'center',
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={ icons.left } 
                            dimension="60%" 
                            handlePress={ () => navigation.goBack() }
                        />
                    ),

                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={ icons.share }
                            dimension='60%'
                        />
                    )
                }}/>
            <Stack.Screen 
                name="search" 
                component={ Search } 
                options={{
                    title: '',
                    headerBackVisible: false,
                    headerShadowVisible: false,
                    headerTitleAlign:'center',
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={ icons.left } 
                            dimension="60%" 
                            handlePress={ () => navigation.goBack() }
                        />
                    ),

                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={ icons.share }
                            dimension='60%'
                        />
                    )
                }}/>
        </Stack.Navigator>
    )
}