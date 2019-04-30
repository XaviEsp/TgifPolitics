//  Esta es la clave Api DS4mLbe47Z4t0KYAL51dOXDxwFpg9DEbgizoTAld

// Recoger el array miembros y meterlos en members
let members = data.results[0].members;

// En la tabla tbody debe tener una id
let tbody = document.getElementById("miTabla");
let MyDropdown = document.getElementById("MyDropdown");
let all = document.getElementById("all");
//Escuchadores los checkboxes en el html deben ser iguales
document.getElementById("rep").addEventListener("change", click);
document.getElementById("dem").addEventListener("change", click);
document.getElementById("ind").addEventListener("change", click);
document.getElementById("MyDropdown").addEventListener("change", click);
document.getElementById("all").addEventListener("change", click);
// Función para ver la tabla
printTable();

//funcion para imprimir la tabla
function printTable() {

    for (let i = 0; i < data.results[0].members.length; i++) {
        // console.log(data.results[0].members[i].first_name)

        //Se crean la fila y las celdas que por ahora estarán vacias
        let fila = document.createElement("tr");
        let celda = document.createElement("td");
        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");


        //Llenar los valores de las celdas con los valores de los nombres de los candidatos y los partidos
        celda.innerHTML = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name;
        celda1.innerHTML = data.results[0].members[i].party;
        celda2.innerHTML = data.results[0].members[i].state;
        celda3.innerHTML = data.results[0].members[i].seniority;
        celda4.innerHTML = data.results[0].members[i].votes_with_party_pct + "%";





        // Meter las celdas en las filas
        fila.append(celda, celda1, celda2, celda3, celda4);
        //Meter la fila en la variable MyTable que contiene la tabla Html
        tbody.append(fila);

    }
}



/* Otra manera de hacer la tabla 
//template empieza sin nada
let template = "";
// forEach Por cada miembro, se separa por parametros member
members.forEach(function (member) {
    //meter en template toda la tabla
    template += `
<tr>
    <td><a href="${member.url}">${member.first_name}</a></td>
    <td>${member.party}</td>
    <td>${member.state}</td>
    <td>${member.seniority}</td>
    <td>${member.votes_with_party_pct}</td>
  </tr>`;
});
// Todo lo que esta en template se pone en tbody
tbody.innerHTML = template;
}
*/
/* Función que recoge los valores que estan en los
republicanos ("rep"), los democratas ("dem") y los independientes ("ind")*/
function click() {
    let repCb = document.getElementById("rep");
    let demCb = document.getElementById("dem");
    let indCb = document.getElementById("ind");
    
    // variable checkeados empieza vacio
    let checkeados = [];

    // si la variable repCb esta checado se devuelve R y se mete en checados 
    if (repCb.checked) {
        checkeados.push("R");
    }
    // si la variable demCb esta checado se devuelve D
    if (demCb.checked) {
        checkeados.push("D");
    }
    // si la variable indCb esta checado se devuelve I
    if (indCb.checked) {
        checkeados.push("I");
    }

    
    /* Para que muestre todos cuando no hay nada seleccionado
    si !repCb.checked (no esta clicado)  && (y) !demCb.checked (no esta clicado)
    && (y) !indCb.checked (no esta clicado), meter todos con .push */
    if (!repCb.checked && !demCb.checked && !indCb.checked) {
        checkeados.push("R");
        checkeados.push("D");
        checkeados.push("I");
    }

    let EstadoSeleccionado = MyDropdown.value
    // variable membersToPrint para imprimir miembros  empieza de 0
    let membersToPrint = [];
    // todos los miembros por cada miembro
    members.forEach(function (member) {
        /* Incluir los partidos en la variable de los checados 
        si estan clicados que se muestren, donde EstadoSeleccionado=="ALL" debe ser el valor que lleva dentro en Mayúsculas */
        if (EstadoSeleccionado=="ALL" && checkeados.includes(member.party) || EstadoSeleccionado==member.state) {
            //meter los members en la variable en membersToPrint
            membersToPrint.push(member);
        }
    });

    console.log(EstadoSeleccionado);
    // 
    printNewTable(membersToPrint);
}
//Función que imprime una nueva tabla
function printNewTable(miembrosAImprimir) {

    tbody.innerHTML = "";

    /* Crear la función for, que empieza por la i= 0  
(data.results[0].members.length): data es el "padre" de results, por lo que se coje 
el array 0 de results, dentro de ahi se coje la longitud de los miembres y mientras esta sea mas
grande que el indice, la i se incrementa   */
    for (let i = 0; i < miembrosAImprimir.length; i++) {
        // console.log(data.results[0].members[i].first_name)

        //Se crean la fila y las celdas que por ahora estarán vacias
        let fila = document.createElement("tr");
        let celda = document.createElement("td");
        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");


        //Llenar los valores de las celdas con los valores de los nombres de los candidatos y los partidos
        celda.innerHTML = miembrosAImprimir[i].first_name + " " + miembrosAImprimir[i].last_name;
        celda1.innerHTML = miembrosAImprimir[i].party;
        celda2.innerHTML = miembrosAImprimir[i].state;
        celda3.innerHTML = miembrosAImprimir[i].seniority;
        celda4.innerHTML = miembrosAImprimir[i].votes_with_party_pct + "%";





        // Meter las celdas en las filas
        fila.append(celda, celda1, celda2, celda3, celda4);
        //Meter la fila en la variable MyTable que contiene la tabla Html
        tbody.append(fila);

    }
}

// Funcion que mete valores del array politicos en el dropdown
filtradoStates();
function filtradoStates() {
    //coger el valor del actual opcion que se tiene en el value
    let est = document.getElementById("MyDropdown").value

     let members = data.results[0].members;
    let noRepeat = [];
    for (let j = 0; j < members.length; j++) {

        // si noRepeat no incluye el estado 
        if (!noRepeat.includes(members[j].state)) {
            noRepeat.push(members[j].state)

        }

    
        //console.log(state[i])

        // Una vez se tiene los valores hacer que la tabla se filtre
    }

    noRepeat.sort();
    console.log(noRepeat);
    // cuando la longitud de la i es mas pequeña que toda la longitud del state
    for (let i = 0; i < noRepeat.length; i++) {

        // crear variable opcion y crear opciones 
        let option = document.createElement("option");
        // Meterlos en opciones 
        option.innerHTML = noRepeat[i]
        // Meter option en la variable MyDropdown
        MyDropdown.append(option)


    };
    console.log(est);
}


///////////////////////// FILTRAR EN Attendance Y PARTY LOYALTY/////////////////////////////////









    /////////////////////// OTRAS COSAS //////////////////////////////////////////////
    /*
    // console.log(data.results[0].members)
    
    // // Crear una variable que coja la id de myTabla que se encuentra en el Html
    // let MyTable = document.getElementById("myTabla");
    // console.log(MyTable)
    
    // /* Crear la función for, que empieza por la i= 0
    // (data.results[0].members.length): data es el "padre" de results, por lo que se coje
    // el array 0 de results, dentro de ahi se coje la longitud de los miembres y mientras esta sea mas
    // grande que el indice, la i se incrementa   */
    // for (let i = 0; i < data.results[0].members.length; i++) {
    //     // console.log(data.results[0].members[i].first_name)

    //     //Se crean la fila y las celdas que por ahora estarán vacias
    //     let fila = document.createElement("tr");
    //     let celda = document.createElement("td");
    //     let celda1 = document.createElement("td");
    //     let celda2 = document.createElement("td");
    //     let celda3 = document.createElement("td");
    //     let celda4 = document.createElement("td");


    //     //Llenar los valores de las celdas con los valores de los nombres de los candidatos y los partidos
    //     celda.innerHTML = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name;
    //     celda1.innerHTML = data.results[0].members[i].party;
    //     celda2.innerHTML = data.results[0].members[i].state;
    //     celda3.innerHTML = data.results[0].members[i].seniority;
    //     celda4.innerHTML = data.results[0].members[i].votes_with_party_pct + "%";





    //     // Meter las celdas en las filas
    //     fila.append(celda, celda1, celda2, celda3, celda4);
    //     //Meter la fila en la variable MyTable que contiene la tabla Html
    //     MyTable.append(fila);

    // }


    // /*
    // function democrats() {
    //     for (let i = 0; i < data.results[0].members.length; i++) {

    //         let fila = document.createElement("tr");
    //         let celda = document.createElement("td");
    //         let celda1 = document.createElement("td");
    //         let celda2 = document.createElement("td");
    //         let celda3 = document.createElement("td");
    //         let celda4 = document.createElement("td");

    //         celda.innerHTML = data.results[0].members[i].first_name + " " + data.results[0].members[i].last_name;
    //         celda1.innerHTML = data.results[0].members[i].party["D"];
    //         celda2.innerHTML = data.results[0].members[i].state;
    //         celda3.innerHTML = data.results[0].members[i].seniority;
    //         celda4.innerHTML = data.results[0].members[i].votes_with_party_pct;

    //         // Meter las celdas en las filas
    //         fila.append(celda, celda1, celda2, celda3, celda4);
    //         //Meter la fila en la variable MyTable que contiene la tabla Html
    //         MyTable.append(fila);


    //     }
    // */

    // /*
    // En el html se tiene que poner los dos javascripts
    //     < script > main.js</script >
    //         <script>congress-113-house.js</script>

    // let members = data.result[0].members;
    // console.log(members);
    // let myTabla = document.getElementById("myTabla")
    // console.log(miTabla);

    // for (let i = 0; i < members.length; i++) {
    //     console.log(members[i].first_name);
    //     //Crear una fila
    //     row.insertCell().innerHTML =
    //         members[i].firstName +
    //         "" +
    //         members[i].middle_name +
    //         "," +
    //         members[i].last_name;

    //     let row = document.createElement("tr");
    //     let celda = document.createElement("td");


    //     let cleanMiddle = members[i].middle_name || "";

    //     if (cleanMiddle == null) {

    //         cleanMiddle = ""
    //     };

    //     celda.innerHTML =
    //         members[i].firstName +
    //         "" +
    //         members[i].middle_name +
    //         "," +
    //         members[i].last_name;
    //     celda.innerHTML = members[i].firstName;
    //     celda1.innerHtml = members[i].party;
    //     celda2.innerHtml = members[i].state;




    //     // Cuelga la row en la tabla

    //     row.insertCell().insertHtml = members[i].party;
    //     row.insertCell().innerHtml = members[i].party;
    //     row.insertCell().innerHtml = members[i].state;

    //     miTabla.append(celda, celda1, celda2);
    //     miTabla.append(row);

    // }
    // */ 



