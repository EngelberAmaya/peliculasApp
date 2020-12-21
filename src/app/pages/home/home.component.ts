import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = []
  public moviesSlideshow: Movie[] = []
  public series: Movie[] = []
  public seriesPop: Movie[] = []
  public peliculas: Movie[] = []
  public peliculasAclama: Movie[] = []

  /*@HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );
    
    if ( pos > max ) {
      // TODO: llamar el servicio
      if ( this.peliculasService.cargando ) { return; }

      this.peliculasService.getPopulares().subscribe( movies => {
        this.movies.push(...movies );
      });
    }
    
    
  }*/


  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

      this.peliculasPopulares();
      this.seriesPopulares();
      this.peliculasAclamadas();
  }


  peliculasPopulares(){
    this.peliculasService.getPopulares()
        .subscribe( movies => {
          this.movies = movies;
          this.moviesSlideshow = movies;
          //console.log(movies);
        })
  }


  seriesPopulares(){
    this.peliculasService.getSeriesPopulares()
        .subscribe( series => {
          this.series = series;
          this.seriesPop = series;
          //console.log(series);
        })
  }


  peliculasAclamadas(){
    this.peliculasService.getPeliculasAclamadas()
        .subscribe( peliacla => {
          this.peliculas = peliacla;
          this.peliculasAclama = peliacla;
          //console.log(peliacla);
        })
        
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

}
