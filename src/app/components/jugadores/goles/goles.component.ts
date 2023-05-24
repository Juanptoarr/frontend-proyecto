import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getTable } from './getTable';

@Component({
  selector: 'app-goles',
  templateUrl: './goles.component.html',
  styleUrls: ['./goles.component.css']
})

//https://datosquindiouq-production-30c6.up.railway.app/api/jugadores/

export class GolesComponent {
  constructor(private http: HttpClient) {
    this.fetchData(); 
  }

  fetchData() {
    this.http.get("https://datosquindiouq-production-30c6.up.railway.app/api/jugadores/").subscribe((data: any) => {
      let table = getTable(data);
      const contenedor = document.getElementById('contenedor');
      const search = document.getElementById('search');
      const todes = document.getElementById('todes');
      const torneo = document.getElementById('torneo');
      const liga = document.getElementById('liga');
      const copa = document.getElementById('copa');
      const femenino = document.getElementById('femenino');
  
      if (contenedor) {
        contenedor.innerHTML = table;
      }    

      this.keyUp(search, todes, torneo, liga, copa, femenino);
    });
  }

  hideColumnsExcept(columnIndexesToShow: number[]): void {
    const table = document.getElementById('dataTable') as HTMLTableElement;
    const rows = table.rows;
  
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].cells.length; j++) {
        if (columnIndexesToShow.includes(j)) {
          rows[i].cells[j].style.display = '';
        } else {
          rows[i].cells[j].style.display = 'none';
        }
      }
    }
  }

  keyUp(search: any, todes: any, torneo: any, liga: any, copa: any, femenino: any) {
    todes.addEventListener('click', () => {
      this.http.get("https://datosquindiouq-production-30c6.up.railway.app/api/jugadores/").subscribe((data: any) => {
        let table = getTable(data);
        const contenedor = document.getElementById('contenedor');
        if (contenedor) {
          contenedor.innerHTML = table;
        } 
      });
    })

    torneo.addEventListener('click', () => {
      this.hideColumnsExcept([0, 1]);
    });

    liga.addEventListener('click', () => {
      this.hideColumnsExcept([0, 2]);
    });

    copa.addEventListener('click', () => {
      this.hideColumnsExcept([0, 3]);
    });

    femenino.addEventListener('click', () => {
      this.hideColumnsExcept([0, 4]);
    });
    

    search.addEventListener('keyup', function() {
      const searchValue = search.value.toLowerCase();
      const table = document.getElementById('dataTable') as HTMLTableElement;
      const rows = table.getElementsByTagName('tr');
  
      for (let i = 1; i < rows.length; i++) {
        const columnData = rows[i].getElementsByTagName('th')[0];
        console.log(columnData) 
        if (columnData) {
          const textValue = columnData.textContent || columnData.innerText;
          if (textValue.toLowerCase().indexOf(searchValue) > -1) {
            rows[i].style.display = "";
          } else {
            rows[i].style.display = "none";
          }
        }
      }
    });
  }
}