package br.com.devinhouse.grupo5.domain.exceptions;

public class InteressadoInativoException extends RuntimeException {

  public InteressadoInativoException (Long cdInteressado) {
    super(String.format("O interessado, id %d, informado encontra-se inativo no momento.", cdInteressado));
  }
}
