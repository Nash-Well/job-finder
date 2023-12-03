import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { 
    ActivityIndicator, 
    FlatList, 
    Image, 
    SafeAreaView, 
    TouchableOpacity, 
    View,
    Text
} from 'react-native'

import styles from '../../styles/search';
import { SIZES, icons, COLORS } from '../../constants';

import useFetch from '../../hook/useFetch';
import { NearbyJobCard } from '../components';

export default function Search() {
    const params = useRoute().params;
    const navigation = useNavigation();
    const [ page, setPage ] = useState(1);

    const jobTypes = (jt) => {
        switch(jt) {
            case 'Full-time':
                return 'FULLTIME';
            case 'Part-time':
                return 'PARTTIME';
            case 'Contractor':
                return jt.toUpperCase();
            default: 
                return '';
        }
    }

    const { data, isLoading, error, reFetch } = useFetch('search', {
        query: params?.term ? params?.term : 'React Native developer',
        page: page.toString(),
        employment_types: jobTypes(params?.jobType),
    });

    const handleSearch = () => {
        reFetch();
    }

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <FlatList
                data={ data }
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={ item }
                        handleNavigate={ 
                            () => navigation.navigate(
                                `job-details`, {
                                    id: item.job_id
                                }) 
                        }
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params?.term}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : error && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View> 
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{ page }</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}