import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, } from '@angular/common';
import { IonSearchbar, IonContent, IonList, IonItem, IonLabel, IonIcon, IonNote } from "@ionic/angular/standalone";
import { Observable } from 'rxjs';
import { EmployeeSearchQueryResult } from 'src/app/employee-feature/lib/EmployeeSearchQueryResult';
import { QueryService } from 'src/app/common/service/QueryService';
import { Store } from '@ngrx/store';
import { IEmployeeFeatureState } from '../../ngrx/state';
import { EmployeeFeatureAction } from '../../ngrx/actions';
import { debounce, noResult, results } from '../../ngrx/selectors';

@Component({
  selector: 'employee-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [AsyncPipe, IonNote, IonIcon, IonLabel, IonItem, IonList, IonContent, IonSearchbar, IonContent, NgIf, NgFor],
  standalone: true
})
export class SearchComponent implements OnInit {

  public _debounce$: Observable<string>;
  public _results$!: Observable<EmployeeSearchQueryResult[]>;
  public _noResult$: Observable<boolean>;

  constructor(

    private queryService: QueryService,
    private store: Store<IEmployeeFeatureState>) {

    this._debounce$ = this.store.select(debounce);
    this._results$ = this.store.select(results);
    this._noResult$ = this.store.select(noResult);
  }

  /*
 ngOnInit*/
  ngOnInit() { }

  /* Debounce
   * @param event 
   */
  debounce(event: any) {

    let extractedText: string = event.detail.value;
    if (extractedText)
      this.store.dispatch({ type: EmployeeFeatureAction.SearchDebounce, payload: extractedText })
    else
      this.cancel();
  }

  /**
   * cancel - clear search results
   */
  cancel() {
    this.store.dispatch({ type: EmployeeFeatureAction.SearchCancel, });
  }

  /* searchResultChosen()
   *  sets current entity based on search results clicked
   */
  resultChosen(id: number) {
    this.store.dispatch({ type: EmployeeFeatureAction.SearchResultChosen, payload: id });
  }
}
