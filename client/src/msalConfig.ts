export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID || '',
    authority: process.env.REACT_APP_MSAL_AUTHORITY || '',
    knownAuthorities: [],
    redirectUri: '/',
    postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: 'localStorage' as const,
    storeAuthStateInCookie: false
  }
};
