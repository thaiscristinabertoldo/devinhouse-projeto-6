package br.com.devinhouse.grupo04.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity(name = "interessados")
@Table(
    name="INTERESSADOS",
    uniqueConstraints=
        @UniqueConstraint(columnNames={"nuIdentificacao"})
)
public class Interessado implements Serializable {

	private static final long serialVersionUID = 3004582624844052335L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 250)
	private String nmInteressado;
	
	@Column(nullable = false, length = 50)
	private String nuIdentificacao;
	
	@Column(nullable = false)
	private LocalDate dtNascimento;
	
	@Column(nullable = false, length = 1)
	private char flAtivo = 's';
	
	public Interessado() {
	}
	
	public Interessado(String nmInteressado, String nuIdentificacao, LocalDate dtNascimento) {
		this.nmInteressado = nmInteressado;
		this.nuIdentificacao = nuIdentificacao;
		this.dtNascimento = dtNascimento;
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
