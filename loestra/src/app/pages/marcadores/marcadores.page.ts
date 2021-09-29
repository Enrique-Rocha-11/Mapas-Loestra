import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MapasService } from 'src/app/services/mapas.service';
import { ActivatedRoute } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.page.html',
  styleUrls: ['./marcadores.page.scss'],
})
export class MarcadoresPage implements OnInit {

  public MapaR: Mapboxgl.Map;
  public Marcador: Mapboxgl.Marker;
  public KeyMapbox = environment.key;

  public inicio = {

    lng: -100.6598155,
    lat: 24.0816555,
    
  }

  constructor( private coordService: MapasService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    ( Mapboxgl as any ).accessToken = this.KeyMapbox
    this.MapaR = new Mapboxgl.Map({
    container: 'mapa-rastreo', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.inicio.lng, this.inicio.lat ], // starting position // LNG , LAT 
    zoom: 8.5, // starting zoom
    
    });


  }


  crearMarcadores(){


    this.coordService.sucursalesCdmx("cdmx").subscribe(res =>{


      
    })

  }




}
