import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  unsubscribe$ = new Subject();

  cargando1 = true;
  cargando2 = true;
  cargando3 = true;

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
      this.peliculasInfantiles();
  }


  peliculasPopulares(){
    this.cargando1 = true;
    this.peliculasService.getPopulares()
        .subscribe( movies => {
          this.cargando1 = false;
          this.movies = movies;
          this.moviesSlideshow = movies;
          //console.log(movies);
        })
  }


  seriesPopulares(){
    this.cargando2 = true;
    this.peliculasService.getSeriesPopulares()
        .subscribe( series => {
          this.cargando2 = false;
          this.series = series;
          this.seriesPop = series;
          //console.log(series);
        })
  }


  peliculasInfantiles(){
    this.cargando3 = true;
    this.peliculasService.getPeliculasInfantiles()
        .subscribe( peliacla => {
          this.cargando3 = false;
          this.peliculas = peliacla;
          this.peliculasAclama = peliacla;
          //console.log(peliacla);
        })
        
  }

  ngOnDestroy() {
    //this.peliculasService.resetCarteleraPage();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
