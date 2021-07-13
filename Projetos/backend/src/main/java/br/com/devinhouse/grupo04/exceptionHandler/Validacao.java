package br.com.devinhouse.grupo04.exceptionHandler;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Validacao implements Serializable {

	private static final long serialVersionUID = -3628693644994297786L;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate data;
	private String mensagem;
	private Integer statusCode;
	private List<Campo> campos;

	public Validacao(LocalDate data, String mensagem, Integer statusCode) {
		this.data = data;
		this.mensagem = mensagem;
		this.statusCode = statusCode;
	}

	public LocalDate getData() {
		return data;
	}

	public String getMensagem() {
		return mensagem;
	}

	public Integer getStatusCode() {
		return statusCode;
	}

	public List<Campo> getCampos() {
		return campos;
	}

	public void setCampos(List<Campo> campos) {
		this.campos = campos;
	}

	public static class Campo {
		private String nome;
		private String mensagem;

		public Campo(String nome, String mensagem) {
			this.nome = nome;
			this.mensagem = mensagem;
		}

		public String getNome() {
			return nome;
		}

		public String getMensagem() {
			return mensagem;
		}

	}

}
