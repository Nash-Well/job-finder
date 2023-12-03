import { useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import { 
    Text, 
    SafeAreaView, 
    ScrollView, 
    View,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

import styles from './index.style'
import { 
    Company, 
    JobAbout, 
    JobFooter, 
    JobTabs, 
    ScreenHeaderBtn, 
    Specifics
} from '../components' 

import useFetch from '../../hook/useFetch'
import { COLORS, SIZES, icons } from '../../constants'

const tabs = [
    "About",
    "Qualifications",
    "Responsibilities"
]

export default function JobDetail() {
    const params = useRoute().params;
    const [ refreshing, setRefreshing ] = useState(false);
    const [ active, setActive ] = useState(tabs[0]);

    const { data, isLoading, error, reFetch } = useFetch('job-details', {
        job_id: params?.id,
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch();
        setRefreshing(false)
    }, [])

    const displayTabContent = () => {
        switch (active) {
            case "About":
                return <JobAbout
                            info={ data[0].job_description ?? "No data provided" }
                        />
            case "Qualifications":
                return <Specifics
                            title='Qualifications'
                            points={ data[0].job_highlights?.Qualifications ?? [ 'N/A' ] }
                        />
            case "Responsibilities":
                return <Specifics
                            title='Responsibilities'
                            points={ data[0].job_highlights?.Responsibilities ?? [ 'N/A' ] }
                        />
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView
                showsHorizontalScrollIndicator={ false }
                refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }>
                <View style={ styles.scrollContainer }>
                    { 
                        isLoading ? (
                            <ActivityIndicator 
                                size={ 'large' } 
                                color={ COLORS.primary }
                            />
                        ) : error ? (
                            <Text>Something went wrong</Text>
                        ) : data?.length === 0 ? (
                            <Text>No data</Text>
                        ) : (
                            <View style={ styles.infoContainer }>
                                <Company 
                                    companyLogo={ data[0].employer_logo }
                                    jobTitle={ data[0].job_title }
                                    companyName={ data[0].employer_name }
                                    location={ data[0].job_country }
                                />

                                <JobTabs 
                                    tabs={ tabs }
                                    activeTab = { active }
                                    setActiveTab = { setActive }
                                />

                                { displayTabContent() }
                            </View>
                        )
                    }
                </View>
            </ScrollView>

            <JobFooter url={ data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results' } />
        </SafeAreaView>
    )
}