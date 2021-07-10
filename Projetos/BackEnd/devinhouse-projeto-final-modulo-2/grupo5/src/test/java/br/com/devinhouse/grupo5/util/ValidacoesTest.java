package br.com.devinhouse.grupo5.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import static br.com.devinhouse.grupo5.util.Validacoes.validarCpf;
import static br.com.devinhouse.grupo5.util.Validacoes.validarDtNascimento;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ValidacoesTest {

    @ParameterizedTest
    @ValueSource(strings = {"76886945076", "81409124096", "38426812910", "37702759003", "99453625000"})
    void deveRetornarTrueParaCPFsValidos(String param) {

        boolean actual = validarCpf(param);

        assertThat(actual).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"11111111111", "12345678910", "384268129", "37702759113", "99453625100"})
    void deveRetornarFalseParaCPFsValidos(String param) {

        boolean actual = validarCpf(param);

        assertThat(actual).isFalse();
    }

    @ParameterizedTest
    @ValueSource(strings = {"1996-02-15", "2000-12-12", "2011-09-07", "2012-10-31", "2020-12-25"})
    void deveRetornarTrueParaDataDeNascimentoValida(String param) {

        boolean actual = validarDtNascimento(LocalDate.parse(param));

        assertThat(actual).isTrue();
    }

    @Test
    void deveRetornarTrueParaDataDeNascimentoInvalida() {

        String dtNascimento = LocalDate.now().toString();

        var dataAtual = dtNascimento.split("-");

        var dia = Integer.parseInt(dataAtual[2]) + 1;
        var mes = dataAtual[1];
        var ano =   dataAtual[0];

        dtNascimento = ano + "-" + mes + "-" + dia;

        boolean actual = validarDtNascimento(LocalDate.parse(dtNascimento));

        assertThat(actual).isFalse();
    }
}