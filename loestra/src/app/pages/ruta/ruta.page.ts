import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { MapasService } from 'src/app/services/mapas.service';


@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {


  public KeyMapbox = environment.key;
  public mapa: Mapboxgl.Map;
  public Marcador: Mapboxgl.Marker;
  public prueba: Mapboxgl.Marker;
  public parametro;
  public elementoMark;


  public opLng;
  public opLat;
  public opImagen;

  public opMarker: Mapboxgl.Marker;

  public inicio = {

    lng: -100.6598155,
    lat: 24.0816555,
    
  }

  constructor( private route: ActivatedRoute,
    private rutaService: MapasService) { }

  ngOnInit() {


   
  }



  getCoords(){


    this.rutaService.coordsOperador(this.parametro).subscribe( (res: any) => {}).unsubscribe();

    this.rutaService.coordsOperador(this.parametro).subscribe( (res: any) => {

      //console.log(res);

      this.opLng = res.lng;
      this.opLat = res.lat;

      const imagen = res.foto;

      this.opImagen = imagen;

     // console.log(this.opLat);
     // console.log(this.opLng);
     // console.log(this.opImagen);

     

     this.mapa.flyTo({
      center: [this.opLng, this.opLat],
      zoom: 3.9,
    });

      

    this.markPrueba(this.opLng, this.opLat, this.opImagen);
      
    
      
    setTimeout( () => {
    
      this.getCoords();

      this.mapa.flyTo({
        center: [this.opLng, this.opLat],
      })
     
      }, 10000);

    })


  }

ionViewWillEnter(){



  this.parametro = this.route.snapshot.paramMap.get('id');
   

  ( Mapboxgl as any ).accessToken = this.KeyMapbox
        this.mapa = new Mapboxgl.Map({
        container: 'mapa-Ruta', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.inicio.lng, this.inicio.lat ], // starting position // LNG , LAT 
        zoom: 4 // starting zoom
        });


        setTimeout(() => {

          this.getCoords();
          
        }, 1000);

  }



  markPrueba(lat: number, lng: number, imagen){


    if(!this.opMarker){


      this.elementoMark = document.createElement('div');
          this.elementoMark.className = 'marcador-test';
          this.elementoMark.innerHTML = `<div class="fondo"></div>`;

      this.opMarker =  new Mapboxgl.Marker({
        draggable: false,
        element: this.elementoMark,
        rotation: 45,
        anchor: 'bottom',
        offset: [0, -5]
        
        })
        .setLngLat([lat, lng])
        .addTo(this.mapa);

    } else{

      this.opMarker.setLngLat([lat, lng]);
    }


    
  /*   this.elementoMark.addEventListener('click', () =>{

      this.mapa.flyTo({
        center: [lng,lat],
        essential: true,
        zoom:15
        });

    }); */




    $(".fondo").css("backgroundImage", `url("${imagen}")` ); 
    

      

  }

  DragMarker( lat: number, lng: number, imagen){


    if(!this.Marcador){

    
          this.Marcador = new Mapboxgl.Marker({
              draggable: false,
              element: document.getElementById("operador"),
              rotation: 45,
              anchor: 'bottom',
              offset: [0, -5]
              
              })
              .setLngLat([lat, lng])
              .addTo(this.mapa);
              

    } else{


      this.Marcador
      .setLngLat([lat, lng])
      .setPopup(new Mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
    

    }


   


    this.Marcador.on('dragend', () =>{

   // console.log(this.Marcador.getLngLat());
    alert(this.parametro);

    })

   

  }

}
