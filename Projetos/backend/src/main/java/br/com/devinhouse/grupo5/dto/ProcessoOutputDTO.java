package br.com.devinhouse.grupo5.dto;

import br.com.devinhouse.grupo5.model.Assunto;
import br.com.devinhouse.grupo5.model.Interessado;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProcessoOutputDTO {

  private Long id;
  private Long nuProcesso;
  private String sgOrgaoSetor;
  private String nuAno;
  private String chaveProcesso;
  private String descricao;
  private Assunto cdAssunto;
  private Interessado cdInteressado;

}
