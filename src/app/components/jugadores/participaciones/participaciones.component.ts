import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getTable } from './getTable';

@Component({
  selector: 'app-participaciones',
  templateUrl: './participaciones.component.html',
  styleUrls: ['./participaciones.component.css']
})
export class ParticipacionesComponent {
  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.http.get("https://datosquindiouq-production-30c6.up.railway.app/api/jugadores/").subscribe((data: any) => {
      let table = getTable(data);
      const contenedor = document.getElementById('contenedor');

      const search = document.getElementById('search');
      this.keyUp(search);

      if (contenedor) {
        contenedor.innerHTML = table;
      }    
    });
  }

  keyUp(search: any) {

    
    search.addEventListener('keyup', function() {
      const searchValue = search.value.toLowerCase();
      const table = document.getElementById('dataTable') as HTMLTableElement;
      const rows = table.getElementsByTagName('tr');
  
      for (let i = 1; i < rows.length; i++) {
        const columnData = rows[i].getElementsByTagName('th')[0];
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