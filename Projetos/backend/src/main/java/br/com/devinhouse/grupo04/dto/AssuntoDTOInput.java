package br.com.devinhouse.grupo04.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class AssuntoDTOInput implements Serializable {

	private static final long serialVersionUID = -4556202050244937698L;
	
	@NotNull
	@Size(min = 1, max = 250)
	private String descricao;
	
	private char flAtivo = 's';
	
	public AssuntoDTOInput() {
	}

	public AssuntoDTOInput(@NotNull @Size(min = 1, max = 250) String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public char getFlAtivo() {
		return flAtivo;
	}

	public void setFlAtivo(char flAtivo) {
		this.flAtivo = flAtivo;
	}

}
