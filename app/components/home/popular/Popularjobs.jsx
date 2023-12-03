import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator 
} from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../../constants'

import useFetch from '../../../../hook/useFetch'
import PopularJobCard from './cards/PopularJobCard';

export default function Popularjobs() {
  const navigation = useNavigation();

  const { data, isLoading, error } = useFetch(
    'search',
    {
      query: 'React developer',
      num_pages: 1,
    }
  )

  const [ selectedJob, setSelectedJob ] = useState(data[0]?.job_id);

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={ styles.headerBtn }>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.cardsContainer }>
        {
          isLoading ? (
            <ActivityIndicator size="large" color={ COLORS.primary } />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={ data }
              horizontal={ true }
              renderItem={ ({ item }) => (
                <PopularJobCard
                  item={ item }
                  selectedJob={ selectedJob }
                  handleCardPress={ () => {
                    setSelectedJob(item.job_id)
                    navigation.navigate('job-details', {
                      id: item.job_id
                    })
                  }}
                />
              )}
              keyExtractor={ item => item?.job_id }
              contentContainerStyle={{ columnGap: SIZES.medium }}
              showsHorizontalScrollIndicator={ false }
            />
          )
        }
      </View>
    </View>
  )
}