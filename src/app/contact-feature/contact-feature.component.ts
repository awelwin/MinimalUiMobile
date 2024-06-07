import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
@Component({
  selector: 'app-contact',
  templateUrl: './contact-feature.component.html',
  styleUrls: ['./contact-feature.component.scss'],
  imports: [IonContent],
  standalone: true
})
export class ContactFeatureComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
