import { Box, Flex, Button, useColorModeValue, useColorMode, Text, Container } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();

    const textColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.9)", "#2D3748");
    const boxShadow = useColorModeValue("0 4px 8px rgba(0, 0, 0, 0.1)", "none");

	return (
		<Container maxW={"900px"}>
			<Box bg={bgColor} px={4} my={4} borderRadius={"5"} boxShadow={boxShadow}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    
					<Flex
						justifyContent={"center"}
						alignItems={"center"}
						gap={3}
						display={{ base: "none", sm: "flex" }}
					>
						<img src='/golang.png' alt='logo' width={40} height={40} />
					</Flex>

					<Flex alignItems={"center"} gap={3}>
						<Text fontSize={"lg"} fontWeight={500} color={textColor}>
							Daily Tasks
						</Text>

						<Button onClick={toggleColorMode} 
                        bg={useColorModeValue("blue.500", "blue.300")} 
                        color={useColorModeValue("white", "gray.800")}
                        _hover={{ bg: useColorModeValue("blue.600", "blue.400") }}
                        borderRadius="md"
                        >
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
}