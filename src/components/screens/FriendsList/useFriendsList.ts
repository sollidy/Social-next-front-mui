import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { UserService } from '../../../services/user/user.service'
import { IUsersProps } from '../../../shared/types/api.types'

export const useFriendsList = () => {
  const [filter, setFilter] = useState<IUsersProps>({
    term: undefined,
    limit: undefined,
    page: 1,
    isFriends: false,
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)

  const { data: usersList, isLoading } = useQuery(
    ['getUserStaticProps', filter],
    () => UserService.getUsers({ ...filter })
  )

  useEffect(() => {
    if (usersList?.totalPages) setTotalPages(usersList?.totalPages)
  }, [usersList?.totalPages])

  const setQueryFilter = (props: IUsersProps) => {
    setFilter((prev) => ({ ...prev, ...props }))
  }

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    setQueryFilter({ page: value })
  }

  const onSubmit: SubmitHandler<{ term: string; isFriends: boolean }> = ({
    term,
    isFriends,
  }) => {
    setQueryFilter({ term, page: 1, isFriends })
    setCurrentPage(1)
  }

  return {
    usersList,
    isLoading,
    currentPage,
    totalPages,
    changePage,
    onSubmit,
  }
}