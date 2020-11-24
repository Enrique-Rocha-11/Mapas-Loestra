import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {


  public KeyMapbox = "pk.eyJ1IjoiZXJvY2hhIiwiYSI6ImNraGg2bGF1ejBnZm0zMW5xZDNpdjN5bGMifQ.NubM8HiAgxiz1jyFEGB_Ig";
  public mapa: Mapboxgl.Map;
  public Marcador: Mapboxgl.Marker;
  public inicio = {

    lng: -99.0977405,
    lat: 19.2506437,
    
  }

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){


  ( Mapboxgl as any ).accessToken = this.KeyMapbox
  this.mapa = new Mapboxgl.Map({
  container: 'mapa-Ruta', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [ this.inicio.lng, this.inicio.lat ], // starting position // LNG , LAT 
  zoom: 15 // starting zoom
  });


  this.DragMarker(this.inicio.lng, this.inicio.lat);
  }


  DragMarker( lat: number, lng: number){

    this.Marcador = new Mapboxgl.Marker({
      draggable: true,
      
      })
      .setLngLat([lat, lng])
      .addTo(this.mapa);


    this.Marcador.on('drag', () =>{

    console.log(this.Marcador.getLngLat());

    })

   

  }

}
