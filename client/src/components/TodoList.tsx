import { Flex, Spinner, Stack, Text} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";
import axios from "axios";

export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
};

const TodoList = () => {
    const { data: todos, isLoading, isError } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                const res = await axios.get(BASE_URL + `/todos`);
                return res.data || [];
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}
                bgGradient='linear(to-l, #6dd5ed, #2193b0, #1f4037)'
                bgClip='text'
                >
                Today Tasks
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {isError && (
                <Flex justifyContent={"center"} my={4}>
                    <Text color={"red.500"}>Error loading tasks. Please try again.</Text>
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap='3'>
                    <Text fontSize={"xl"} textAlign={"center"} color={"black.500"}>
                        All tasks completed Good Job!
                    </Text>
                    <img src='/golang.png' alt='Go logo' width={70} height={70} />
                </Stack>
            )}
            <Stack gap={3}>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </Stack>
        </>
    );
};

export default TodoList;
