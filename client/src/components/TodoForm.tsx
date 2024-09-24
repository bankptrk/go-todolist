/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Input, Spinner, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../App";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");
	const queryClient = useQueryClient();
	const toast = useToast();

	const { mutate: createTodo, isPending: isCreating } = useMutation({
		mutationKey: ['createTodo'],
		mutationFn: async (data: { body: string }) => {
			const res = await axios.post(BASE_URL + `/todos`, data);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
			toast({
				title: "Task Created",
				description: "Your task has been successfully created!",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!newTodo.trim()) {
			toast({
				title: "Input Required",
				description: "Please enter a task",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		createTodo({ body: newTodo });
		setNewTodo("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add a new task..."
					ref={(input) => input && input.focus()}
					variant="filled"
					borderColor="gray.300"
					_focus={{
						borderColor: "teal.500",
						boxShadow: "0 0 0 1px teal.500",
					}}
				/>
				<Button
					mx={2}
					type='submit'
					colorScheme="teal"
					borderRadius="md"
					padding="8px 12px"
					boxShadow="md"
					_hover={{
						bg: "teal.600",
						transform: "scale(1.05)",
					}}
					_active={{
						transform: "scale(0.95)",
					}}
					isLoading={isCreating}
				>
					{isCreating ? <Spinner size={"xs"} /> : <FaPlus size={20} />}
				</Button>
			</Flex>
		</form>
	);
};

export default TodoForm;
