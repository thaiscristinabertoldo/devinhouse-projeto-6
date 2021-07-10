package br.com.devinhouse.grupo5.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import org.hibernate.validator.constraints.br.CPF;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Transactional
public class InteressadoInputDTO {

    private String nmInteressado;
    @CPF
    private String nuIdentificacao;
    private LocalDate dtNascimento;
    private Boolean flAtivo;

}
