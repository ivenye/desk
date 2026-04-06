import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { OpenClawAPI } from '@/services/openclaw-api'

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => OpenClawAPI.listSessions(),
    refetchInterval: 30000, // 每30秒刷新，减少轮询频率
    staleTime: 10000, // 10秒内数据视为新鲜
  })
}

export function useSpawnAgent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (task: string) => OpenClawAPI.spawnAgent(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export function useExecCommand() {
  return useMutation({
    mutationFn: (command: string) => OpenClawAPI.execCommand(command),
  })
}

export function useMemorySearch() {
  return useMutation({
    mutationFn: (query: string) => OpenClawAPI.searchMemory(query),
  })
}
