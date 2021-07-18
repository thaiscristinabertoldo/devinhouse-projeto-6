package br.com.devinhouse.grupo5.domain.exceptions;

public class InteressadoNaoEncontradoException extends RuntimeException{
    public InteressadoNaoEncontradoException(){super("O interessado que buscavas não foi encontrado");}
}
