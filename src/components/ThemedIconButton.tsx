import { StyleSheet, TouchableOpacity, View, type TouchableOpacityProps } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../providers/ThemeProvider';

export type ThemedIconButtonProps = TouchableOpacityProps & {
    elevation?: number;
    exitBtn?: boolean;
};

export function ThemedIconButton({ style, elevation = 0, exitBtn, ...otherProps }: ThemedIconButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity 
            style={[
                { 
                    backgroundColor: theme.background,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, 
                theme.useShadow && {
                    shadowColor: 'black',
                    shadowOpacity: elevation * 0.05 < 0.5 ? elevation * 0.05 : 0.5,
                    shadowRadius: 7,
                    shadowOffset: {
                        width: elevation * 0.5 < 5 ? elevation * 0.5 : 5,
                        height: elevation * 0.5 < 5 ? elevation * 0.5 : 5,
                    }
                },
                style
            ]} 
            {...otherProps}
        >
            {!theme.useShadow && <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: `rgba(255, 255, 255, ${elevation * 0.02})`
            }} />}
            <Entypo name='plus' color={theme.primary} size={30} style={exitBtn && { transform: [{ rotate: '45deg' }] }} />
        </TouchableOpacity>
    );
}
