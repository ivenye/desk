import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DeskAPI } from '@/services/desk-api'

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => DeskAPI.listSessions(),
    refetchInterval: 30000,
    staleTime: 25000, // Increased to reduce unnecessary refetches
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useSpawnAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: string) => DeskAPI.spawnAgent(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
    retry: 1,
    retryDelay: 1000,
  })
}

export function useExecCommand() {
  return useMutation({
    mutationFn: (command: string) => DeskAPI.execCommand(command),
    retry: 1,
    retryDelay: 500,
  })
}

export function useMemorySearch() {
  return useMutation({
    mutationFn: (query: string) => DeskAPI.searchMemory(query),
    retry: 1,
    retryDelay: 500,
  })
}
