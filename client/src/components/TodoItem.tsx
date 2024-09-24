import { Badge, Box, Flex, Spinner, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {

    const backgroundColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const textColor = useColorModeValue("black", "white");
    const completedTextColor = useColorModeValue("green.700", "green.200");
    const doneBadgeColor = useColorModeValue("green", "green");
    const inProgressBadgeColor = useColorModeValue("yellow", "yellow");


    const queryClient = useQueryClient();
    const toast = useToast();
    const [hasUpdated, setHasUpdated] = useState(false);
    // console.log(todo)
    const {mutate:updateTodo, isPending:isUpdating} = useMutation({
        mutationKey:["updateTodo"],
        mutationFn: async () => {
            if (todo.completed) {
				throw new Error("Task is already updated Completed");
			}
                try {
                    const res = await axios.put(BASE_URL + `/todos/${todo._id}`)
                    return res.data;
                } catch (error) {
                    console.log(error) 
                    toast({
                        title: "Error",
                        description: "Failed to update the task.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
        },
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
			if (!hasUpdated) {
				toast({
					title: "Task Updated",
					description: "The task has been successfully marked as completed.",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				setHasUpdated(true);
			}
		},
        onError: (error: Error) => {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
    })
    const {mutate: deleteTodo, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async () => {
                try {
                    const res = await axios.delete(BASE_URL + `/todos/${todo._id}`)
                    return res.data;
                } catch (error) {
                    console.log(error) 
                    toast({
                        title: "Error",
                        description: "Failed to delete the task.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]})
            toast({
                title: "Task Deleted",
                description: "The task has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    });
	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={borderColor}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
                bg={backgroundColor}
				boxShadow={useColorModeValue("md", "dark-lg")} //
			>
				<Text
					color={todo.completed ? completedTextColor : textColor}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme={doneBadgeColor}>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme={inProgressBadgeColor}>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
					{!isUpdating && <FaRegCheckCircle size={20} />}
                    {isUpdating && <Spinner size={"sm"} />}
				</Box>
				<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
					{!isDeleting && <MdDeleteForever size={25} />}
                    {isDeleting && <Spinner size={"sm"} />}

				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;