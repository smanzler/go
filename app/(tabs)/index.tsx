import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { StatusBar } from 'expo-status-bar'

const Index = () => {
  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden/>

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>

      </SafeAreaView>
    </ThemedView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  }
})