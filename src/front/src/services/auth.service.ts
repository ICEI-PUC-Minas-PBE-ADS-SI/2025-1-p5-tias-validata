import api from '@/lib/axios'
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth'

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data)

    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      ...data,
      type: 'admin',
    })

    return response.data
  },
}
