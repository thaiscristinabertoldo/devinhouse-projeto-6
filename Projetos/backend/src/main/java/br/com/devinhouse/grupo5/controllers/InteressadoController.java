package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.dto.AssuntoOutputDTO;
import br.com.devinhouse.grupo5.dto.InteressadoInputDTO;
import br.com.devinhouse.grupo5.dto.InteressadoOutputDTO;
import br.com.devinhouse.grupo5.service.InteressadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping(value = "/v1/interessado")
public class InteressadoController {

    @Autowired
    InteressadoService interessadoService;

    @ResponseStatus(value = CREATED)
    @PostMapping
    public InteressadoOutputDTO cadastrarInteressado(@RequestBody InteressadoInputDTO novoInteressado){
        return interessadoService.cadastrarInteressado(novoInteressado);
    }

    @GetMapping
    public List<InteressadoOutputDTO> listaInteressados() {
        return interessadoService.buscarTodosInteressados();
    }

    @GetMapping(value = "/id/{id}")
    public InteressadoOutputDTO buscarInteressadoPeloId(@PathVariable Long id){
        return interessadoService.buscarInteressadoPeloId(id);
    }

    @GetMapping(value = "/nuidentificacao")
    public InteressadoOutputDTO buscarInteressadoPeloNuIdentificacao(@RequestParam String valor){
        return interessadoService.buscarInteressadoPeloNuIdentificacao(valor);
    }
}
