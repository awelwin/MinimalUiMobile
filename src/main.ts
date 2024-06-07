import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, Router, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/components/app/app.component';
import { environment } from './environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QueryService } from './app/Infrastructure/QueryService';
import { RepositoryServiceFactory } from './app/Infrastructure/RepositoryServiceFactory';
import { ModalController } from '@ionic/angular';
import { provideStore } from '@ngrx/store';
import { EmployeeListReducer } from './app/Infrastructure/ngrx/EmployeeList_Reducers';
import { RouteConfig } from './ROUTES';
import { EmployeeListEffects } from './app/Infrastructure/ngrx/EmployeeList_Effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { getRouterSelectors, provideRouterStore, routerReducer } from '@ngrx/router-store';



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

    //ionic
    importProvidersFrom(HttpClientModule),
    ModalController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),

    //services
    { provide: QueryService, useFactory: QueryServiceFactory, deps: [HttpClient] },
    { provide: RepositoryServiceFactory, useFactory: getRepositoryServiceFactory, deps: [HttpClient] },

    //router
    provideRouter(RouteConfig),
    Router,

    // ngrx state management
    provideStore({
      EmployeeList: EmployeeListReducer,
      router: routerReducer
    }),
    provideRouterStore(),
    provideEffects(EmployeeListEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ],
});
