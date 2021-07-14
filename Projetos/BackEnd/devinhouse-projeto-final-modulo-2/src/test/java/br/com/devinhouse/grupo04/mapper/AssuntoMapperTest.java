package br.com.devinhouse.grupo04.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.devinhouse.grupo04.dto.AssuntoDTOInput;
import br.com.devinhouse.grupo04.dto.AssuntoDTOOutput;
import br.com.devinhouse.grupo04.entity.Assunto;

@SpringBootTest
class AssuntoMapperTest {

	@Autowired
	private AssuntoMapper assuntoMapper;

	@Test
	void deveMapearUmAssuntoDtoParaAssunto() {
		// given
		AssuntoDTOInput assuntoDto = new AssuntoDTOInput("descricao DTO");

		// when
		Assunto assunto = assuntoMapper.toAssunto(assuntoDto);

		// then
		assertThat(assunto).isNotNull();
		assertThat(assunto.getDescricao()).isEqualTo(assuntoDto.getDescricao());
		assertThat(assunto.getFlAtivo()).isEqualTo(assuntoDto.getFlAtivo());
	}

	@Test
	void deveMapearUmAssuntoParaAssuntoDto() {
		// given
		Assunto assunto = new Assunto("descricao");
		assunto.setId(1L);
		// when
		AssuntoDTOOutput assuntoDto = assuntoMapper.toDto(assunto);

		// then
		assertThat(assuntoDto).isNotNull();
		assertThat(assuntoDto.getDescricao()).isEqualTo(assunto.getDescricao());
		assertThat(assuntoDto.getId()).isEqualTo(assunto.getId());
		assertThat(assuntoDto.getDtCadastro()).isEqualTo(assunto.getDtCadastro());
		assertThat(assuntoDto.getFlAtivo()).isEqualTo(assunto.getFlAtivo());
	}

	@Test
	void deveMapearUmaListaAssuntoDtoParaListaAssunto() {
		// given
		List<Assunto> assuntos = new ArrayList<Assunto>();
		Assunto assunto = new Assunto("descricao");
		assunto.setId(1L);
		
		assuntos.add(assunto);
		// when
		List<AssuntoDTOOutput> assuntosDto = assuntoMapper.toDto(assuntos);

		// then
		assertThat(assuntosDto).isNotNull();
		assertThat(assuntosDto).hasSize(1);
	}

}
