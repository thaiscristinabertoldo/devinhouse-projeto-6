package br.com.devinhouse.grupo04.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InteressadoDTOOutput implements Serializable {

	private static final long serialVersionUID = 1618048231060909557L;

	private Long id;
	private String nmInteressado;
	private String nuIdentificacao;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dtNascimento;
	private char flAtivo;

	public InteressadoDTOOutput() {
	}

	public InteressadoDTOOutput(Long id, String nmInteressado, String nuIdentificacao, LocalDate dtNascimento,
			char flAtivo) {
		super();
		this.id = id;
		this.nmInteressado = nmInteressado;
		this.nuIdentificacao = nuIdentificacao;
		this.dtNascimento = dtNascimento;
		this.flAtivo = flAtivo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNmInteressado() {
		return nmInteressado;
	}

	public void setNmInteressado(String nmInteressado) {
		this.nmInteressado = nmInteressado;
	}

	public String getNuIdentificacao() {
		return nuIdentificacao;
	}

	public void setNuIdentificacao(String nuIdentificacao) {
		this.nuIdentificacao = nuIdentificacao;
	}

	public LocalDate getDtNascimento() {
		return dtNascimento;
	}

	public void setDtNascimento(LocalDate dtNascimento) {
		this.dtNascimento = dtNascimento;
	}

	public char getFlAtivo() {
		return flAtivo;
	}

	public void setFlAtivo(char flAtivo) {
		this.flAtivo = flAtivo;
	}

}
