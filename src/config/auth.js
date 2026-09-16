export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim()

// The example value is deliberately not treated as a usable Google credential.
export const googleClientId = clientId?.includes('your-google-oauth-client-id')
  ? undefined
  : clientId
