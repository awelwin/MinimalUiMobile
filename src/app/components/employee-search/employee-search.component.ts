import { Component, DestroyRef, OnInit } from '@angular/core';
import { NgIf, NgFor, } from '@angular/common';
import { IonSearchbar, IonContent, IonList, IonItem, IonLabel, IonIcon, IonNote } from "@ionic/angular/standalone";
import { Subject } from 'rxjs';
import { EmployeeSearchQueryResult } from 'src/app/lib/EmployeeSearchQueryResult';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryService } from 'src/app/services/QueryService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
  imports: [IonNote, IonIcon, IonLabel, IonItem, IonList, IonContent, IonSearchbar, IonContent, NgIf, NgFor],
  standalone: true
})
export class EmployeeSearchComponent implements OnInit {

  public _search: string = "";
  public _searchResults: EmployeeSearchQueryResult[] = [];
  public searchSubject: Subject<any> = new Subject();
  public _searchNoResult: boolean = false;

  constructor(
    private destroyRef: DestroyRef,
    private queryService: QueryService,
    private router: Router, private route: ActivatedRoute) { }


  /*
 ngOnInit*/
  ngOnInit() {

    //Subsribe to  keystrokes
    this.searchSubject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {

          //cancel search
          if (this._search == "") {
            this._searchResults = [];
            this._searchNoResult = false;
          }
          else {
            //execute search
            this.queryService.searchEmployee(this._search)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (result) => {
                  this._searchResults = result; //save results                 
                  this._searchNoResult = this._searchResults.length < 1;
                },
                error: (err) => console.log(err)
              });
          }
        },
        error: (err) => console.log(err)
      });

  }

  /* Debounce
   * @param event 
   */
  searchDebounce(event: any) {
    let extractedText: string = event.detail.value;

    this._search = extractedText;
    this.searchSubject.next(this._search);
  }

  /* searchResultChosen()
   *  sets current entity based on search results clicked
   */
  searchResultChosen(id: number) {

    //cleanup state
    this._searchResults = [];
    this._search = "";
    this._searchNoResult = false;

    //route to employee
    this.router.navigate(['/employees/employee', id],)
  }
}
