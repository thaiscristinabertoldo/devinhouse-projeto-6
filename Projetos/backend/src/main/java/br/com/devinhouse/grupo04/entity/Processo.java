package br.com.devinhouse.grupo04.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PostPersist;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity(name = "processos")
@Table(name = "PROCESSOS", uniqueConstraints = @UniqueConstraint(columnNames = { "chaveProcesso", "nuProcesso" }))
public class Processo implements Serializable {

	private static final long serialVersionUID = 3446200032394564533L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long nuProcesso;

	@Column(nullable = false, length = 4)
	private String sgOrgaoSetor;

	@Column(nullable = false, length = 4)
	private String nuAno;

	@Column(nullable = false, length = 50)
	private String chaveProcesso;

	@Column(nullable = false)
	private String descricao;

	@ManyToOne(optional = false)
	@JoinColumn(name = "cd_assunto_id", nullable = false)
	private Assunto cdAssunto;

	@ManyToOne(optional = false)
	@JoinColumn(name = "cd_interessado_id", nullable = false)
	private Interessado cdInteressado;

	@PrePersist
	public void validaCamposAutoGerados() {
		if (nuProcesso == null) {
			nuProcesso = 0L;
		}
		chaveProcesso = String.format("%s %d/%s", this.sgOrgaoSetor, this.nuProcesso, this.nuAno);
	}

	@PostPersist
	public void geraVaLoresCamposAutoGerados() {
		nuProcesso = this.id;
		chaveProcesso = String.format("%s %d/%s", this.sgOrgaoSetor, this.nuProcesso, this.nuAno);
	}

	public Processo() {
	}

	public Processo(String sgOrgaoSetor, String nuAno, String descricao, Assunto cdAssunto, Interessado cdInteressado) {
		this.sgOrgaoSetor = sgOrgaoSetor;
		this.nuAno = nuAno;
		this.descricao = descricao;
		this.cdAssunto = cdAssunto;
		this.cdInteressado = cdInteressado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getNuProcesso() {
		return nuProcesso;
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

	public String getChaveProcesso() {
		return chaveProcesso;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Assunto getCdAssunto() {
		return cdAssunto;
	}

	public void setCdAssunto(Assunto cdAssunto) {
		this.cdAssunto = cdAssunto;
	}

	public Interessado getCdInteressado() {
		return cdInteressado;
	}

	public void setCdInteressado(Interessado cdInteressado) {
		this.cdInteressado = cdInteressado;
	}

}
