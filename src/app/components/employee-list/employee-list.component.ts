import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/common/dto/Employee';
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { IonCard, IonBadge, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonItem, IonLabel, IonText, IonToolbar, IonButton, IonIcon, IonActionSheet, IonSearchbar, IonModal, IonList } from "@ionic/angular/standalone";
import { DatePipe } from '@angular/common';
import { ellipsisVerticalOutline, filterOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { SearchbarInputEventDetail } from '@ionic/angular';
import { ISearchbarCustomEvent } from 'src/app/common/ISearchbarCustomEvent'
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/Infrastructure/state management/store/AppState';
import { StoreActionTypes } from 'src/app/Infrastructure/state management/store/StoreActionTypes';
import { selectEmployeeList, selectEmployeeList_ActionSheetEntity, selectEmployeeList_ActionSheetIsOpen, selectEmployeeList_Count, selectEmployeeList_Filtered, selectEmployeeList_ModalEntity, selectEmployeeList_ModalIsOpen } from 'src/app/Infrastructure/state management/store/EmployeeListSelectors';
import { JsonPipe } from '@angular/common';
import { EntityOperation } from 'src/app/common/EntityOperation';
import { IActionSheetButton } from 'src/app/common/IActionSheetButton';
import { ConfirmDeleteModalComponent } from '../modal/confirm-delete-modal.component';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [ConfirmDeleteModalComponent, IonList, IonModal, JsonPipe, IonSearchbar, IonActionSheet, IonIcon, IonButton, IonToolbar, IonText, IonLabel, IonItem, IonContent, IonBadge, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, NgFor, AsyncPipe, DatePipe,]
})
export class EmployeeListComponent implements OnInit {

  _filter$ = new Subject<string | undefined | null>;
  _list$!: Observable<Employee[]>;
  _listCount$!: Observable<number>;
  _listFiltered$!: Observable<Employee[]>;
  _actionSheetIsOpen$!: Observable<boolean>;
  _actionSheetEntity$!: Observable<Employee>;
  _actionSheetButtons: IActionSheetButton[];
  _modalIsOpen$!: Observable<boolean>;
  _modalEntity$!: Observable<Employee>;

  constructor(private store: Store<IAppState>) {

    //list
    this._list$ = store.select(selectEmployeeList);
    this._listCount$ = store.select(selectEmployeeList_Count);
    this._listFiltered$ = store.select(selectEmployeeList_Filtered);
    this._actionSheetIsOpen$ = store.select(selectEmployeeList_ActionSheetIsOpen);
    this._modalIsOpen$ = store.select(selectEmployeeList_ModalIsOpen);

    store.dispatch({ type: StoreActionTypes.EmployeeList_Load });

    //icons 
    addIcons({ ellipsisVerticalOutline, filterOutline });

    //actionsheet
    this._actionSheetButtons = [
      { text: "delete", cssClass: "", data: EntityOperation.DeleteRequest },
      { text: "edit", cssClass: "", data: EntityOperation.Update },
      { text: "cancel", cssClass: "", data: "" }
    ];

  }

  ngOnInit() { }

  /* openMenu()
   * Employee
   * @param employee
   */
  async openActionSheet(emp: Employee) {
    this.store.dispatch({ type: StoreActionTypes.EmployeeList_OpenActionSheet, payload: emp });
  }

  /** filterDebounce
   * @param event 
   */
  filterDebounce(event: ISearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.store.dispatch({ type: StoreActionTypes.EmployeeList_Filter, payload: event.detail.value });
  }

  /*
  FilterCancel
   */
  filterCancel() {
    this.store.dispatch({ type: StoreActionTypes.EmployeeList_Filter, payload: "" });
  }

  /*
  actionSheetDismiss
   */
  actionSheetDismiss(ev: any) {

    //close sheet
    this.store.dispatch({ type: StoreActionTypes.EmployeeList_ActionSheetClose });

    if (ev.detail.data !== null && ev.detail.data !== "") //NOT cancel or backdrop clicked
      switch (ev.detail.data) {
        case EntityOperation.DeleteRequest:
          this.store.dispatch({ type: StoreActionTypes.EmployeeList_DeleteRequest }); break;
        case EntityOperation.Update:
          break;
      }
  }

  /**
   * ModalDismiss
   * @param ev IModalCustomEvent< OverlayEventDetail<any> > event payload
   */
  modalDismiss(ev: any) {
    this.store.dispatch({ type: StoreActionTypes.EmployeeList_ModalDismiss });
  }
}
