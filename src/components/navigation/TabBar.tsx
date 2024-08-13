import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@/src/providers/ThemeProvider';
import { useElevation } from '@/src/constants/Themes';
import { Feather } from '@expo/vector-icons';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { theme } = useTheme();

    const icon: Record<any, (props: any) => JSX.Element> = {
        index: (props: any) => <Feather name='home' size={24} color={theme.text} {...props} />,
        explore: (props: any) => <Feather name='compass' size={24} color={theme.text} {...props} />,
        profile: (props: any) => <Feather name='user' size={24} color={theme.text} {...props} />
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }, useElevation(7, theme)]}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.item}
                    >
                        {icon[route.name]({
                            color: isFocused ? theme.primary : theme.text
                        })}
                        <Text style={{ color: isFocused ? theme.primary : theme.text }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: 250,
        paddingVertical: 12,
        borderRadius: 35
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    }
})