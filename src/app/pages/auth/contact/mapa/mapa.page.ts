import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment.prod';
const apiKey = environment.firebaseConfig.apiKey;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapaPage implements OnInit {

  map: GoogleMap;
  
  constructor() { }

  ionViewDidEnter() {
    this.initMap();
  }

  ngOnInit() {
  }

  async initMap(){
    
    this.map = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: document.getElementById('map'), // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  }

}