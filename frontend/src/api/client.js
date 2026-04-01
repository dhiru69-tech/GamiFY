import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 65000, // 65s timeout for sleeping Render server wake-up
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('g_access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = localStorage.getItem('g_refresh')
        if (!refresh) throw new Error('no refresh')
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refresh_token: refresh },
          { timeout: 65000 }
        )
        localStorage.setItem('g_access', data.access_token)
        localStorage.setItem('g_refresh', data.refresh_token)
        original.headers.Authorization = `Bearer ${data.access_token}`
        return api(original)
      } catch {
        localStorage.removeItem('g_access')
        localStorage.removeItem('g_refresh')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

// Pre-warm the backend server (call on app load)
export const wakeServer = async () => {
  try {
    await axios.get(`${BASE_URL}/ping`, { timeout: 65000 })
  } catch { /* ignore */ }
}

export default api
