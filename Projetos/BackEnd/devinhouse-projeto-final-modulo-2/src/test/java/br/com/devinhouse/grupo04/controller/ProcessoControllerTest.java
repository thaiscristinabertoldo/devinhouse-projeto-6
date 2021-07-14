package br.com.devinhouse.grupo04.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.devinhouse.grupo04.dto.ProcessoDTOInput;
import br.com.devinhouse.grupo04.dto.ProcessoDTOOutput;
import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.entity.Processo;
import br.com.devinhouse.grupo04.mapper.ProcessoMapper;
import br.com.devinhouse.grupo04.service.ProcessoService;
import br.com.devinhouse.grupo04.service.exceptions.ProcessoNotFoundException;

@WebMvcTest(value = ProcessoController.class)
class ProcessoControllerTest {
	
	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private ProcessoMapper processoMapper;
	
	@MockBean
	private ProcessoService processoService;
	
	@Mock
	private Processo processo;

	@Test
	void deveRetornarTodosOsProcessos() throws Exception {
		//given
		Assunto assunto = new Assunto();
		Interessado interessado = new Interessado();
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		ProcessoDTOOutput outroProcessoDto = new ProcessoDTOOutput(2L, 2L, "SOFT", "2021", "SOFT 2/2021", "outra descricao", assunto, interessado);
		given(processoService.findAll(null, null, null)).willReturn(List.of(processo, processo));
		
		//when
		when(processoMapper.toDto(List.of(processo, processo))).thenReturn(List.of(processoDto, outroProcessoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos")
				.contentType(APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[0]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuAno").value("2021"))
			.andExpect(jsonPath("$.[0]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.[0]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[0]descricao").value("descricao"))
			.andExpect(jsonPath("$.[1]id").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[1]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuAno").value("2021"))
			.andExpect(jsonPath("$.[1]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]chaveProcesso").value("SOFT 2/2021"))
			.andExpect(jsonPath("$.[1]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[1]descricao").value("outra descricao"));
	}
	
	@Test
	void deveRetornarTodosOsProcessosPorChaveProcesso() throws Exception {
		//given
		Assunto assunto = new Assunto();
		Interessado interessado = new Interessado();
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		given(processoService.findAll("SOFT 1/2021", null, null)).willReturn(List.of(processo));
		
		//when
		when(processoMapper.toDto(List.of(processo))).thenReturn(List.of(processoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos")
				.contentType(APPLICATION_JSON)
				.queryParam("chave_processo", "SOFT 1/2021");

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[0]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuAno").value("2021"))
			.andExpect(jsonPath("$.[0]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.[0]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[0]descricao").value("descricao"));
	}
	
	@Test
	void deveRetornarTodosOsProcessosPorAssunto() throws Exception {
		//given
		Assunto assunto = new Assunto();
		assunto.setId(1L);
		Interessado interessado = new Interessado();
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		ProcessoDTOOutput outroProcessoDto = new ProcessoDTOOutput(2L, 2L, "SOFT", "2021", "SOFT 2/2021", "outra descricao", assunto, interessado);
		given(processoService.findAll(null, null, 1L)).willReturn(List.of(processo, processo));
		
		//when
		when(processoMapper.toDto(List.of(processo, processo))).thenReturn(List.of(processoDto, outroProcessoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos")
				.contentType(APPLICATION_JSON)
				.queryParam("cd_assunto_id", "1");

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[0]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuAno").value("2021"))
			.andExpect(jsonPath("$.[0]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.[0]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[0]descricao").value("descricao"))
			.andExpect(jsonPath("$.[0]cdAssunto.id").value("1"))
			.andExpect(jsonPath("$.[1]id").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[1]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuAno").value("2021"))
			.andExpect(jsonPath("$.[1]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]chaveProcesso").value("SOFT 2/2021"))
			.andExpect(jsonPath("$.[1]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[1]descricao").value("outra descricao"))
			.andExpect(jsonPath("$.[1]cdAssunto.id").value("1"));
	}
	
	@Test
	void deveRetornarTodosOsProcessosPorInteressado() throws Exception {
		//given
		Assunto assunto = new Assunto();
		Interessado interessado = new Interessado();
		interessado.setId(1L);
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		ProcessoDTOOutput outroProcessoDto = new ProcessoDTOOutput(2L, 2L, "SOFT", "2021", "SOFT 2/2021", "outra descricao", assunto, interessado);
		given(processoService.findAll(null, 1L, null)).willReturn(List.of(processo, processo));
		
		//when
		when(processoMapper.toDto(List.of(processo, processo))).thenReturn(List.of(processoDto, outroProcessoDto));
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos")
				.contentType(APPLICATION_JSON)
				.queryParam("cd_interessado_id", "1");

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[0]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuAno").value("2021"))
			.andExpect(jsonPath("$.[0]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.[0]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[0]descricao").value("descricao"))
			.andExpect(jsonPath("$.[0]cdInteressado.id").value("1"))
			.andExpect(jsonPath("$.[1]id").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[1]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuAno").value("2021"))
			.andExpect(jsonPath("$.[1]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]chaveProcesso").value("SOFT 2/2021"))
			.andExpect(jsonPath("$.[1]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[1]descricao").value("outra descricao"))
			.andExpect(jsonPath("$.[1]cdInteressado.id").value("1"));
	}
	
	@Test
	void deveRetornarTodosOsProcessosPorInteressadoEAssunto() throws Exception {
		//given
		Assunto assunto = new Assunto();
		assunto.setId(1L);
		Interessado interessado = new Interessado();
		interessado.setId(1L);
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		ProcessoDTOOutput outroProcessoDto = new ProcessoDTOOutput(2L, 2L, "SOFT", "2021", "SOFT 2/2021", "outra descricao", assunto, interessado);
		given(processoService.findAll(null, 1L, 1L)).willReturn(List.of(processo, processo));
		
		//when
		when(processoMapper.toDto(List.of(processo, processo))).thenReturn(List.of(processoDto, outroProcessoDto));
		
		MultiValueMap<String, String> valores = new LinkedMultiValueMap<>();
		
		valores.add("cd_interessado_id", "1");
		valores.add("cd_assunto_id", "1");
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos")
				.contentType(APPLICATION_JSON)
				.queryParams(valores);

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.[0]id").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[0]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[0]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[0]nuAno").value("2021"))
			.andExpect(jsonPath("$.[0]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[0]chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.[0]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[0]descricao").value("descricao"))
			.andExpect(jsonPath("$.[0]cdInteressado.id").value("1"))
			.andExpect(jsonPath("$.[0]cdAssunto.id").value("1"))
			.andExpect(jsonPath("$.[1]id").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.[1]sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.[1]nuAno").isNotEmpty())
			.andExpect(jsonPath("$.[1]nuAno").value("2021"))
			.andExpect(jsonPath("$.[1]chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.[1]chaveProcesso").value("SOFT 2/2021"))
			.andExpect(jsonPath("$.[1]descricao").isNotEmpty())
			.andExpect(jsonPath("$.[1]descricao").value("outra descricao"))
			.andExpect(jsonPath("$.[1]cdInteressado.id").value("1"))
			.andExpect(jsonPath("$.[1]cdAssunto.id").value("1"));
	}

	@Test
	void deveRetornarUmProcesso() throws Exception {
		//given
		Assunto assunto = new Assunto();
		Interessado interessado = new Interessado();
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		given(processoService.find(anyLong())).willReturn(processo);
		
		//when
		when(processoMapper.toDto(processo)).thenReturn(processoDto);
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos/1")
				.contentType(APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").isNotEmpty())
			.andExpect(jsonPath("$.nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.nuAno").isNotEmpty())
			.andExpect(jsonPath("$.nuAno").value("2021"))
			.andExpect(jsonPath("$.chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.descricao").isNotEmpty())
			.andExpect(jsonPath("$.descricao").value("descricao"));
	}
	
	@Test
	void deveRetornarStatus404QuandoProcessoNaoEncontrado() throws Exception {
		// given
		ProcessoNotFoundException exception = new ProcessoNotFoundException();
		given(processoService.find(anyLong())).willThrow(exception);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/v1/processos/1")
				.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.mensagem").value("Nenhum processo encontrado"))
			.andExpect(jsonPath("$.statusCode").value("404"))
		;
	}
	
	@Test
	void deveCriarUmProcesso() throws Exception {
		// given
		Assunto assunto = new Assunto();
		Interessado interessado = new Interessado();
		
		ProcessoDTOOutput processoDto = new ProcessoDTOOutput(1L, 1L, "SOFT", "2021", "SOFT 1/2021", "descricao", assunto, interessado);
		ProcessoDTOInput inputDTO = new ProcessoDTOInput("SOFT", "2021", "descricao", 1L, 1L);

		given(processoMapper.toProcesso(any(ProcessoDTOInput.class))).willReturn(processo);
		when(processoMapper.toDto(any(Processo.class))).thenReturn(processoDto);

		// when
		when(processoService.create(any(Processo.class))).thenReturn(processo);
		
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/processos")
				.contentType(APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").isNotEmpty())
			.andExpect(jsonPath("$.nuProcesso").isNotEmpty())
			.andExpect(jsonPath("$.sgOrgaoSetor").isNotEmpty())
			.andExpect(jsonPath("$.sgOrgaoSetor").value("SOFT"))
			.andExpect(jsonPath("$.nuAno").isNotEmpty())
			.andExpect(jsonPath("$.nuAno").value("2021"))
			.andExpect(jsonPath("$.chaveProcesso").isNotEmpty())
			.andExpect(jsonPath("$.chaveProcesso").value("SOFT 1/2021"))
			.andExpect(jsonPath("$.descricao").isNotEmpty())
			.andExpect(jsonPath("$.descricao").value("descricao"));
	}
	
	@Test
	void deveRetornarStatus400QuandoCamposNulos() throws Exception {
		// given
		ProcessoDTOInput inputDTO = new ProcessoDTOInput(null, null, null, null, null);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/v1/processos")
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
			.andExpect(jsonPath("$.campos[3].nome").isNotEmpty())
			.andExpect(jsonPath("$.campos[3].mensagem").value("não deve ser nulo"))
			.andExpect(jsonPath("$.campos[4].nome").isNotEmpty())
			.andExpect(jsonPath("$.campos[4].mensagem").value("não deve ser nulo"))
		;
	}
	
	@Test
	void deveAtualizarUmProcesso() throws Exception {
		// given
		ProcessoDTOInput inputDTO = new ProcessoDTOInput();
		
		given(processoMapper.toProcesso(any(ProcessoDTOInput.class))).willReturn(processo);

		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put("/v1/processos/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(inputDTO));

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}

	@Test
	void deveExcluirUmProcesso() throws Exception {
		
		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.delete("/v1/processos/1")
			.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNoContent())
		;
	}

}
