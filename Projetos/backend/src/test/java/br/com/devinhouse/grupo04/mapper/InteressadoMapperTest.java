package br.com.devinhouse.grupo04.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.devinhouse.grupo04.dto.InteressadoDTOInput;
import br.com.devinhouse.grupo04.dto.InteressadoDTOOutput;
import br.com.devinhouse.grupo04.entity.Interessado;

@SpringBootTest
class InteressadoMapperTest {

	@Autowired
	private InteressadoMapper interessadoMapper;

	@Test
	void deveMapearUmInteressadoDtoParaInteressado() {
		// given
		InteressadoDTOInput interessadoDto = new InteressadoDTOInput("Mauricio", "12834714002", "03/08/1988");

		// when
		Interessado interessado = interessadoMapper.toInteressado(interessadoDto);

		// then
		assertThat(interessado).isNotNull();
		assertThat(interessado.getNmInteressado()).isEqualTo(interessadoDto.getNmInteressado());
		assertThat(interessado.getNuIdentificacao()).isEqualTo(interessadoDto.getNuIdentificacao());
		assertThat(interessado.getDtNascimento()).isEqualTo(LocalDate.of(1988, 8, 3));
		assertThat(interessado.getFlAtivo()).isEqualTo(interessadoDto.getFlAtivo());
	}

	@Test
	void deveMapearUmInteressadoParaInteressadoDto() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714002", LocalDate.of(1988, 8, 3));
		interessado.setId(1L);
		// when
		InteressadoDTOOutput interessadoDto = interessadoMapper.toDto(interessado);

		// then
		assertThat(interessadoDto).isNotNull();
		assertThat(interessadoDto.getNmInteressado()).isEqualTo(interessado.getNmInteressado());
		assertThat(interessadoDto.getNuIdentificacao()).isEqualTo(interessado.getNuIdentificacao());
		assertThat(interessadoDto.getDtNascimento()).isEqualTo(interessado.getDtNascimento());
		assertThat(interessadoDto.getFlAtivo()).isEqualTo(interessado.getFlAtivo());
	}

	@Test
	void deveMapearUmaListaInteressadoDtoParaListaInteressado() {
		// given
		List<Interessado> interessados = new ArrayList<Interessado>();
		Interessado interessado = new Interessado("Mauricio", "12834714002", LocalDate.of(1988, 8, 3));
		interessado.setId(1L);
		
		interessados.add(interessado);
		// when
		List<InteressadoDTOOutput> interessadosDto = interessadoMapper.toDto(interessados);

		// then
		assertThat(interessadosDto).isNotNull();
		assertThat(interessadosDto).hasSize(1);
	}

}
