import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { IonCard, IonBadge, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonItem, IonLabel, IonText, IonToolbar, IonButton, IonIcon, IonActionSheet, IonSearchbar, IonModal, IonList } from "@ionic/angular/standalone";
import { DatePipe } from '@angular/common';
import { ellipsisVerticalOutline, filterOutline, funnelOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { SearchbarInputEventDetail } from '@ionic/angular';
import { ISearchbarCustomEvent } from 'src/app/common/ionic/ISearchbarCustomEvent'
import { Subject, } from 'rxjs';
import { Store } from '@ngrx/store'
import { IEmployeeFeatureState, IForm } from 'src/app/employee-feature/ngrx/state';
import { EmployeeFeatureAction } from 'src/app/employee-feature/ngrx/actions';
import { list, actionSheetIsOpen, count, filtered, modalIsOpen, actionSheetButtons, employee } from 'src/app/employee-feature/ngrx/selectors';
import { JsonPipe } from '@angular/common';
import { EntityOperation } from 'src/app/common/EntityOperation';
import { IActionSheetButton } from 'src/app/common/ionic/IActionSheetButton';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [ConfirmDeleteModalComponent, IonList, IonModal, JsonPipe, IonSearchbar, IonActionSheet, IonIcon, IonButton, IonToolbar, IonText, IonLabel, IonItem, IonContent, IonBadge, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, NgFor, AsyncPipe, DatePipe,]
})
export class ListComponent implements OnInit {

  //THESE VARIABLES TO BE MOVED TO LOCAL COMPONENT STATE TODO..
  _filter$ = new Subject<string | undefined | null>;
  _list$!: Observable<Employee[]>;
  _listCount$!: Observable<number>;
  _listFiltered$!: Observable<Employee[]>;
  _actionSheetIsOpen$!: Observable<boolean>;
  _actionSheetEntity$!: Observable<Employee>;
  _actionSheetButtons$: Observable<IActionSheetButton<IForm<Employee>>[]>;
  _modalIsOpen$!: Observable<boolean>;
  _modalEntity$!: Observable<Employee>;

  constructor(private store: Store<IEmployeeFeatureState>) {

    //list
    this._list$ = store.select(list);
    this._listCount$ = store.select(count);
    this._listFiltered$ = store.select(filtered);
    this._actionSheetIsOpen$ = store.select(actionSheetIsOpen);
    this._modalIsOpen$ = store.select(modalIsOpen);
    this._actionSheetButtons$ = store.select(actionSheetButtons);
    store.dispatch({ type: EmployeeFeatureAction.Load });

    //icons 
    addIcons({ ellipsisVerticalOutline, filterOutline, funnelOutline });

  }

  ngOnInit() { }

  /* openMenu()
   * Employee
   * @param employee
   */
  async openActionSheet(emp: Employee) {
    this.store.dispatch({ type: EmployeeFeatureAction.OpenActionSheet, payload: emp });
  }

  /** filterDebounce
   * @param event 
   */
  filterDebounce(event: ISearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.store.dispatch({ type: EmployeeFeatureAction.Filter, payload: event.detail.value });
  }

  /*
  FilterCancel
   */
  filterCancel() {
    this.store.dispatch({ type: EmployeeFeatureAction.Filter, payload: "" });
  }


  actionSheetDismiss(op: IForm<Employee>) {
    this.store.dispatch({ type: EmployeeFeatureAction.ActionSheetClose })

    if (op) {
      switch (op.operation) {
        case EntityOperation.Update: this.store.dispatch({ type: EmployeeFeatureAction.EditRequest, payload: op.entity });
          break;
        case EntityOperation.DeleteRequest: this.store.dispatch({ type: EmployeeFeatureAction.DeleteRequest, payload: op.entity }); break;
      }
    }
  }

  /**
   * ModalDismiss
   * @param ev IModalCustomEvent< OverlayEventDetail<any> > event payload
   */
  modalDismiss(ev: any) {
    this.store.dispatch({ type: EmployeeFeatureAction.ModalDismiss });
  }


}
