package br.com.devinhouse.grupo04.service.exceptions;

public class InteressadoNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 8698514388413176525L;

	public InteressadoNotFoundException() {
		super("Nenhum interessado encontrado");
	}

}
