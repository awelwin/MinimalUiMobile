import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [IonContent],
  standalone: true
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
