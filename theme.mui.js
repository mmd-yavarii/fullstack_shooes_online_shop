import { createTheme } from '@mui/material/styles';
import 'vazirmatn/Vazirmatn-font-face.css';

// colors
const colors = {
    primary: '#6D071A',
    inputBg: '#f5f7fb',
    inputBorder: '#eaedf3',

    buttonText: '#ffffff',

    backgroundDefault: '#f9fafb',
    backgroundPaper: '#ffffff',
};

// border radius
const shape = {
    borderRadius: 10,
};

const theme = createTheme({
    typography: {
        fontFamily: 'Vazirmatn, Roboto, Arial, sans-serif',
    },

    palette: {
        primary: {
            main: colors.primary,
            contrastText: colors.buttonText,
        },

        background: {
            default: colors.backgroundDefault,
            paper: colors.backgroundPaper,
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: `0 4px 12px ${colors.primary}66`,
                    textTransform: 'none',
                    color: colors.buttonText,
                    fontWeight: 500,
                    borderRadius: shape.borderRadius,
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.inputBg,
                    borderRadius: shape.borderRadius,
                    fontSize: '0.875rem',
                    minHeight: 45,
                    padding: '0 8px',

                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${colors.inputBorder}`,
                        transition: 'all 0.2s ease',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${colors.primary}`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${colors.primary}`,
                    },
                },

                input: {
                    padding: '8px 0',
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem',
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});

export default theme;
