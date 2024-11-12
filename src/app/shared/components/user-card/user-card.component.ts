import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
// export class UserCardComponent  implements OnInit {
export class UserCardComponent {


  @Input() user: any; // Aquí recibes el perfil del usuario

  // ngOnInit() { 
  // }

}
