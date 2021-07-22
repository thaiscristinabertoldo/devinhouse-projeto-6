package br.com.devinhouse.grupo5.domain.exceptions;

public class CpfJaExistenteException extends RuntimeException {
    public CpfJaExistenteException(String message) {
        super(message);
    }
}
