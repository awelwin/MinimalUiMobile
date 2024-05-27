import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, Router, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/ROUTING';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QueryService } from './app/services/QueryService';
import { RepositoryServiceFactory } from './app/services/RepositoryServiceFactory';
import { ModalController } from '@ionic/angular';

//Factory methods
export function getRepositoryServiceFactory(http: HttpClient) {
  return new RepositoryServiceFactory(http, environment.serviceUri);
}
export function QueryServiceFactory(http: HttpClient, restService: QueryService) {
  return new QueryService(http, environment.serviceUri);
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    Router,
    ModalController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: QueryService, useFactory: QueryServiceFactory, deps: [HttpClient] },
    { provide: RepositoryServiceFactory, useFactory: getRepositoryServiceFactory, deps: [HttpClient] },
    provideIonicAngular(),
    provideRouter(routes),
  ],
});
