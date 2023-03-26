import instance from '../../api/interceptors'
import { getUserUrl } from '../../config/api.config'
import { IProfileUpdateProps, IUsersProps } from '../../shared/types/api.types'
import { UserDto, UsersDto } from '../../shared/types/user.types'

export const UserService = {
  async getUsers({ term, limit, page, isFriends }: IUsersProps) {
    const a = page ? `page=${page}` : ''
    const b = isFriends ? `&friend=${isFriends}` : ''
    const c = term ? `&term=${term}` : ''
    const d = limit ? `&limit=${limit}` : ''
    const query = a + b + c + d

    const response = await instance.get<UsersDto>(
      getUserUrl(`/get-users/?${query}`)
    )
    return response
  },
  async updateUserProfile(profile: IProfileUpdateProps) {
    const response = await instance.patch<UserDto>(getUserUrl('/profile'), {
      ...profile,
    })
    return response
  },
  async uploadPhoto(formData: FormData) {
    const response = await instance.post<UserDto>(
      getUserUrl('/photo'),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response
  },
}
