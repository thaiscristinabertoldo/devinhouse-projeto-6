package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.domain.exceptions.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExceptionController {

  public static final long LONG = 1L;
  public static final String STRING = "Erro";

  @GetMapping("/v1/exception/{exception_id}")
  public void getSpecificException(@PathVariable("exception_id") String pException) {
    if("AssuntoInativo".equals(pException)) {
      throw new AssuntoInativoException(LONG);
    }
    else if("AssuntoNaoEncontrado".equals(pException)) {
      throw new AssuntoNaoEncontradoException();
    }
    else if("CpfInvalido".equals(pException)) {
      throw new CpfInvalidoException();
    }
    else if("CpfJaExistente".equals(pException)) {
      throw new CpfJaExistenteException(STRING);
    }
    else if("DataDeNascimentoInvalida".equals(pException)) {
      throw new DataDeNascimentoInvalidaException();
    }
    else if("InteressadoInativo".equals(pException)) {
      throw new InteressadoInativoException(LONG);
    }
    else if("InteressadoNaoEncontrado".equals(pException)) {
      throw new InteressadoNaoEncontradoException();
    }
    else if("NuProcessoJaCadastrado".equals(pException)) {
      throw new NuProcessoJaCadastradoException();
    }
    else if("ProcessoNaoEncontrado".equals(pException)) {
      throw new ProcessoNaoEncontradoException(LONG);
    }
  }
}
