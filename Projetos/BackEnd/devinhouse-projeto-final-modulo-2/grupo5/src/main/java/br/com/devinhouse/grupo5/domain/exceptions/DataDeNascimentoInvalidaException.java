package br.com.devinhouse.grupo5.domain.exceptions;

public class DataDeNascimentoInvalidaException extends RuntimeException {
    public DataDeNascimentoInvalidaException(){
        super("A data de nascimento informada é inválida.");
    }
}
