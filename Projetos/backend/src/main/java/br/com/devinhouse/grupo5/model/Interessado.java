package br.com.devinhouse.grupo5.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "Interessado")
public class Interessado {

	@NotNull
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;
	@NotNull
	@Column(length = 250)
	private String nmInteressado;
	@NotNull
	@Column(length = 50)
	private String nuIdentificacao;
	@NotNull
	@Column
	private LocalDate dtNascimento;
	@NotNull
	@Column
	private Boolean flAtivo;
}
