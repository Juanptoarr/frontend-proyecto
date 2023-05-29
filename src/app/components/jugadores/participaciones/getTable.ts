function eliminarRepetidos(arr: string[]): string[] {
    return arr.filter((elemento, indice) => {
      return arr.indexOf(elemento) == indice
    });
}

interface Jugadores {
    nombre: string;
    total: number;
}

function getTable(json: any): string {    
    const ligaGolesJugadores: Jugadores[] = json[1].Jugadores;
    const torneoGolesJugadores: Jugadores[] = json[3].Jugadores;
    const copaGolesJugadores: Jugadores[] = json[5].Jugadores;
    const femeninoGolesJugadores: Jugadores[] = json[7].Jugadores;

    const nombresRepetidos = [
        ...ligaGolesJugadores.map(e => e.nombre),
        ...torneoGolesJugadores.map(e => e.nombre),
        ...copaGolesJugadores.map(e => e.nombre),
        ...femeninoGolesJugadores.map(e => e.nombre),
    ];
    
    const filas = [];
    const todosNombres = eliminarRepetidos(nombresRepetidos);

    const object = {
        nombre: null as string | null,
        goles_torneo: null as number | null,
        goles_liga: null as number | null,
        goles_femenino: null as number | null,
        goles_copa: null as number | null,
        goles_total: null as number | null
    }

    const inicioTabla = `<div class="container mt-5 mb-5"><div class="table-responsive"><table id="dataTable" class="table table-bordered text-center"><thead><tr><th scope="col">Nombre del jugador</th><th scope="col">Liga</th><th scope="col">Torneo</th><th scope="col">Copa</th><th scope="col">Femenino</th><th scope="col">Total</th></tr></thead><tbody>`
    const finalTabla = `</tbody></table></div></div>`

    for(const nombre of todosNombres){
        object.nombre = nombre

        // TORNEO
        const golesTorneo = torneoGolesJugadores.find(elem => elem['nombre'] == nombre || elem['nombre'] == `1 ${nombre}`);        
        if (golesTorneo) object.goles_torneo = golesTorneo.total;
        else object.goles_torneo = 0;

        // LIGA
        const golesLiga = ligaGolesJugadores.find(elem => elem['nombre'] == nombre || elem['nombre'] == `1 ${nombre}`);
        if (golesLiga) object.goles_liga = golesLiga.total;
        else object.goles_liga = 0;

        // FEMENINO
        const golesFemenino = femeninoGolesJugadores.find(elem => elem['nombre'] == nombre || elem['nombre'] == `1 ${nombre}`);
        if (golesFemenino) object.goles_femenino = golesFemenino.total;
        else object.goles_femenino = 0;

        // COPA
        const golesCopa = copaGolesJugadores.find(elem => elem['nombre'] == nombre || elem['nombre'] == `1 ${nombre}`);
        if (golesCopa) object.goles_copa = golesCopa.total;
        else object.goles_copa = 0;

        object.goles_total = (object.goles_torneo ?? 0) + (object.goles_liga ?? 0) + (object.goles_femenino ?? 0) + (object.goles_copa ?? 0);

        const fila = `
            <tr>            
            <th>${object.nombre}</th>
            <th>${object.goles_liga}</th>
            <th>${object.goles_torneo}</th>
            <th>${object.goles_copa}</th>
            <th>${object.goles_femenino}</th>
            <th>${object.goles_total}</th>
            </tr>
        `

        filas.push(fila);
    }    

    const tabla = `${inicioTabla}${filas}${finalTabla}`.split(",").join("")    
    
    return tabla;
}

export { getTable };
