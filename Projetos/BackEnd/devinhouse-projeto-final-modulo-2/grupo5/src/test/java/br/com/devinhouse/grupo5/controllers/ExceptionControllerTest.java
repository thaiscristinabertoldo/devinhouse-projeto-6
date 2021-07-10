package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.domain.exceptionhandler.ValidationHandler;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.MessageSource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExceptionController.class)
class ExceptionControllerTest {
  @Autowired
  private MockMvc mockMvc;

  private final String BASE_URL = "/v1/exception/";
//  @Test
//  void handleMethodArgumentNotValid() {
//
//  }

  @Test
  void assuntoInativoHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "AssuntoInativo");
    this.mockMvc.perform(request)
      .andExpect(status().isBadRequest());
  }

  @Test
  void cpfInvalidoHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "CpfInvalido");
    this.mockMvc.perform(request)
      .andExpect(status().isBadRequest());
  }

  @Test
  void dataDeNascimentoInvalidaHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "DataDeNascimentoInvalida");
    this.mockMvc.perform(request)
      .andExpect(status().isBadRequest());
  }

  @Test
  void cpfExistenteHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "CpfJaExistente");
    this.mockMvc.perform(request)
      .andExpect(status().isNotFound());
  }

  @Test
  void pessoaNaoEncontradaHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "ProcessoNaoEncontrado");
    this.mockMvc.perform(request)
      .andExpect(status().isNotFound());
  }

  @Test
  void assuntoNaoEncontradoHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "AssuntoNaoEncontrado");
    this.mockMvc.perform(request)
      .andExpect(status().isNotFound());
  }

  @Test
  void nuProcessoJaCadastradoException () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "NuProcessoJaCadastrado");
    this.mockMvc.perform(request)
      .andExpect(status().isBadRequest());
  }

  @Test
  void interessadoNaoEncontradoHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "InteressadoNaoEncontrado");
    this.mockMvc.perform(request)
      .andExpect(status().isNotFound());
  }

  @Test
  void interessadoInativoHandler () throws Exception {
    MockHttpServletRequestBuilder request = get(BASE_URL + "InteressadoInativo");
    this.mockMvc.perform(request)
      .andExpect(status().isBadRequest());
  }

}
