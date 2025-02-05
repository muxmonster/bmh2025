import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideAppInitializer,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { provideHttpClient } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';
import { firstValueFrom } from 'rxjs';

export function initializeApp(appConfig: AppConfigService) {
  return () => firstValueFrom(appConfig.loadConfig());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    provideHttpClient(),
    importProvidersFrom(AppConfigService),
    provideAppInitializer(async () => {
      const appConfigService = inject(AppConfigService);
      return firstValueFrom(appConfigService.loadConfig()).then((config) => {
        appConfigService.setConfig(config); // ⭐️ เก็บค่าที่โหลดได้
      });
    }),
  ],
};
