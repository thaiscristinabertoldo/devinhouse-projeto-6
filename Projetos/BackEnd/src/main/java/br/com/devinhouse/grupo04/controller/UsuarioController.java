package br.com.devinhouse.grupo04.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
public class UsuarioController {

    @RolesAllowed("user") // realm > client > roles (?)
    @GetMapping(value = "/login")
    public ResponseEntity<String> login() {

        return ResponseEntity.ok("Hello");
    }

}
