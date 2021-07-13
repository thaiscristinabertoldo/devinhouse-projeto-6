package br.com.devinhouse.grupo04.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;

public class InteressadoDTOInput implements Serializable {

	private static final long serialVersionUID = 3007548449472824966L;

	@NotNull
	@Size(min = 1, max = 250)
	private String nmInteressado;
	
	@NotNull
	@CPF
	private String nuIdentificacao;
	
	@Pattern(regexp = "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$",
			message = "Data precisa seguir o padrão dd/MM/yyyy")
	@NotNull
	private String dtNascimento;
	
	private char flAtivo = 's';
	
	public InteressadoDTOInput() {
	}

	public InteressadoDTOInput(@NotNull @Size(min = 1, max = 250) String nmInteressado,
			@NotNull @CPF String nuIdentificacao,
			@Pattern(regexp = "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$", message = "Data precisa seguir o padrão dd/MM/yyyy") @NotNull String dtNascimento) {
		super();
		this.nmInteressado = nmInteressado;
		this.nuIdentificacao = nuIdentificacao;
		this.dtNascimento = dtNascimento;
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

	public String getDtNascimento() {
		return dtNascimento;
	}

	public void setDtNascimento(String dtNascimento) {
		this.dtNascimento = dtNascimento;
	}

	public char getFlAtivo() {
		return flAtivo;
	}

	public void setFlAtivo(char flAtivo) {
		this.flAtivo = flAtivo;
	}

}
