package br.com.devinhouse.grupo04.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

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

import br.com.devinhouse.grupo04.dto.InteressadoDTOInput;
import br.com.devinhouse.grupo04.dto.InteressadoDTOOutput;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.mapper.InteressadoMapper;
import br.com.devinhouse.grupo04.service.InteressadoService;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoNotFoundException;
import br.com.devinhouse.grupo04.service.exceptions.NuIdentificacaoJaExistenteException;

@WebMvcTest(value = InteressadoController.class)
class InteressadoControllerTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private InteressadoService interessadoService;

	@MockBean
	private InteressadoMapper interessadoMapper;

	@Mock
	private Interessado interessado;

	@Test
	void deveCriarUmInteressado() throws Exception {
		// given
		InteressadoDTOOutput interessadoDto = new InteressadoDTOOutput(1L, "Testeout", "76423941017", LocalDate.now(), 's');
		InteressadoDTOInput inputDTO = new InteressadoDTOInput("Teste", "76423941017", "05/10/1997");

		given(interessadoMapper.toInteressado(any(InteressadoDTOInput.class))).willReturn(interessado);
		when(interessadoMapper.toDto(any(Interessado.class))).thenReturn(interessadoDto);

		// when
		when(interessadoService.create(any(Interessado.class))).thenReturn(interessado);
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/interessados")
				.contentType(APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").isNotEmpty())
			.andExpect(jsonPath("$.nmInteressado").value("Testeout"))
			.andExpect(jsonPath("$.dtNascimento").isNotEmpty())
			.andExpect(jsonPath("$.nuIdentificacao").isNotEmpty())
			.andExpect(jsonPath("$.nuIdentificacao").value("76423941017"))
			.andExpect(jsonPath("$.flAtivo").value("s"));
	}
	
	@Test
	void deveRetornarStatus400QuandoCamposNulos() throws Exception {
		// given
		InteressadoDTOInput inputDTO = new InteressadoDTOInput(null, null, null);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/interessados")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO))
				.locale(new Locale("pt-BR"));

		// then
		mvc.perform(request)
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.mensagem").value("Um ou mais campos estão incorretos. Corrija e tente novamente"))
			.andExpect(jsonPath("$.statusCode").value("400"))
			.andExpect(jsonPath("$.campos[0].nome").isNotEmpty())
			.andExpect(jsonPath("$.campos[0].mensagem").value("não deve ser nulo"))
			.andExpect(jsonPath("$.campos[1].nome").isNotEmpty())
			.andExpect(jsonPath("$.campos[1].mensagem").value("não deve ser nulo"))
			.andExpect(jsonPath("$.campos[2].nome").isNotEmpty())
			.andExpect(jsonPath("$.campos[2].mensagem").value("não deve ser nulo"))
		;
	}
	
	@Test
	void deveRetornarStatus400QuandoNuIdentificacaoJaExistente() throws Exception {
		// given
		InteressadoDTOInput inputDTO = new InteressadoDTOInput("Teste", "76423941017", "05/10/1997");
		
		given(interessadoMapper.toInteressado(any(InteressadoDTOInput.class))).willReturn(interessado);
		
		NuIdentificacaoJaExistenteException exception = new NuIdentificacaoJaExistenteException("CPF informado já cadastrado");
		given(interessadoService.create(any(Interessado.class))).willThrow(exception);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/interessados")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO))
				.locale(new Locale("pt-BR"));

		// then
		mvc.perform(request)
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.mensagem").value("CPF informado já cadastrado"))
			.andExpect(jsonPath("$.statusCode").value("400"))
		;
	}

	@Test
	void deveRetornarTodosOsInteressados() throws Exception {
		//given
		InteressadoDTOOutput interessadoDto = new InteressadoDTOOutput(1L, "Testeout", "76423941017", LocalDate.now(), 's');
		InteressadoDTOOutput outroInteressadoDto = new InteressadoDTOOutput(1L, "Testeoutoutro", "56575937071", LocalDate.now(), 's');
		given(interessadoService.findAll(null)).willReturn(List.of(interessado, interessado));
		//when
		when(interessadoMapper.toDto(List.of(interessado, interessado))).thenReturn(List.of(interessadoDto, outroInteressadoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/interessados")
				.contentType(APPLICATION_JSON);
		

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nmInteressado").value("Testeout"))
			.andExpect(jsonPath("$.[0]dtNascimento").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuIdentificacao").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuIdentificacao").value("76423941017"))
			.andExpect(jsonPath("$.[0]flAtivo").value("s"))
			.andExpect(jsonPath("$.[1]id").isNotEmpty())
			.andExpect(jsonPath("$.[1]nmInteressado").value("Testeoutoutro"))
			.andExpect(jsonPath("$.[1]dtNascimento").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuIdentificacao").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuIdentificacao").value("56575937071"))
			.andExpect(jsonPath("$.[1]flAtivo").value("s"));
		
	}
	
	@Test
	void deveRetornarInteressadoPorCpf() throws Exception {
		//given
		InteressadoDTOOutput interessadoDto = new InteressadoDTOOutput(1L, "Testeout", "76423941017", LocalDate.now(), 's');
		given(interessadoService.findAll("56575937071")).willReturn(List.of(interessado));
		//when
		when(interessadoMapper.toDto(List.of(interessado))).thenReturn(List.of(interessadoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/interessados")
				.contentType(APPLICATION_JSON).queryParam("nu_identificacao", "56575937071");
		
		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nmInteressado").value("Testeout"))
			.andExpect(jsonPath("$.[0]dtNascimento").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuIdentificacao").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuIdentificacao").value("76423941017"))
			.andExpect(jsonPath("$.[0]flAtivo").value("s"));
			
	}

	@Test
	void deveRetornarUmInteressado() throws Exception {
		// given
		InteressadoDTOOutput interessadoDto = new InteressadoDTOOutput(1L, "Testeout", "76423941017", LocalDate.now(), 's');

		given(interessadoService.find(any(Long.class))).willReturn(interessado);

		// when
		when(interessadoMapper.toDto(any(Interessado.class))).thenReturn(interessadoDto);

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/interessados/1")
				.contentType(APPLICATION_JSON);

		// then
		mvc.perform(request)
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.id").isNotEmpty())
		.andExpect(jsonPath("$.nmInteressado").value("Testeout"))
		.andExpect(jsonPath("$.dtNascimento").isNotEmpty())
		.andExpect(jsonPath("$.nuIdentificacao").isNotEmpty())
		.andExpect(jsonPath("$.nuIdentificacao").value("76423941017"))
		.andExpect(jsonPath("$.flAtivo").value("s"));
		;
	}
	
	@Test
	void deveRetornarStatus404QuandoInteressadoNaoEncontrado() throws Exception {
		// given
		InteressadoNotFoundException exception = new InteressadoNotFoundException();
		given(interessadoService.find(any(Long.class))).willThrow(exception);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/interessados/1")
				.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.mensagem").value("Nenhum interessado encontrado"))
			.andExpect(jsonPath("$.statusCode").value("404"))
		;
	}

	@Test
	void deveAtualizarUmInteressado() throws Exception {
		// given
		InteressadoDTOInput inputDTO = new InteressadoDTOInput();
		
		given(interessadoMapper.toInteressado(any(InteressadoDTOInput.class))).willReturn(interessado);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put("/v1/interessados/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}
	
	@Test
	void deveRetornarStatus400QuandoFlAtivoDiferenteDeSOuN() throws Exception {
		// given
		InteressadoFlAtivoInvalidException exception = new InteressadoFlAtivoInvalidException("O flAtivo deve ser 's' ou 'n'");
		
		InteressadoDTOInput inputDTO = new InteressadoDTOInput();
		
		given(interessadoMapper.toInteressado(any(InteressadoDTOInput.class))).willReturn(interessado);
		
		doThrow(exception).when(interessadoService).update(1L, interessado);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put("/v1/interessados/1")
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
	void deveExcluirUmInteressado() throws Exception {
		
		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.delete("/v1/interessados/1")
			.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}

}
