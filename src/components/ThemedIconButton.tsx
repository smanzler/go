import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../providers/ThemeProvider';

export type ThemedIconButtonProps = TouchableOpacityProps & {
    exitBtn?: boolean;
};

export function ThemedIconButton({ style, exitBtn, ...otherProps }: ThemedIconButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity 
            style={[
                { 
                    backgroundColor: theme.background,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, 
                style
            ]} 
            {...otherProps}
        >
            <Entypo name='plus' color={theme.secondary} size={30} style={exitBtn && { transform: [{ rotate: '45deg' }] }} />
        </TouchableOpacity>
    );
}
