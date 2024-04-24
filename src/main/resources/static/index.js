$(function (){
    filmSelector();
})

function filmSelector() {
    $.get("/filmSelector", function (filmer) {
        let filmliste = "<select class='form-select' name='film' id='film'>"+
            "<option selected disabled placeholder='Velg Film'>Velg film</option>"

        for (const film of filmer){
            filmliste +="<option value='"+film+"'>"+film+"</option>";
        }
        filmliste +="</select>"
        $("#filmliste").html(filmliste);
    })
}

function kjopbillett() {
    if (validering()) {
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val(),
        }

        $.post("/saving", billett, function () {
            $.get("/takeData",function(billetter){
                formaterData(billetter);
            })
        })

        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

function formaterData(billetter) {
    console.log(billetter);
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th>Status</th>" + "</tr>";

    for (const billett of billetter) {
        ut += "<tr><td class='film'>" + billett.film + "</td><td class='antall'>" + billett.antall +
            "</td><td class='fornavn'>" + billett.fornavn + "</td><td class='etternavn'>" +
            billett.etternavn + "</td><td class='telefonnr'>" +
            billett.telefonnr + "</td><td class='epost'>" +
            billett.epost + "</td><td class='status'><button class='btn btn-danger' onclick='deleteTicket(" + billett.id + ")'>Slett Billet</button></td>"
    }
    ut += "</table>";
    $("#billettvisning").html(ut);
}

function deleteTicket(id) {
    $.get(`/deleteTicket/${id}`, function() {
        $.get("/takeData",function(billetter){
            formaterData(billetter);

        })
    });
}

function deleteAll(){
    $.get("/deleteAll",function(){
        $.get("/takeData",function(billetter){
            formaterData(billetter);
        })
    })
    $("#billettvisning").html("Slett billetter");
}

function validering() {
    let film = $("#filmliste").val()
    let fornavn = $("#fornavn").val()
    let etternavn = $("#etternavn").val()
    let telefonnr = $("#telefonnr").val()
    let epost = $("#epost").val()
    let antall = $("#antall").val()

    $("#filmFeil").text(" ")
    $("#antallFeil").text(" ")
    $("#fornavnFeil").text(" ")
    $("#etternavnFeil").text(" ")
    $("#telefonnrFeil").text(" ")
    $("#emailFeil").text(" ")

    if (!filmliste) {
        $("#filmFeil").html("Vær så snill vennligst velg en film")
        return false;
    }

    if (antall <= 0 || !Number.isInteger(parseInt(antall))) {
        document.getElementById("antallFeil").innerHTML = "Skriv inn gyldig antall";
        return false;
    }

    if (!fornavn) {
        document.getElementById("fornavnFeil").innerHTML = "Skriv inn gyldig fornavn";
        return false;
    }

    let stringRgl=/^[a-zA-åÅøØæÆ]+$/;
    if (!etternavn) {
        document.getElementById("etternavnFeil").innerHTML = "Skriv inn gyldig etternavn";
        return false;
    }

    let tlfRegex = /^\d{7,15}$/;
    if (telefonnr === "" || !tlfRegex.test(telefonnr)) {
        document.getElementById("telefonnrFeil").innerHTML = "Skriv inn gyldig telefonnummer";
        return false;
    }

    let emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    if (epost === " " || !emailRegex.test(epost)) {
        document.getElementById("emailFeil").innerHTML = "Skriv inn gyldig epost";
        return false;
    }

    return true;
}

