import router from '@/router'

export const auth = {
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  },

  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  getToken() {
    return localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}
