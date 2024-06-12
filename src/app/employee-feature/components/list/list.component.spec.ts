
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, IonSearchbar, IonCard } from '@ionic/angular';
import { ListComponent } from './list.component';
import { Employee } from '../../lib/Employee';
import { of } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { employeeListReducer, employeeReducer, employeeSearchReducer } from '../../ngrx/reducers';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { RepositoryServiceFactory } from 'src/app/common/service/RepositoryServiceFactory';
import { By } from '@angular/platform-browser';
import { DebugElement, Input } from '@angular/core';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { EmployeeListEffects } from '../../ngrx/effects';
import { RouteReuseStrategy, Router, provideRouter } from '@angular/router';
import { RouteConfig } from 'src/ROUTES';
import { ModalController } from '@ionic/angular';
import { QueryService } from 'src/app/common/service/QueryService';
import { SearchbarInputEventDetail } from '@ionic/angular';
import { ISearchbarCustomEvent } from 'src/app/common/ionic/ISearchbarCustomEvent'

//NOTE: This code tests all NGRX artifacts as black box and does not mock any NGRX classes
//this allows us to interation test NGRX and get return on investment.

//Default Mocks
const mockRepo = jasmine.createSpyObj('RepositoryService', ['get']);
const mockRepoFactory = jasmine.createSpyObj('RepositoryServiceFactory', ['getInstance']);
const mockQueryService = jasmine.createSpyObj('QueryService', ['searchEmployee']);

//Default Providers
let defaultProviders = [
  { provide: RepositoryServiceFactory, useValue: mockRepoFactory }, //Mock repository
  { provide: QueryService, useValue: mockQueryService },
  provideStore({ EmployeeList: employeeListReducer, }),
  provideIonicAngular(),
  ModalController,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideRouter(RouteConfig),
  Router,
  provideStore({
    EmployeeList: employeeListReducer, Employee: employeeReducer, EmployeeSearch: employeeSearchReducer, router: routerReducer
  }),
  provideRouterStore(),
  provideEffects(EmployeeListEffects),
]

//DEFAULT STATE
const DEFAULT_EXPECTED: Employee[] = [
  { id: 1, resourceName: '', firstname: 'first1', lastname: 'last1', age: 29, created: new Date(), updated: new Date(), taxFile: { id: 1, alias: 'taxfile1', employeeId: 2, created: new Date(), updated: new Date(), resourceName: '', taxFileRecords: [] } } as Employee,
  {
    id: 2, resourceName: '', firstname: 'first2', lastname: 'last2', age: 30, created: new Date(), updated: new Date(), taxFile: {
      id: 1, alias: 'taxfile1', employeeId: 2, created: new Date(), updated: new Date(), resourceName: '', taxFileRecords: [
        { resourceName: "", id: 0, financialYear: 1999, amountPaid: 5, amountClaimed: 6, taxFileId: 1, created: new Date(), updated: new Date() }
      ]
    }
  } as Employee
]
mockRepo.get.and.returnValue(of(DEFAULT_EXPECTED));
mockRepoFactory.getInstance.and.returnValue(mockRepo);

//--------------------------------------------

describe('EmployeeListComponent_Load', () => {

  // <<< ARRANGE >>>
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [IonicModule.forRoot()], providers: defaultProviders }).compileComponents();

    // <<< ACT >>>

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // <<< ASSERT >>>

  it('should load list', () => {
    let debug: DebugElement = fixture.debugElement;
    expect(component).toBeTruthy();
    let ACTUAL = debug.queryAll(By.css('ion-card')).length;
    console.log(ACTUAL);
    expect(ACTUAL).toEqual(DEFAULT_EXPECTED.length)
  });

  it('should display TaxFileRecord Count', () => {
    let debug: DebugElement = fixture.debugElement;
    let card = debug.queryAll(By.css('ion-card'))[0];
    let ACTUAL = Number(debug.query(By.css('ion-badge')).nativeElement.textContent);
    expect(ACTUAL).toEqual(DEFAULT_EXPECTED[0].taxFile.taxFileRecords.length)
  });
});

//-------------------------------------------------
//NOTE: CANT GET ACCESS TO IONIC SEARCHBAR INPUT FOR UNKNOWN REASON.
//BYPASSING TEMPLATE AND CALLING COMPONENT FUNCTION INSTEAD

describe('EmployeeListComponent_Filter', () => {

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(
      {
        imports: [IonicModule.forRoot()],
        providers: defaultProviders,
      }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should filter list', () => {

    // <<< ARRANGE >>>
    //before(Expect 2)

    let debug: DebugElement = fixture.debugElement;
    let ACTUAL = debug.queryAll(By.css('ion-card')).length;
    expect(ACTUAL).toEqual(DEFAULT_EXPECTED.length)

    // <<< ACT >>>

    let INPUT = "first1";
    let event = {
      detail: { value: INPUT },
      target: {}
    } as ISearchbarCustomEvent<SearchbarInputEventDetail>;
    component.filterDebounce(event);
    fixture.detectChanges();

    // <<< ASSERT >>>

    ACTUAL = debug.queryAll(By.css('ion-card')).length;
    expect(ACTUAL).toEqual(1);

  });

  it('should cancel filter', () => {

    // <<< ARRANGE >>>
    let debug: DebugElement = fixture.debugElement;
    let INPUT = "first1";
    let event = {
      detail: { value: INPUT },
      target: {}
    } as ISearchbarCustomEvent<SearchbarInputEventDetail>;
    component.filterDebounce(event);
    fixture.detectChanges();
    let ACTUAL = debug.queryAll(By.css('ion-card')).length;
    expect(ACTUAL).toEqual(1);


    // <<< ACT >>>

    component.filterCancel();
    fixture.detectChanges();

    // <<< ASSERT >>>

    ACTUAL = debug.queryAll(By.css('ion-card')).length;
    expect(ACTUAL).toEqual(DEFAULT_EXPECTED.length);

  });
});

