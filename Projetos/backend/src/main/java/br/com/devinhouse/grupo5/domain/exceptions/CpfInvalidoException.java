package br.com.devinhouse.grupo5.domain.exceptions;

public class CpfInvalidoException extends RuntimeException {
    public CpfInvalidoException() {
        super("O CPF informado é inválido!");
    }
}
