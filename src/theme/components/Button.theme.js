import { defineStyleConfig } from '@chakra-ui/react'

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'md', // Радиус закругления
    _disabled: {
      color: 'green',
      cursor: 'no-drop',
    },
  },
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '8px 16px',
    },
    md: {
      fontSize: '14px',
      padding: '12px',
      fontWeight: "500",
    },
  },
  variants: {
    pause: {
      border: "1px solid red",
      color: "red",
      _hover: {
        bg: "#ffe5e5",
      },
    },
    active: {
      border: "1px solid green",
      color: "green",
      _hover: {
        bg: "#ecffec",
      },
    },
    delete: {
      bg: "red",
      color: "#fff",
      _hover: {
        bg: "button.delete",
      },
    },
    edit: {
      bg: "button.edit",
      color: "#000",
      _hover: {
        bg: "button._hover",
      },
    },
    rejectEdit: {
      bg: "#FFCC00",
      color: "#000",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "16.94px",
      padding: "9.5px 18px",
      w: "auto",
      h: "auto",
      minW: "auto",
      _hover: {
        bg: "#e2b503",
      },
    },
    cancel: {
      bg: "button.edit",
      color: "#000",
      outline: "none",
      _hover: {
        bg: "button._hover",
      },
    },
    gray: {
      bg: "#F2F4F7",
      color: "#000",
      outline: "none",
      _hover: {
        bg: "#ddd",
      },
    },
    solid: {
      bg: 'button.main',
      color: 'white',
      _hover: {
        bg: 'button.hover',
      },
      _disabled: {
        bg: '#EDEDED',
        cursor: 'no-drop',
        color: "#000",
        _hover: {
          bg: "#EDEDED"
        }
      },
    },
    outline: {
      borderColor: '#E5E9EB',
      color: 'black',
      _hover: {
        bg: '#D0D5DD',
      },
      _disabled: {
        color: 'black',
        cursor: 'no-drop',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
});
