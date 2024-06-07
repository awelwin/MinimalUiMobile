import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, Router, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QueryService } from './app/common/service/QueryService';
import { RepositoryServiceFactory } from './app/common/service/RepositoryServiceFactory';
import { ModalController } from '@ionic/angular';
import { provideStore } from '@ngrx/store';
import { employeeListReducer, employeeReducer } from './app/employee-feature/ngrx/reducers';
import { RouteConfig } from './ROUTES';
import { EmployeeListEffects } from './app/employee-feature/ngrx/effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';



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
      EmployeeList: employeeListReducer,
      Employee: employeeReducer,
      router: routerReducer
    }),
    provideRouterStore(),
    provideEffects(EmployeeListEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ],
});
