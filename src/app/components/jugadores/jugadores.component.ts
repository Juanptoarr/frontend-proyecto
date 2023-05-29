import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompeticionService } from '../../services/competicion.service'

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  check: string = "";

  constructor(private router: Router,
    private competicionService: CompeticionService) { }

  ngOnInit(): void {
    
  }

  getCompeticiones(){
    this.competicionService.getCompeticiones().subscribe(
      res => {
        this.competicionService.jugadores = res;
      },
      err => console.log(err)
    );
  }
  limpiarPagina() {
      localStorage.clear();
    }

  checkRouter() { //check === 'goles' ? '/goles' : '/participaciones'
    if (this.check == 'goles') {
      return '/goles';
    } else if (this.check == 'participaciones') {
      return '/participaciones';
    }

    return "./"
  }
}











