package br.com.devinhouse.grupo04.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity(name = "assuntos")
public class Assunto implements Serializable {

	private static final long serialVersionUID = -1783220061547537590L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 250)
	private String descricao;
	
	@Column(nullable = false)
	private LocalDate dtCadastro = LocalDate.now();
	
	@Column(nullable = false, length = 1)
	private char flAtivo = 's';
	
	public Assunto() {
	}

	public Assunto(String descricao) {
		this.descricao = descricao;
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
