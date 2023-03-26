import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../hooks/useAuth'
import { AuthService } from '../../../services/auth/auth.service'

export const useMe = () => {
  const currentUser = useAuth()

  const { data, isLoading, refetch, isFetching } = useQuery(
    ['me'],
    () => AuthService.getMe(),
    {
      select: ({ data }) => data,
      enabled: !!currentUser,
    }
  )
  const userData = data?._id === currentUser ? data : undefined

  return { userData, isLoading, isFetching, refetch }
}
