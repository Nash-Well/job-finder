import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import styles from './index.style.js'
import { Welcome, Nearbyjobs, Popularjobs, ScreenHeaderBtn } from '../components/index.js'

export default function Home() {
    const navigation = useNavigation();
    let [ searchTerm, setSearchTerm ] = useState('');
    
    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView
                showsVerticalScrollIndicator={ false }>
                <View style={ styles.scrollContainer }>
                    <Welcome
                        searchTerm={ searchTerm }
                        setSearchTerm={ setSearchTerm }
                        handleClick={() => {
                            if(searchTerm) {
                                navigation.navigate('search', {
                                    term: searchTerm
                                })
                            }
                        }}
                    />

                    <Popularjobs />

                    <Nearbyjobs/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}