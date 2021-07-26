package br.com.devinhouse.grupo5.domain.exceptionhandler;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@JsonInclude(value = Include.NON_NULL)
public class Validation {
	private int status;
	private OffsetDateTime dataHora;
	private String titulo;
	private List<Campo> campos;

	@Data
	@AllArgsConstructor
	public static class Campo {
		private String nome;
		private String mensagem;
	}
}
