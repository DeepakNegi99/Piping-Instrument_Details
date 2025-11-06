import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PublicClientApplication, EventType, AccountInfo } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { store } from './store/store';
import { msalConfig } from './msalConfig';
import 'antd/dist/reset.css';

const pca = new PublicClientApplication(msalConfig);

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    const account = event.payload && (event.payload as any).account as AccountInfo | undefined;
    if (account) {
      pca.setActiveAccount(account);
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MsalProvider>
  </React.StrictMode>
);
