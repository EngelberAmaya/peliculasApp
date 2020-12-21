import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];
  public spiner: boolean = false;
  oculto = 150;
  
  ideas = [
    { id: 1, name: 'Spiderman' },
    { id: 2, name: 'Avenger' },
    { id: 3, name: 'El señor de los anillos' },
    { id: 4, name: 'La vida es bella' }
  ];

  constructor(  private activatedRoute: ActivatedRoute,
                private peliculasService: PeliculasService,
                private router: Router) { }

  ngOnInit(): void {

  }

  buscarPelicula( texto: string ) {

    texto = texto.trim();

    if ( texto.length === 0 ) {
      return;
    }

    console.log(texto);

    this.spiner = true;
    //this.idea = false;

    this.peliculasService.buscarPeliculas(texto)
        .subscribe( resp => {
          console.log(resp);
          this.movies = resp;
          this.spiner = false;
          //this.idea = false;
        })

    //this.router.navigate(['/buscar', texto ]);

  }


  onMovieClick( movie: Movie ) {
    this.router.navigate(['/pelicula', movie.id ]);
  }


}
