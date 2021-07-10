package br.com.devinhouse.grupo5.util;

import java.time.LocalDate;

public class Validacoes {

    private Validacoes() {}

    public static boolean validarCpf(String cpf) {
        var validadorDeCpf = new int[11];
        var primeiroDigitoVerificador = 0;
        var segundoDigitoVerificador = 0;
        var variavelDeControle = 0;

        if (cpf.length() != 11) {
            return false;
        }

        for (var i = 0; i < 10; i ++){
            if (cpf.equals(i+""+i+""+i+""+i+""+i+""+i+""+i+""+i+""+i+""+i+""+i)){
                return false;
            }
        }

        for (var i = 0; i < cpf.length(); i++) {
            validadorDeCpf[i] = (cpf.charAt(i) - '0');
        }

        for (var i = 10; i >= 2; i--) {
            primeiroDigitoVerificador += validadorDeCpf[variavelDeControle] * i;
            variavelDeControle++;
        }

        primeiroDigitoVerificador = (primeiroDigitoVerificador * 10) % 11;

        if (primeiroDigitoVerificador == 10) {
            primeiroDigitoVerificador = 0;
        }

        if (primeiroDigitoVerificador != validadorDeCpf[9]) {
            return false;
        } else {
            variavelDeControle = 0;

            for (var i = 11; i >= 2; i--) {
                segundoDigitoVerificador += validadorDeCpf[variavelDeControle] * i;
                variavelDeControle++;
            }

            segundoDigitoVerificador = (segundoDigitoVerificador * 10) % 11;

            if (segundoDigitoVerificador == 10) {
                segundoDigitoVerificador = 0;
            }

            return segundoDigitoVerificador == validadorDeCpf[10];
        }
    }

    public static boolean validarDtNascimento(LocalDate dtNascimento) {

        var dataDeNascimento  = dtNascimento.toString();

        var hoje = LocalDate.now();
        var dataAtual = hoje.toString().split("-");
        var diaAtual = Integer.parseInt(dataAtual[2]);
        var mesAtual = Integer.parseInt(dataAtual[1]);
        var anoAtual = Integer.parseInt(dataAtual[0]);

        var dataInformada = dataDeNascimento.split("-");
        var diaInformado = Integer.parseInt(dataInformada[2]);
        var mesInformado = Integer.parseInt(dataInformada[1]);
        var anoInformado = Integer.parseInt(dataInformada[0]);

        var localDate = LocalDate.of(anoInformado, 1, 1);

        var diasDeFevereiro = 28;
        if (localDate.isLeapYear()){
            diasDeFevereiro = 29;
        }

        if (
                ((mesInformado == 1 || mesInformado == 3 || mesInformado == 5 || mesInformado == 7
                        || mesInformado == 8 || mesInformado == 10 || mesInformado == 12) && (diaInformado <= 31))  ||
                        ((mesInformado == 4 || mesInformado == 6 || mesInformado == 9 || mesInformado == 11) && (diaInformado <= 30)) ||
                        ((mesInformado == 2) && (diaInformado <= diasDeFevereiro))
        ){
            return (anoInformado <= anoAtual) && (anoInformado != anoAtual || mesInformado <= mesAtual)
                    && (anoInformado != anoAtual || mesInformado != mesAtual || diaInformado <= diaAtual);
        }
        return false;
    }

}
