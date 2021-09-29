import { Component, OnInit } from '@angular/core';

import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapasService } from 'src/app/services/mapas.service';
//import { $ } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ClassMethod } from '@angular/compiler';

// http://localhost:8100/mapa/RAFALOPEZ,JOSESANABRIA

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {


  public MapaR: Mapboxgl.Map;
  public Marcador: Mapboxgl.Marker;
  public KeyMapbox = environment.key;
  public parametro;
  public OpLista;
  public markers = [];
  public parar = 0;
  public existe:  Mapboxgl.Marker;
  public elementoMark;

  public inicio = {

    lng: -100.6598155,
    lat: 24.0816555,
    
  }

  constructor( private rutaService: MapasService,
    private route: ActivatedRoute) { }

  ngOnInit() {

  }


  ampliarVista(){

    this.MapaR.flyTo({
      center: [this.inicio.lng, this.inicio.lat ],
      zoom: 3.9,
    });

   // this.coordenadas();

  }


  ionViewWillEnter(){


  this.parametro = this.route.snapshot.paramMap.get('usuarios');


  ( Mapboxgl as any ).accessToken = this.KeyMapbox
  this.MapaR = new Mapboxgl.Map({
  container: 'mapa-rastreo', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [this.inicio.lng, this.inicio.lat ], // starting position // LNG , LAT 
  zoom: 8, // starting zoom
  
  });

  this.OpLista = this.parametro.split(',');

  this.coordenadas();

  this.recusividad();

   
  }

  

  

  recusividad() {
  
    setTimeout(() => {
      this.coordenadas();
      this.recusividad(); }, 10000);
    
  }


  coordenadas() {


   // $(".marcador-test").remove();


    this.rutaService.consultarOperadores(this.OpLista).subscribe((res: any) =>{


    //  console.log(res);

      let totalOp = this.OpLista.length;

     // console.log(totalOp);

      for(let operador of res){

        if(this.markers.length < totalOp &&  this.markers.length != totalOp ){

          if(this.markers.length === totalOp){ totalOp +=2; }
    
          this.elementoMark = document.createElement('div');
          this.elementoMark.className = 'marcador-test';
          this.elementoMark.innerHTML = `<div class="fondo"></div>`;
          const fondo = this.elementoMark.children[0];
          fondo.innerHTML = `<img src="${operador.foto}">`;
  
          this.elementoMark.addEventListener('click', () => {
           
            this.MapaR.flyTo({
              center: [operador.lng, operador.lat],
              essential: true,
              zoom:15
              });
    
          });

          this.existe  =  new Mapboxgl.Marker(this.elementoMark, {
            rotation: 45,
            anchor: 'bottom',
            offset: [0, -10],
            
          }).setLngLat([operador.lng, operador.lat])
          .addTo(this.MapaR); 

          this.markers.push(this.existe);

         // console.log(this.existe);

        }

      //console.log(this.markers.length);

      this.existe.setLngLat([operador.lng , operador.lat]);

      this.elementoMark.addEventListener('click', () =>{

        this.MapaR.flyTo({
          center: [operador.lng, operador.lat],
          essential: true,
          zoom:15
          });

      });

      }

     // console.log(this.markers);
    
    });

}


}