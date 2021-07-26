package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.dto.ProcessoInputDTO;
import br.com.devinhouse.grupo5.dto.ProcessoOutputDTO;
import br.com.devinhouse.grupo5.service.ProcessoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping(value = "/v1/processo")
public class ProcessoController {

  @Autowired
  ProcessoService service;

  @ResponseStatus(code = CREATED)
  @PostMapping
  public ProcessoOutputDTO criaProcesso(@RequestBody ProcessoInputDTO processo) {
    return service.salvarProcesso(processo);
  }

  @GetMapping
  public List<ProcessoOutputDTO> listaProcessos() {
    return service.buscarTodosProcessos();
  }

  @GetMapping(path = "/id/{id}")
  public ProcessoOutputDTO buscaUmProcesso(@PathVariable("id") Long id) {
    return service.buscarUmProcesso(id);
  }

  @GetMapping(path = "/buscarpornumero/{id}")
  public List<ProcessoOutputDTO> pesquisarProcessos(@PathVariable("id") Long id) {
    return service.pesquisarProcessosPorNumero(id);
  }

  @GetMapping(path = "/chaveprocesso")
  public ProcessoOutputDTO buscaUmProcessoPorChave(@RequestParam("q") String chaveProcesso) {
    return service.buscarUmProcessoPorChave(chaveProcesso);
  }

  @GetMapping(path = "/numeroprocesso")
  public ProcessoOutputDTO buscaUmProcessoPorNumero(@RequestParam("q") Long numeroprocesso) {
    return service.buscarUmProcessoPorNumero(numeroprocesso);
  }

  @GetMapping(path = "/cdassuntodescrisao")
  public List<ProcessoOutputDTO> buscaUmProcessoPorAssuntoPelaDescrisao(@RequestParam("q") String cdAssunto) {
    return service.buscarUmProcessoPorCdAssuntoDescrisao(cdAssunto);
  }

  @GetMapping(path = "/cdinteressado")
  public List<ProcessoOutputDTO> buscaUmProcessoPorInteressado(@RequestParam("q") Long cdInteressado) {
    return service.buscarUmProcessoPorCdInteressado(cdInteressado);
  }

  @GetMapping(path = "/cdassunto")
  public List<ProcessoOutputDTO> buscaUmProcessoPorAssunto(@RequestParam("q") Long cdAssunto) {
    return service.buscarUmProcessoPorCdAssunto(cdAssunto);
  }

  @ResponseStatus(code = NO_CONTENT)
  @PutMapping(path = "/id/{id}")
  public void atualizaProcesso(@RequestBody ProcessoInputDTO processoAtualizado, @PathVariable("id") Long id) {
    service.atualizarProcesso(processoAtualizado, id);
  }

  @DeleteMapping(path = "/id/{id}")
  public ProcessoOutputDTO deletaProcesso(@PathVariable("id") Long id) {
    return service.deletarProcesso(id);
  }
}
