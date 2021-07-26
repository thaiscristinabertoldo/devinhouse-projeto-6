package br.com.devinhouse.grupo5.domain.exceptions;

import br.com.devinhouse.grupo5.model.Assunto;

public class ProcessoNaoEncontradoException extends RuntimeException {

  public ProcessoNaoEncontradoException(Long id) {
    super(String.format("O processo pelo qual buscavas, id %d, não foi encontrado", id));
  }

  public ProcessoNaoEncontradoException(String chaveProcesso) {
    super(String.format("O processo pelo qual buscavas, chave %s, não foi encontrado", chaveProcesso));
  }

  public ProcessoNaoEncontradoException(Integer numeroProcesso) {
    super(String.format("O processo pelo qual buscavas, número %s, não foi encontrado", numeroProcesso));
  }

  public ProcessoNaoEncontradoException(Assunto assunto) {
    super(String.format("O processo pelo qual buscavas, assunto %s, não foi encontrado", assunto.getDescricao()));
  }

}
