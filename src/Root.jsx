import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import App from './App.jsx'
import { apiUrl, googleClientId } from './config/auth.js'

function Root() {
  const [configuredGoogleClientId, setConfiguredGoogleClientId] = useState(googleClientId)

  useEffect(() => {
    if (googleClientId) return

    fetch(`${apiUrl}/auth/google-config`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setConfiguredGoogleClientId(data?.clientId || undefined))
      .catch(() => setConfiguredGoogleClientId(undefined))
  }, [])

  const app = <App googleSignInEnabled={Boolean(configuredGoogleClientId)} />
  return configuredGoogleClientId
    ? <GoogleOAuthProvider clientId={configuredGoogleClientId}>{app}</GoogleOAuthProvider>
    : app
}

export default Root
