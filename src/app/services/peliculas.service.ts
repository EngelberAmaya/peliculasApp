import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsReponse, Cast } from '../interfaces/credits-response';


// nuevo
//import { RespuestaMDB, Pelicula } from '../interfaces/interface';
import { environment } from '../../environments/environment';
// variables globales
const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  //private popularesPage = 0;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '1865f43a0549ca50d341dd9ab8b29f49',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }


  resetCarteleraPage() {
    this.carteleraPage = 1;
  }


  getPopulares():Observable<Movie[]> {


    
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/discover/movie?sort_by=popularity.desc`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        //this.carteleraPage += 1;
        
      })
    );


  }


  getSeriesPopulares():Observable<Movie[]> {

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/tv/popular`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        //this.carteleraPage += 1;

      })
    );


  }


  getPeliculasInfantiles():Observable<Movie[]> {                 

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/discover/movie?with_genres=35&sort_by=revenue.desc`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        //this.carteleraPage += 3;
      })
    );


  }


  buscarPeliculas( texto: string ):Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto };

    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    )

  }


  getPeliculaDetalle( id: string ) {

    return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )

  }

  getCast( id: string ):Observable<Cast[]> {

    return this.http.get<CreditsReponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) ),
    );

  }


}

