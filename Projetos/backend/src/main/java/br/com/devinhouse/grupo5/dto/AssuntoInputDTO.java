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
public class AssuntoInputDTO {

    private String descricao;
    private LocalDate dtCadastro;
    private Boolean flAtivo;

}