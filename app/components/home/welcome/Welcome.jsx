import React, { useState } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'

import styles from './welcome.style'
import { icons, SIZES } from '../../../../constants'
import { useNavigation } from '@react-navigation/native';

const jobsType = [
  "Full-time", 
  "Part-time", 
  "Contractor"
]

export default function Welcome({ searchTerm, setSearchTerm, handleClick }) {
  const navigation = useNavigation();
  const [ activeJobType, setActiveJobType ] = useState(jobsType[0]);
  
  return (
    <View>
      <View style={ styles.container } >
        <Text style={ styles.userName }>Hello User</Text>
        <Text style={ styles.welcomeMessage }>Find your perfect job</Text>
      </View>

      <View style={ styles.searchContainer }>
        <View style={ styles.searchWrapper }>
          <TextInput
            style={ styles.searchInput }
            value={ searchTerm }
            onChangeText={ (text) => setSearchTerm(text) }
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity 
          style={ styles.searchBtn }
          onPress={ handleClick }>
          <Image
            source={ icons.search }
            resizeMode='contain'
            style={ styles.searchBtnImage }
          />
        </TouchableOpacity>
      </View>

      <View style={ styles.tabsContainer }>
        <FlatList 
          data={ jobsType }
          horizontal={ true }
          keyExtractor={ item => item }
          renderItem={ ({ item }) => (
            <TouchableOpacity
              style={ styles.tab(activeJobType, item) }
              onPress={ () => {
                setActiveJobType(item);
                navigation.navigate('search', {
                  jobType: item,
                  term: searchTerm
                })
              } }>
              <Text style={ styles.tabText(activeJobType, item) }>{ item }</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ columnGap: SIZES.small }}
        />
      </View>
    </View>
  )
}