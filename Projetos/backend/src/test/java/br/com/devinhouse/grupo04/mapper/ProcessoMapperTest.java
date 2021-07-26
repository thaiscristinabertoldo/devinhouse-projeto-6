package br.com.devinhouse.grupo04.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.devinhouse.grupo04.dto.ProcessoDTOInput;
import br.com.devinhouse.grupo04.dto.ProcessoDTOOutput;
import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.entity.Processo;
import br.com.devinhouse.grupo04.service.AssuntoService;
import br.com.devinhouse.grupo04.service.InteressadoService;

@SpringBootTest
class ProcessoMapperTest {

	@Autowired
	private ProcessoMapper processoMapper;

	@Autowired
	private AssuntoService assuntoService;

	@Autowired
	private InteressadoService interessadoService;

	@Test
	void deveMapearUmProcessoDtoParaProcesso() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714002", LocalDate.of(1988, 8, 3));
		interessado.setId(1L);
		
		interessadoService.create(interessado);

		Assunto assunto = new Assunto("descricao");
		assunto.setId(1L);
		
		assuntoService.create(assunto);

		ProcessoDTOInput processoDto = new ProcessoDTOInput("SOFT", "2021", "descricao", 1L, 1L);

		// when
		Processo processo = processoMapper.toProcesso(processoDto);

		// then
		assertThat(processo).isNotNull();
		assertThat(processo.getSgOrgaoSetor()).isEqualTo(processoDto.getSgOrgaoSetor());
		assertThat(processo.getNuAno()).isEqualTo(processoDto.getNuAno());
		assertThat(processo.getDescricao()).isEqualTo(processoDto.getDescricao());
		assertThat(processo.getCdAssunto().getId()).isEqualTo(assunto.getId());
		assertThat(processo.getCdInteressado().getId()).isEqualTo(interessado.getId());
	}

	@Test
	void deveMapearUmProcessoParaProcessoDto() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714003", LocalDate.of(1988, 8, 3));
		interessado.setId(1L);
		Assunto assunto = new Assunto("descricao");
		assunto.setId(1L);
		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);

		// when
		ProcessoDTOOutput processoDto = processoMapper.toDto(processo);

		// then
		assertThat(processoDto).isNotNull();
		assertThat(processoDto.getSgOrgaoSetor()).isEqualTo(processo.getSgOrgaoSetor());
		assertThat(processoDto.getNuAno()).isEqualTo(processo.getNuAno());
		assertThat(processoDto.getDescricao()).isEqualTo(processo.getDescricao());
		assertThat(processoDto.getCdAssunto().getId()).isEqualTo(processo.getCdAssunto().getId());
		assertThat(processoDto.getCdInteressado().getId()).isEqualTo(processo.getCdInteressado().getId());
	}

	@Test
	void ddeveMapearUmaListaProcessoDtoParaListaProcesso() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714004", LocalDate.of(1988, 8, 3));
		interessado.setId(1L);
		Assunto assunto = new Assunto("descricao");
		assunto.setId(1L);
		
		List<Processo> processos = new ArrayList<Processo>();
		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);
		processos.add(processo);

		// when
		List<ProcessoDTOOutput> processosDto = processoMapper.toDto(processos);

		// then
		assertThat(processosDto).isNotNull();
		assertThat(processosDto).hasSize(1);
	}

}
