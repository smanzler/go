import { useFonts } from 'expo-font';
import { Redirect, router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import AuthProvider, { useAuth } from '@/src/providers/AuthProvider';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <RootLayoutNav />
            </ThemeProvider>
        </AuthProvider>
    );
}

function RootLayoutNav() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) { 
            router.navigate('/(auth)/login');
        }
    }, [isAuthenticated])

    return (
        <Stack>
            <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='(modals)/task'
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='(auth)/login'
                options={{
                    presentation: 'modal',
                    headerTitle: 'Login'
                }}
            />
        </Stack>
    )
}