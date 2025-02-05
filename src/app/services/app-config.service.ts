import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: any = {};
  private http = inject(HttpClient);

  loadConfig(): Observable<any> {
    return this.http.get('assets/config.json');
  }

  setConfig(config: any) {
    this.config = config;
  }

  getConfig(): any {
    if (!this.config) {
      throw new Error('Config not loaded yet!'); // 🔥 แจ้ง error ถ้าโหลดไม่สำเร็จ
    }
    return this.config;
  }
}
