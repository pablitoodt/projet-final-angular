import { ApplicationConfig, LOCALE_ID, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import fr from "@angular/common/locales/fr";

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@/interceptors/auth/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(fr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor
      ])
    ),
    {
      provide: LOCALE_ID,
      useValue: "fr-FR"
    },
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 4000,
      preventDuplicates: true,
    }),
  ]
};
