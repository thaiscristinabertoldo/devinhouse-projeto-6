package br.com.devinhouse.grupo5.domain.exceptions;

public class AssuntoNaoEncontradoException extends RuntimeException{
    public AssuntoNaoEncontradoException(){super("O assunto pelo qual buscavas não foi encontrado.");}
}
