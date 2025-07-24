import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import colors from "./colors"
import { tabsTheme } from "./components/Tab.theme"
import { buttonTheme } from "./components/Button.theme"
import tableTheme from "./components/Table.theme"

const theme = extendTheme(
  {
    colors,
    fonts: {
      "*": "Inter, sans-serif",
    },
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: 'primary.500'
        }
      },
      Modal: {
        defaultProps: {
          isCentered: true,
          scrollBehavior: 'inside'
        }
      },
      Tabs: tabsTheme,
      Button: buttonTheme,
      Table: tableTheme,
    },
    styles: {
      global: {
        "*": {
          outline: "none",
        },
        h1: {
          fontSize: '26px',
        },
        h2: {
          fontSize: '19.5px',
        },
        h3: {
          fontSize: '15px',
          fontWeight: 'bold'
        },
      }
    }
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
)

export default theme
