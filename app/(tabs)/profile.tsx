import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/src/components/ThemedView'
import { ThemedText } from '@/src/components/ThemedText'
import { router } from 'expo-router'

const Profile = () => {
    return (
        <ThemedView style={styles.container}>
            <Button title='Log in' onPress={() => router.navigate('/(auth)/login')}></Button>
        </ThemedView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})