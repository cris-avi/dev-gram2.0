import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const apiKey = environment.firebaseConfig.apiKey

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
