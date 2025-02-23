import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--white)',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'var(--blue-50)',
                },
                contained: {
                    borderColor: 'var(--blue-500) !important',
                    backgroundColor: 'var(--blue-500) !important',
                    color: 'var(--blue-50) !important',
                    '&:hover': {
                        backgroundColor: 'var(--blue-600) !important',
                        borderColor: 'var(--blue-600) !important',
                    },
                },
                outlined: {
                    borderColor: 'var(--blue-500) !important',
                    color: 'var(--blue-500) !important',
                    backgroundColor: 'var(--blue-50) !important',
                    '&:hover': {
                        backgroundColor: 'var(--blue-500) !important',
                        borderColor: 'var(--blue-500) !important',
                        color: 'var(--blue-50) !important',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: 'var(--blue-900) !important',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'var(--blue-900) !important',
                    },
                },
            },
        },
    },
});

export default customTheme;