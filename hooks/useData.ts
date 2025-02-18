// hooks/useTasks.ts
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "@/lib/bdd_orm/categoryServices";
import { addTask, deleteTask, getTask } from "@/lib/bdd_orm/tasksService";
import { Task } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasks(userId: string) {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getTask(userId),
    enabled: !!userId,
  });
}

export function useCategories(userId: string) {
  return useQuery({
    queryKey: ["categories", userId],
    queryFn: () => getCategory(userId),
    enabled: !!userId,
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: (_, taskId) => {
      // Mise à jour optimiste du cache
      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (oldTasks) => oldTasks?.filter((task) => task.id !== taskId) ?? []
      );
      // Invalider pour recharger les données
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      userId: string;
      category: string;
      importance: string;
    }) => addTask(data.title, data.userId, data.category, data.importance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; userId: string; emoji: string }) =>
      addCategory(data.name, data.userId, data.emoji),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
