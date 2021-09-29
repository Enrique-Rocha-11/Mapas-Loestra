import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  
  url = environment.url;

  constructor( private http: HttpClient ) { }


  coordsOperador(usuario){

    return this.http.get(`${this.url}coordenadasOperador.php?recurso=coordenadas&tabla=${usuario}`);

  }


  sucursalesCdmx(estado){
   
    return this.http.get(`https://barbering.iatich.de/${estado}/api/sucursales`);
  
  }

  consultarInfoSucursal(estado, idSucursal){
    return this.http.get(`https://barbering.iatich.de/${estado}/api/sucursal/${idSucursal}`);
    
  }

  consultarOperadores(datos){
    return this.http.post(`${this.url}coordsOperadores.php`, datos);
    
  }


}
