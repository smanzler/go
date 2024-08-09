import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ThemedText } from './ThemedText';

export type ThemedIconButtonProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    cancelBtn?: boolean;
    children?: React.ReactNode;
};

export function ThemedButton({ style, lightColor, darkColor, cancelBtn, children, ...otherProps }: ThemedIconButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, cancelBtn ? 'background' : 'text');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, cancelBtn ? 'text' : 'background')

    return (
        <TouchableOpacity 
            style={[
                { 
                    backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, 
                cancelBtn && {
                    borderWidth: 1,
                    borderColor: textColor
                },
                style
            ]} 
            {...otherProps}
        >
            <ThemedText style={{color: textColor}} >{children}</ThemedText>
        </TouchableOpacity>
    );
}
