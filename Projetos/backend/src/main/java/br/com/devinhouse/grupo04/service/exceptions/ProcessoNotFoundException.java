package br.com.devinhouse.grupo04.service.exceptions;

public class ProcessoNotFoundException extends RuntimeException{

	private static final long serialVersionUID = -1344518890508864089L;

	public ProcessoNotFoundException() {
		super("Nenhum processo encontrado");
	}

}
