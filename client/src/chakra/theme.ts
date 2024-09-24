/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "light", // เปลี่ยนเป็นโหมดสว่างเริ่มต้น
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            body: {
                backgroundColor: mode("#f5f7fa", "#1a202c")(props), // สีพื้นหลังมินิมอล (สีเทาอ่อนในโหมดสว่าง และสีเทาเข้มในโหมดมืด)
                color: mode("#212529", "#f8f9fa")(props), // สีตัวอักษรมินิมอล (สีดำในโหมดสว่าง และสีขาวในโหมดมืด)
            },
        }),
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "4px", // มุมที่มน
                fontWeight: "normal", // น้ำหนักฟอนต์ปกติ
            },
            variants: {
                solid: (props: any) => ({
                    bg: mode("#007bff", "#0d6efd")(props), // สีพื้นหลังของปุ่ม (สีฟ้าในโหมดสว่าง และสีน้ำเงินเข้มในโหมดมืด)
                    color: mode("white", "white")(props), // สีตัวอักษรของปุ่ม
                }),
                outline: {
                    borderColor: mode("#007bff", "#0d6efd"),
                },
            },
        },
    },
});

export default theme;
