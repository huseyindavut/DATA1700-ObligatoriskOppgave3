package com.example.data1700obligatoriskoppgave3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class KinoController {


    @Autowired
    public KinoRepository rep;

    @GetMapping("/filmSelector")
    public ArrayList<String> filmSelector(){
        ArrayList<String> filmer = new ArrayList<>();
        filmer.add("The Godfather");
        filmer.add("Pulp Fiction ");
        filmer.add("Trainspotting");
        filmer.add("Eskiya");
        filmer.add("Eternal Sunshine of the Spotless Mind");
        filmer.add("Kill Bill");
        filmer.add("Rocky");
        filmer.add("Silence of the Lambs");
        return filmer;
    }

    @GetMapping("/deleteAll")
    public void deleteAll(){
        rep.deleteAll();
    }

    @GetMapping("/deleteTicket/{id}")
    public void deleteTicket(@PathVariable int id){
        rep.deleteTicket(id);
    }
    //Endpoint
    @PostMapping("/saving")
    public void savingTicket(KinoBillettKjopp oneTicket){
        rep.savingTicket(oneTicket);
    }

    @GetMapping("/takeData")
    public List<KinoBillettKjopp> takeData(){
        List<KinoBillettKjopp> billetter =rep.takeData();

        Collections.sort(billetter, Comparator.comparing(KinoBillettKjopp::getEtternavn));
        return billetter;

    }



}

