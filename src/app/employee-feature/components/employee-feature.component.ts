import { Component, OnInit, } from '@angular/core';
import { searchOutline, listOutline, homeOutline } from 'ionicons/icons';
import { IonContent, IonFooter, IonToolbar, IonTitle, IonIcon, IonHeader, IonCol, IonGrid, IonRow, IonButton, IonButtons, IonTabs, IonTabBar, IonTabButton, IonActionSheet } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IEmployeeFeatureState } from '../ngrx/state';
import { EmployeeFeatureAction } from '../ngrx/actions';
import { ListComponent } from './list/list.component';
import { Observable } from 'rxjs';
import { hasOperation } from '../ngrx/selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'employee-feature',
  templateUrl: './employee-feature.component.html',
  styleUrls: ['./employee-feature.component.scss'],
  standalone: true,
  imports: [NgIf, IonActionSheet, IonTabs, IonTabButton, IonTabBar, IonTabs, IonButtons, IonButton, IonRow, IonGrid, IonCol, IonHeader, IonIcon,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonContent,
    RouterLink, RouterOutlet, RouterModule, ListComponent, AsyncPipe
  ]
})
export class EmployeeFeatureComponent implements OnInit {

  _hasOperation$!: Observable<boolean>;
  constructor(private store: Store<IEmployeeFeatureState>) {
    addIcons({ searchOutline, listOutline, homeOutline })
    this._hasOperation$ = store.select(hasOperation);
  }

  ngOnInit() { }

  navigate(path: string[]) {
    this.store.dispatch({ type: EmployeeFeatureAction.Navigate, path: path });
  }


}
