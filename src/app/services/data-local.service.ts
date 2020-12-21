import { Injectable } from '@angular/core';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: MovieResponse[] = [];

  constructor() { 
  	this.cargarFavoritos();

  }


  guardarStorage(pelicula: MovieResponse){

  	let existe = false;
  	
  	for( const peli of this.peliculas) {

  		if ( peli.id === pelicula.id) {
  			existe = true;
  			break;
  		}
  	}

  	if (existe) {
  		this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
  		
  	}else{
  		this.peliculas.push(pelicula);
  	}

    
    localStorage.setItem("peliculas", JSON.stringify(this.peliculas));

    return !existe;
   
  }


  async cargarFavoritos(){
  	const peliculas = await JSON.parse(localStorage.getItem("peliculas"));

  	this.peliculas = peliculas || [];
  	return this.peliculas;
  	console.log(peliculas);
  }


  async existePelicula(id){
  	
  	await this.cargarFavoritos();
  	const existe = this.peliculas.find( peli => peli.id === id)

  	return (existe) ? true : false;
  }


  async borrarFavorita(pelicula: MovieResponse){
    this.peliculas = await this.peliculas.filter( peli => peli.title !== pelicula.title);
    
    localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
    
  }


}
