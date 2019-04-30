
/* Recogemos del array grande congress-113-house.js y congress-113-senate.js 
todos los miembros y los metemos en members */
let members = data.results[0].members
// Establecer una id tbody en la tabla HTML donde queremos imprimir 
let tbody = document.getElementById("tbody");
let presis = document.getElementById("presis");
let presisTop = document.getElementById("presisTop");
let statistics = {
    rep: 0,
    dem: 0,
    ind: 0,
    //Votos totales de los republicanos
    totalVotesRep: 0,
    // Media de los votos de los republicanos
    avgVotesRep: 0,
    // Votos totales de los Democraticos
    totalVotesDem: 0,
    // Media de los votos de los Democraticos
    avgVotesDem: 0,
    // Votos totales de los Independientes
    totalVotesInd: 0,
    // Media de los votos de los Independientes
    avgVotesInd: 0,

}



// Para calcular todos los democratas republicanos y independentistas
contador();
function contador() {

    /* Hacemos un foreach que si del partido que sea es igual al valor que sale en el array, 
    se suma al objeto statistics*/
    members.forEach(function (members) {
        if (members.party == "R") {
            statistics.rep++
            // la variable totalVotesRep es igual a la suma de eso mismo mas los porcentajes de los partidos
            statistics.totalVotesRep += members.votes_with_party_pct
        }
        if (members.party == "D") {
            statistics.dem++
            // la variable totalVotesRep es igual a la suma de eso mismo mas los porcentajes de los partidos
            statistics.totalVotesDem += members.votes_with_party_pct
        }
        if (members.party == "I") {
            statistics.ind++
            // la variable totalVotesRep es igual a la suma de eso mismo mas los porcentajes de los partidos
            statistics.totalVotesInd += members.votes_with_party_pct
        }

    });
    statistics.avgVotesRep = statistics.totalVotesRep / statistics.rep
    statistics.avgVotesDem = statistics.totalVotesDem / statistics.dem
    statistics.avgVotesInd = statistics.totalVotesInd / statistics.ind
    console.log(statistics);
    //console.log(contador.member)
}


printTable();

//funcion para imprimir la tabla
function printTable() {

    //Llenar los valores de las celdas con los valores de los nombres de los candidatos y los partidos
    document.getElementById("numRep").innerHTML = statistics.rep;
    document.getElementById("numDem").innerHTML = statistics.dem;
    document.getElementById("numInd").innerHTML = statistics.ind;


    document.getElementById("mediaRep").innerHTML = statistics.avgVotesRep.toFixed(2) + "%";
    document.getElementById("mediaDem").innerHTML = statistics.avgVotesDem.toFixed(2) + "%";
    document.getElementById("mediaInd").innerHTML = statistics.avgVotesInd.toFixed(2) + "%";



    /* 
    coger Nombre del Presidente= data.results[0].members.first_Name
    coger numero de Votos fallidos = data.results[0].members.missed_votes
    */

}




//printTableLeastEngaged();

//funcion para imprimir la tabla
function printTableLeastEngaged() {
    let OrderedMembers = members.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct) ? 1 : ((b.missed_votes_pct > a.missed_votes_pct) ? -1 : 0));
    for (let i = 0; i < OrderedMembers.length * 0.1; i++) {
        let fila2 = document.createElement("tr");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");
        celda2.innerHTML = OrderedMembers[i].first_name;
        celda3.innerHTML = OrderedMembers[i].missed_votes;
        celda4.innerHTML = OrderedMembers[i].missed_votes_pct;
        fila2.append(celda2, celda3, celda4);
        presis.append(fila2);

    }
}
//printTableMostEngaged();
function printTableMostEngaged() {
    let OrderedMembers = members.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct) ? -1 : ((b.missed_votes_pct > a.missed_votes_pct) ? 1 : 0));
    for (let i = 0; i < OrderedMembers.length * 0.1; i++) {
        let fila2 = document.createElement("tr");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");
        celda2.innerHTML = OrderedMembers[i].first_name;
        celda3.innerHTML = OrderedMembers[i].missed_votes;
        celda4.innerHTML = OrderedMembers[i].missed_votes_pct;
        fila2.append(celda2, celda3, celda4);
        presisTop.append(fila2);

    }
}


///////////////////////// PARTY LOYALTY ///////////////////////////////

let LeastLoyalTbody = document.getElementById("LeastLoyalTbody");
let MostLoyalTbody = document.getElementById("MostLoyalTbody");

// var app = new Vue({
//     el: '#app',
//     data: {
//         message: 'Hello Vue!'
//     }
// })






//printTableLeastLoyal();
function printTableLeastLoyal() {
    let OrderedMembers = members.sort((a, b) => (b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : ((a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : 0));
    for (let i = 0; i < OrderedMembers.length * 0.1; i++) {
        let fila2 = document.createElement("tr");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");

        celda2.innerHTML = OrderedMembers[i].first_name;
        celda3.innerHTML = OrderedMembers[i].total_votes;
        celda4.innerHTML = OrderedMembers[i].votes_with_party_pct + "%";


        fila2.append(celda2, celda3, celda4);
        LeastLoyalTbody.append(fila2);

    }
}

//printTableMostLoyal();
function printTableMostLoyal() {
    let OrderedMembers = members.sort((a, b) => (a.votes_with_party_pct > b.votes_with_party_pct) ? -1 : ((b.votes_with_party_pct > a.votes_with_party_pct) ? 1 : 0));
    for (let i = 0; i < OrderedMembers.length * 0.1; i++) {
        let fila2 = document.createElement("tr");
        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");
        let celda4 = document.createElement("td");

        celda2.innerHTML = OrderedMembers[i].first_name;
        celda3.innerHTML = OrderedMembers[i].total_votes;
        celda4.innerHTML = OrderedMembers[i].votes_with_party_pct + "%";

        fila2.append(celda2, celda3, celda4);
        MostLoyalTbody.append(fila2);

    }
}

if (window.location.pathname == "/House_Party_Loyalty.html" || window.location.pathname == "/Senate_Party_Loyalty.html") {
    printTableLeastLoyal()
    printTableMostLoyal()

} else if (window.location.pathname == "/House_Attendance_statistics.html" || window.location.pathname == "/Senate_Attendance_statistics.html") {
    printTableLeastEngaged()
    printTableMostEngaged()
}





