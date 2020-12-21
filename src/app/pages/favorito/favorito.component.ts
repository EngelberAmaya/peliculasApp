import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResponse } from '../../interfaces/movie-response';
import { DataLocalService } from  '../../services/data-local.service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css']
})
export class FavoritoComponent implements OnInit {

  public movies: MovieResponse[] = [];

  constructor(private router: Router, public dataLocalService: DataLocalService) { }

  async ngOnInit() {
  	this.movies = await this.dataLocalService.cargarFavoritos();
  	console.log(this.movies);
    //this.dataLocalService.borrarFavorita(this.movies);
  }

  onMovieClick( movie: MovieResponse ) {
    this.router.navigate(['/pelicula', movie.id ]);
  }

  async eliminarPelicula(movie: MovieResponse){
    await this.dataLocalService.borrarFavorita(movie);
  }

}
