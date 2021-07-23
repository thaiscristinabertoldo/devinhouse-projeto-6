package br.com.devinhouse.grupo5.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProcessoInputDTO {


  @NotNull
  private String sgOrgaoSetor;
  @NotNull
  private String nuAno;
  @NotNull
  private String descricao;
  @NotNull
  private Long cdAssunto;
  @NotNull
  private Long cdInteressado;

}
