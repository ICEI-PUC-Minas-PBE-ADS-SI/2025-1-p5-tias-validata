export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: number
    name: string
    email: string
    type: 'admin' | 'user'
    created_at: Date
    updated_at: Date
  }
}
