package br.com.devinhouse.grupo5.domain.exceptions;

public class AssuntoInativoException extends RuntimeException {

  public AssuntoInativoException (Long cdAssunto) {
    super(String.format("O assunto informado, id %d encontra-se inativo no momento.", cdAssunto));
  }
}
