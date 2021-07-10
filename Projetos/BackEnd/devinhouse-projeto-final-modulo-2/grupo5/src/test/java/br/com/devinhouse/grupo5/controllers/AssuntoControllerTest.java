package br.com.devinhouse.grupo5.controllers;

import br.com.devinhouse.grupo5.dto.AssuntoInputDTO;
import br.com.devinhouse.grupo5.dto.AssuntoOutputDTO;
import br.com.devinhouse.grupo5.service.AssuntoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AssuntoController.class)
class AssuntoControllerTest {

  private final String BASE_URL = "/v1/assunto";

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private AssuntoService service;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void cadastrarAssuntoDeveRetornarHttpCreated () throws Exception {
    // Given
    var assuntoInput = new AssuntoInputDTO();
    var assuntoOutput = new AssuntoOutputDTO();
    MockHttpServletRequestBuilder request = post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .content(objectMapper.writeValueAsString(assuntoInput));

    // When
    when(service.cadastrarAssunto(any())).thenReturn(assuntoOutput);
    this.mockMvc.perform(request) // Then
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(status().isCreated());
  }

  @Test
  void buscarAssuntoPorIdDeveRetornarJsonEHttpOk () throws Exception {
    // Given
    MockHttpServletRequestBuilder request = get(BASE_URL+"/id/1");
    // When
    when(service.buscarAssuntoPorId(1L)).thenReturn(new AssuntoOutputDTO());
    this.mockMvc.perform(request) // Then
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(status().isOk());
  }
}