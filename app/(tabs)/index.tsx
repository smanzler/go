import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedButton } from '@/components/ThemedButton'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Index = () => {
  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden/>

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>

      </SafeAreaView>

      <ThemedButton style={styles.newTaskBtn} onPress={() => router.push('/(modals)/task')}/>
    </ThemedView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  newTaskBtn: {
    position: 'absolute',

    bottom: 10,
    right: 10,
    width: 50,
    aspectRatio: 1,

    borderRadius: 25,
  }
})