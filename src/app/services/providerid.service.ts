import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvideridService {
  code: string = '';
  client_id: string = '01946440-ff64-7797-9c16-ad7e5f1b149c';
  redirect_uri: string = 'http://localhost:4200';
  access_token: string = '';
  mophUrl: string = `https://moph.id.th/oauth/redirect?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;
  constructor(private http: HttpClient) {}

  getCodeFromMophID() {
    this.http.get(this.mophUrl);
  }
  getOAUTHMophID(): Observable<any> {
    const client_id: string = '01946440-ff64-7797-9c16-ad7e5f1b149';
    const redirect_uri: string = 'http://localhost:4200/home';
    const response_type: string = 'code';
    const mophUrl: string = 'https://moph.id.th/oauth/redirect?';

    return this.http.get(
      `${mophUrl}client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
    );
  }

  /** STEP 2 Get access_token */
  getAccessTokenHealthID(code: string): Observable<any> {
    const healthData = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:4200/home',
      client_id: '01946440-ff64-7797-9c16-ad7e5f1b149c',
      client_secret: 'c9bfce825a0eca4b5994a55276f4818c0bacbb03',
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('https://moph.id.th/api/v1/token', healthData, {
      headers: headers,
    });
  }

  /** Get Access Token Provider ID*/
  getAccessTokenProviderID(access_token: string): Observable<any> {
    const opts = {
      client_id: 'e3487f7f-d8b6-4cd3-a28f-3941780ad5ff',
      secret_key: 'NJjzR60GVyvOOEpAIWOLGzvYeodsE8xD',
      token_by: 'Health ID',
      token: access_token,
    };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(
      'https://provider.id.th/api/v1/services/token',
      opts,
      { headers: headers },
    );
  }

  /** Get Profile */
  getProfileProviderID(provider_access_token: string): Observable<any> {
    const position_type: number = 1;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + provider_access_token,
      'client-id': 'e3487f7f-d8b6-4cd3-a28f-3941780ad5ff',
      'secret-key': 'NJjzR60GVyvOOEpAIWOLGzvYeodsE8xD',
    });
    return this.http.get(
      `https://provider.id.th/api/v1/services/profile?position_type=${position_type}`,
      {
        headers: headers,
      },
    );
  }
}
