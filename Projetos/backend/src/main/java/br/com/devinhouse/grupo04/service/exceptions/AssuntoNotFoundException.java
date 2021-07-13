package br.com.devinhouse.grupo04.service.exceptions;

public class AssuntoNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -3945114423755873181L;

	public AssuntoNotFoundException() {
		super("Nenhum assunto encontrado");
	}

}
