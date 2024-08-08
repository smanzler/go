import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Entypo } from '@expo/vector-icons';

export type ThemedButtonProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    exitBtn?: boolean;
};

export function ThemedButton({ style, lightColor, darkColor, exitBtn, ...otherProps }: ThemedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return (
        <TouchableOpacity 
            style={[
                { 
                    backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, 
                style
            ]} 
            {...otherProps}
        >
            <Entypo name='plus' color={iconColor} size={30} style={exitBtn && { transform: [{ rotate: '45deg' }] }} />
        </TouchableOpacity>
    );
}
