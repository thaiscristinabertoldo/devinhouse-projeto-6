package br.com.devinhouse.grupo04.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AssuntoDTOOutput implements Serializable {

	private static final long serialVersionUID = -7326289900955889688L;
	
	private Long id;
	private String descricao;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dtCadastro;
	private char flAtivo;

	public AssuntoDTOOutput() {
	}
	
	public AssuntoDTOOutput(Long id, String descricao, LocalDate dtCadastro, char flAtivo) {
		this.id = id;
		this.descricao = descricao;
		this.dtCadastro = dtCadastro;
		this.flAtivo = flAtivo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDtCadastro() {
		return dtCadastro;
	}

	public void setDtCadastro(LocalDate dtCadastro) {
		this.dtCadastro = dtCadastro;
	}

	public char getFlAtivo() {
		return flAtivo;
	}

	public void setFlAtivo(char flAtivo) {
		this.flAtivo = flAtivo;
	}

}
