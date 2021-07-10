package br.com.devinhouse.grupo5.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InteressadoOutputDTO {

    private Long id;
    private String nmInteressado;
    private String nuIdentificacao;
    private LocalDate dtNascimento;
    private Boolean flAtivo;

}
