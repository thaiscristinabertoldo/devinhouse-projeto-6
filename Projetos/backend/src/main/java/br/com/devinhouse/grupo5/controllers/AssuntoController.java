package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.dto.AssuntoInputDTO;
import br.com.devinhouse.grupo5.dto.AssuntoOutputDTO;
import br.com.devinhouse.grupo5.service.AssuntoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping(value = "/v1/assunto")
public class AssuntoController {

    @Autowired
    AssuntoService assuntoService;

    @ResponseStatus(value = CREATED)
    @PostMapping
    public AssuntoOutputDTO cadastrarAssunto(@RequestBody AssuntoInputDTO novoAssunto){
        return assuntoService.cadastrarAssunto(novoAssunto);
    }

    @GetMapping
    public List<AssuntoOutputDTO> listaAssuntos() {
        return assuntoService.buscarTodosAssuntos();
    }

    @GetMapping(value = "/id/{id}")
    public AssuntoOutputDTO buscarAssuntoPorId(@PathVariable Long id){
        return assuntoService.buscarAssuntoPorId(id);
    }
}
