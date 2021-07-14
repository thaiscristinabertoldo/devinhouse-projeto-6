package br.com.devinhouse.grupo04.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ProcessoDTOInput implements Serializable {

	private static final long serialVersionUID = -393417692491112721L;

	@NotNull
	@Size(min = 1, max = 4)
	private String sgOrgaoSetor;
	
	@NotNull
	@Size(min = 1, max = 4)
	private String nuAno;
	
	@NotNull
	@Size(min = 1, max = 250)
	private String descricao;
	
	@NotNull
	private Long cdAssuntoId;
	
	@NotNull
	private Long cdInteressadoId;

	public ProcessoDTOInput() {
	}

	public ProcessoDTOInput(@NotNull @Size(min = 1, max = 4) String sgOrgaoSetor,
			@NotNull @Size(min = 1, max = 4) String nuAno, @NotNull @Size(min = 1, max = 250) String descricao,
			@NotNull Long cdAssuntoId, @NotNull Long cdInteressadoId) {
		this.sgOrgaoSetor = sgOrgaoSetor;
		this.nuAno = nuAno;
		this.descricao = descricao;
		this.cdAssuntoId = cdAssuntoId;
		this.cdInteressadoId = cdInteressadoId;
	}

	public String getSgOrgaoSetor() {
		return sgOrgaoSetor;
	}

	public void setSgOrgaoSetor(String sgOrgaoSetor) {
		this.sgOrgaoSetor = sgOrgaoSetor;
	}

	public String getNuAno() {
		return nuAno;
	}

	public void setNuAno(String nuAno) {
		this.nuAno = nuAno;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Long getCdAssuntoId() {
		return cdAssuntoId;
	}

	public void setCdAssuntoId(Long cdAssuntoId) {
		this.cdAssuntoId = cdAssuntoId;
	}

	public Long getCdInteressadoId() {
		return cdInteressadoId;
	}

	public void setCdInteressadoId(Long cdInteressadoId) {
		this.cdInteressadoId = cdInteressadoId;
	}

}