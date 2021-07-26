package br.com.devinhouse.grupo04.service.exceptions;

public class AssuntoFlAtivoInvalidException extends RuntimeException{

	private static final long serialVersionUID = -5482620823972882164L;

	public AssuntoFlAtivoInvalidException(String message) {
		super(message);
	}
}
