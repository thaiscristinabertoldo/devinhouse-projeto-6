package br.com.devinhouse.grupo04.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class ControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@Test
	void deveRetornarStatus404QuandoEndpointNaoEncontrado() throws Exception {
		
		// when
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.delete("/v1/rotainexistente")
			.contentType(MediaType.APPLICATION_JSON);

		// then
		mvc.perform(request)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.mensagem").value("Endpoint não cadastrado"))
			.andExpect(jsonPath("$.statusCode").value("404"))
		;
	}

}
