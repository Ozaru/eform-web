import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(environment.oauth2Config);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  async fazerLogin() {
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      await this.oauthService.loadUserProfile();
    } catch (error) {
      this.oauthService.initLoginFlow();
    }
  }

  fazerLogout() {
    this.oauthService.logOut();
  }

  isLogado(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get userName(): string | null {
    const login: any = this.oauthService.getIdentityClaims();
    return login['preferred_username'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

}
