import { Component, inject, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
// export class HeaderComponent  implements OnInit {
export class HeaderComponent {

  @Input() title!: string;
  @Input() MenuButton: boolean=false;
  @Input() BackButton!: string;
  @Input() SignOutButton: boolean=false;
  @Input() SearchBar: boolean=false;

  firebaseSvc = inject(FirebaseService);
  constructor() { }

  // ngOnInit() {}

  

  singOut(){

    this.firebaseSvc.singOut();
  }

}
