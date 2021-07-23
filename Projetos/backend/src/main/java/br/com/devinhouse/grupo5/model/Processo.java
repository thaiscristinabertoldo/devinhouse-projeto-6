package br.com.devinhouse.grupo5.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "Processos")
public class Processo {

	@NotNull
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;
	@NotNull
	@Column(length = 4)
	private String sgOrgaoSetor;
	@NotNull
	@Column(length = 4)
	private String nuAno;
	@NotNull
	@Column(length = 45)
	private String chaveProcesso;
	@NotNull
	@Column(length = 250)
	private String descricao;
	@NotNull
	@JoinColumn(name = "Assunto_idAssunto_id", referencedColumnName = "id")
	@ManyToOne
	private Assunto cdAssunto;
	@NotNull
	@JoinColumn(name = "Interessado_idInteressado_id", referencedColumnName = "id")
	@ManyToOne
	private Interessado cdInteressado;

	@Builder(toBuilder = true)
	public Processo(String sgOrgaoSetor, String nuAno, String descricao, Assunto cdAssunto,
					Interessado cdInteressado) {
		this.sgOrgaoSetor = sgOrgaoSetor;
		this.nuAno = nuAno;
		this.descricao = descricao;
		this.cdAssunto = cdAssunto;
		this.cdInteressado = cdInteressado;
		this.chaveProcesso = this.sgOrgaoSetor + " " + this.id + "/" + this.nuAno;
	}
}
