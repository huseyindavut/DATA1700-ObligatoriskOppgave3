package com.example.data1700obligatoriskoppgave3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class KinoRepository {

    @Autowired
    private JdbcTemplate db;

    public void savingTicket (KinoBillettKjopp oneTicket){
        String sql ="INSERT INTO KinoKjopp (film, antall,fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql,oneTicket.getFilm(),oneTicket.getAntall(), oneTicket.getFornavn(),oneTicket.getEtternavn(),
                oneTicket.getTelefonnr(),oneTicket.getEpost());
    }

    public List<KinoBillettKjopp> takeData (){
        String sql ="SELECT*FROM KinoKjopp";
        List<KinoBillettKjopp> dineBilletter = db.query(sql,new BeanPropertyRowMapper<>(KinoBillettKjopp.class));
        return dineBilletter;
    }

    public void deleteAll(){
        String sql="DELETE FROM KinoKjopp";
        db.update(sql);
    }

    public void deleteTicket(long id){
        String sql = "DELETE FROM KinoKjopp WHERE id = ?";
        db.update(sql, id);
    }
}
