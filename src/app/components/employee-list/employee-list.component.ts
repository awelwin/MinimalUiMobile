import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/lib/Employee';
import { IActionSheetOptions } from 'src/app/lib/IActionSheetOptions';
import { IActionSheetButton, Role } from 'src/app/lib/IActionSheetButton';
import { RepositoryService } from 'src/app/services/RepositoryService';
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { RepositoryServiceFactory } from 'src/app/services/RepositoryServiceFactory';
import { IonCard, IonBadge, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonItem, IonLabel, IonText, IonToolbar, IonButton, IonIcon, IonActionSheet } from "@ionic/angular/standalone";
import { DatePipe } from '@angular/common';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { OverlayEventDetail, IonActionSheetCustomEvent } from '@ionic/core';
import { ActionSheetActionType } from 'src/app/lib/ActionSheetActionType';
import { Router } from '@angular/router';
import { YesNoActionComponent } from '../modal/yes-no-action.component';
import { ModalAction } from '../modal/ModalAction';
import { ActionType } from 'src/app/lib/ActionType';
import { ModalRole } from '../modal/ModalRole';
import { Subject, merge, startWith, switchMap } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [IonActionSheet, IonIcon, IonButton, IonToolbar, IonText, IonLabel, IonItem, IonContent, IonBadge, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, NgFor, AsyncPipe, DatePipe]
})
export class EmployeeListComponent implements OnInit {

  //UI Events
  _list$!: Observable<Employee[]>;
  _createClick$ = new Subject<Employee>;
  _updateClick$ = new Subject<Employee>;
  _deleteClick$ = new Subject<Employee>;

  //User Actions
  _create$!: Observable<Employee>;
  _update$!: Observable<Employee>;
  _delete$!: Observable<HttpEvent<any>>;
  _userAction$!: Observable<any>;

  _repo!: RepositoryService<Employee>;
  _menuButtons: IActionSheetButton[];
  _menuOptions!: IActionSheetOptions;

  constructor(
    private repositoryServiceFactory: RepositoryServiceFactory,
    private menuActionSheet: ActionSheetController,
    private router: Router,
    private modalCtrl: ModalController) {

    addIcons({ ellipsisVerticalOutline });
    this._repo = this.repositoryServiceFactory.getInstance<Employee>(Employee);

    //Reactive UI Setup
    this._delete$ = this._deleteClick$.pipe(
      switchMap(entity => this._repo.delete(entity.id))
    );
    this._create$ = this._createClick$.pipe(
      switchMap(entity => this._repo.post(entity))
    )
    this._update$ = this._createClick$.pipe(
      switchMap(entity => this._repo.post(entity))
    )
    this._userAction$ = merge(this._create$, this._update$, this._delete$);

    this._list$ = this._userAction$.pipe(
      startWith(null),
      switchMap(x => this._repo.get())
    );


    this._menuButtons =
      [
        {
          text: 'Delete',
          role: Role.DESTRUCTIVE,
          data: {
            action: 'delete',
          },
          cssClass: 'action-sheet-button-delete'
        },
        {
          text: 'Edit',
          data: {
            action: 'edit',
          },
          cssClass: 'action-sheet-button-cancel'
        },
        {
          text: 'Cancel',
          role: Role.CANCEL,
          data: {
            action: 'cancel',
          },
          cssClass: 'action-sheet-button-cancel'
        },
      ];
  }

  ngOnInit() { }

  /* openMenu()
   * Employee
   * @param employee
   */
  async openMenu(emp: Employee) {

    //create ActionSheet
    const actionSheet = await this.menuActionSheet.create({ buttons: this._menuButtons, });
    actionSheet.present();

    //Subscribe Actionsheet
    actionSheet.onDidDismiss()
      .then((x: OverlayEventDetail<any>) => {

        switch (x.data.action) {

          //DELETE 
          case ActionSheetActionType.DELETE:
            this.confirmDelete(emp).then((result) => {
              if (result) {
                this._deleteClick$.next(emp);
              }
            });
            break;

          //EDIT 
          case ActionSheetActionType.EDIT:
            this.router.navigateByUrl("employees/employee/" + emp.id);
            break;
        }
      })
  }

  /**
   * Confirm Delete using Modal
   * @param emp 
   */
  async confirmDelete(emp: Employee): Promise<boolean> {

    let confirmed: boolean = false;

    //input
    let action = <ModalAction<Employee>>({
      payload: emp,
      actionType: ActionType.Delete,
      title: 'confirm delete',
      message: 'warning. This operation cannot be undone. Continue?'
    });

    //create modal 
    const modalInstance = await this.modalCtrl.create({
      component: YesNoActionComponent<Employee>,
      componentProps: { 'action': action }
    });
    modalInstance.present();

    //subscribe result
    let result: OverlayEventDetail<any> = await modalInstance.onWillDismiss()
    if (result.role === ModalRole.CONFIRM)
      return true
    else
      return false;
  }
}
