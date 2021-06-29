import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config : ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  config,
  textStyles: {
    appTitle: {
      fontSize: "3xl",
      fontWeight: "bold",
      letterSpacing: "-2%",
    },
    // h2: {
    //   fontSize: ["36px", "48px"],
    //   fontWeight: "semibold",
    //   lineHeight: "110%",
    //   letterSpacing: "-1%",
    // },
  },
})

export default theme;