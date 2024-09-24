/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            body: {
                backgroundColor: mode("#f5f7fa", "#1a202c")(props),
                color: mode("#212529", "#f8f9fa")(props),
            },
        }),
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "4px",
                fontWeight: "normal",
            },
            variants: {
                solid: (props: any) => ({
                    bg: mode("#007bff", "#0d6efd")(props),
                    color: mode("white", "white")(props),
                }),
                outline: {
                    borderColor: mode("#007bff", "#0d6efd"),
                },
            },
        },
    },
});

export default theme;
