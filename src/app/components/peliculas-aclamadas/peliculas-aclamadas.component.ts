import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-peliculas-aclamadas',
  templateUrl: './peliculas-aclamadas.component.html',
  styleUrls: ['./peliculas-aclamadas.component.css']
})
export class PeliculasAclamadasComponent implements OnInit {

  @Input() peliculas: Movie[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 15,
      height: 500,
      loop: true,
      //loopFillGroupWithBlank: true,
     
    });
  }

  onMovieClick( pelicula: Movie ) {
    this.router.navigate(['/pelicula', pelicula.id ]);
  }

}
