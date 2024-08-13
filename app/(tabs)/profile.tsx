import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/src/components/ThemedView'
import { ThemedText } from '@/src/components/ThemedText'

const Profile = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Profile</ThemedText>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})