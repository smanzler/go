import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedButton } from '@/components/ThemedButton'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'

const TaskScreen = () => {
  return (
    <BlurView intensity={30} style={styles.container}>
        <ThemedButton style={styles.exitBtn} onPress={() => router.back()} exitBtn />
    </BlurView>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    exitBtn: {
        position: 'absolute',
        top: 40,
        left: 10,

        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
    }
})