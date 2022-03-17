import { AuthConfig } from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://eform-sso.herokuapp.com/auth/realms/master',
  redirectUri: window.location.origin + "/login",
  clientId: 'eform',
  responseType: 'code',
  scope: 'openid profile email offline_access'
};

export const environment = {
  production: false,
  oauth2Config: authCodeFlowConfig,
  apiUrl: "http://localhost:8080"
};
