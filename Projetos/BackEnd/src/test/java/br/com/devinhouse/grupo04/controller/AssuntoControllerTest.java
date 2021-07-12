package br.com.devinhouse.grupo04.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.devinhouse.grupo04.dto.AssuntoDTOInput;
import br.com.devinhouse.grupo04.dto.AssuntoDTOOutput;
import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.mapper.AssuntoMapper;
import br.com.devinhouse.grupo04.service.AssuntoService;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoNotFoundException;

@WebMvcTest(value = AssuntoController.class)
class AssuntoControllerTest {


	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private AssuntoService assuntoService;
	
	@MockBean
	private AssuntoMapper assuntoMapper;

	@Mock
	private Assunto assunto;

	@Test
	void deveRetornarTodosOsAssuntos() throws Exception {
		// given
		AssuntoDTOOutput assuntoDto = new AssuntoDTOOutput(1L, "descricao", LocalDate.now(), 's');
		AssuntoDTOOutput outroAssuntoDto = new AssuntoDTOOutput(2L, "outra descricao", LocalDate.now(), 's');

		given(assuntoService.findAll()).willReturn(List.of(assunto, assunto));

		// when
		when(assuntoMapper.toDto(List.of(assunto, assunto))).thenReturn(List.of(assuntoDto, outroAssuntoDto));

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/assuntos")
				.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0].id").isNotEmpty())
			.andExpect(jsonPath("$.[0].descricao").value("descricao"))
			.andExpect(jsonPath("$.[1].id").isNotEmpty())
			.andExpect(jsonPath("$.[1].descricao").value("outra descricao"))
		;
	}

	@Test
	void deveRetornarUmAssunto() throws Exception {
		// given
		AssuntoDTOOutput assuntoDto = new AssuntoDTOOutput(1L, "descricao", LocalDate.now(), 's');

		given(assuntoService.find(1L)).willReturn(assunto);

		// when
		when(assuntoMapper.toDto(assunto)).thenReturn(assuntoDto);

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/assuntos/1")
				.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").isNotEmpty())
			.andExpect(jsonPath("$.descricao").value("descricao"))
		;
	}

	@Test
	void deveRetornarStatus404QuandoAssuntoNaoEncontrado() throws Exception {
		// given
		AssuntoNotFoundException exception = new AssuntoNotFoundException();
		given(assuntoService.find(1L)).willThrow(exception);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/assuntos/1")
				.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.mensagem").value("Nenhum assunto encontrado"))
			.andExpect(jsonPath("$.statusCode").value("404"))
		;
	}

	@Test
	void deveRetornarStatus400QuandoFlAtivoDiferenteDeSOuN() throws Exception {
		// given
		AssuntoFlAtivoInvalidException exception = new AssuntoFlAtivoInvalidException("O flAtivo deve ser 's' ou 'n'");
		
		AssuntoDTOInput inputDTO = new AssuntoDTOInput();
		
		given(assuntoMapper.toAssunto(any(AssuntoDTOInput.class))).willReturn(assunto);
		
		doThrow(exception).when(assuntoService).update(1L, assunto);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put("/v1/assuntos/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.mensagem").value("O flAtivo deve ser 's' ou 'n'"))
			.andExpect(jsonPath("$.statusCode").value("400"))
		;
	}

	@Test
	void deveCriarUmAssunto() throws Exception {
		// given
		AssuntoDTOOutput assuntoDto = new AssuntoDTOOutput(1L, "descricao", LocalDate.now(), 's');
		AssuntoDTOInput inputDTO = new AssuntoDTOInput("descricao");
	

		given(assuntoMapper.toAssunto(any(AssuntoDTOInput.class))).willReturn(assunto);
		when(assuntoMapper.toDto(any(Assunto.class))).thenReturn(assuntoDto);

		// when
		when(assuntoService.create(any(Assunto.class))).thenReturn(assunto);
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/assuntos")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").isNotEmpty())
			.andExpect(jsonPath("$.descricao").value("descricao"))
			.andExpect(jsonPath("$.dtCadastro").isNotEmpty())
			.andExpect(jsonPath("$.flAtivo").value("s"))
		;
	}

	@Test
	void deveAtualizarUmAssunto() throws Exception {
		// given
		AssuntoDTOInput inputDTO = new AssuntoDTOInput("descricao");
		given(assuntoMapper.toAssunto(any(AssuntoDTOInput.class))).willReturn(assunto);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put("/v1/assuntos/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}
	
	@Test
	void deveExcluirUmAssunto() throws Exception {
		
		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.delete("/v1/assuntos/1")
			.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}
}
