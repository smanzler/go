export type ThemeName = 'light' | 'dark' | 'system';

export type Theme = {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    useShadow: boolean;
};

export const lightTheme: Theme = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#1E90FF',
    secondary: '#FF6347',
    useShadow: true
};

export const darkTheme: Theme = {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#1E90FF',
    secondary: '#FF6347',
    useShadow: false
};
