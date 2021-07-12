package br.com.devinhouse.grupo04.service.exceptions;

public class NuIdentificacaoJaExistenteException extends RuntimeException {

	private static final long serialVersionUID = -4976330898755607160L;

	public NuIdentificacaoJaExistenteException(String message) {
		super(message);
	}

}
