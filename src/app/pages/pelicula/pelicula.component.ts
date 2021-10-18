import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataLocalService } from '../../services/data-local.service';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  
  public cast: Cast[] = [];
  public mensaje:boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               public dataLocalService: DataLocalService,
               private location: Location,
               private router: Router ) { }

  ngOnInit() {

    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )
      

    ]).subscribe( ( [pelicula, cast] ) => {
      
      if ( !pelicula ) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula = pelicula;  
      this.cast = cast.filter( actor => actor.profile_path !== null );
    });

  }

  onRegresar() {
    this.location.back();
  }


  peliculasFavoritas(){
    this.dataLocalService.guardarStorage(this.pelicula);
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Agregada a Favoritos',
      showConfirmButton: false,
      timer: 1500
    })
        
    //this.dataLocalService.guardarPelicula( this.pelicula );
  }

}
