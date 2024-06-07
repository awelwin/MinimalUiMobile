import { Component, Inject } from '@angular/core';
import { IonMenuToggle, IonToolbar, IonTitle, IonContent, IonMenu, IonHeader, IonButtons, IonMenuButton, IonFooter, IonList, IonItem, IonLabel, IonIcon, IonButton, IonApp } from '@ionic/angular/standalone';
import { EmployeeFeatureComponent } from './employee-feature/components/employee-feature.component';
import { personOutline, people, callOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule, RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonApp, IonButton, IonIcon, IonLabel, IonItem, IonList,
    IonFooter,
    IonButtons,
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    IonMenu,
    EmployeeFeatureComponent,
    IonMenuButton,
    IonMenuToggle,
    RouterModule, RouterLink, RouterOutlet
  ],
})
export class AppComponent {

  @Inject(Router)
  private router!: Router;

  constructor() {
    addIcons({ personOutline, people, callOutline })
  }
  public navigateToEmployees() {
    this.router.navigate(["/employees"]);
  }

}
