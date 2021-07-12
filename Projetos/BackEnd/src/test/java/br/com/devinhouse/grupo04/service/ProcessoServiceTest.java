package br.com.devinhouse.grupo04.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.entity.Processo;
import br.com.devinhouse.grupo04.repository.ProcessoRepository;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.ProcessoNotFoundException;

@ExtendWith(MockitoExtension.class)
class ProcessoServiceTest {

	@Mock
	private ProcessoRepository processoRepository;

	@InjectMocks
	private ProcessoService processoService;

	@Mock
	private Assunto assunto;

	@Mock
	private Interessado interessado;

	@Test
	void deveRetornarTodosOsProcessos() {
		// when
		processoService.findAll(null, null, null);
		// then
		verify(processoRepository).findAll();
	}

	@Test
	void deveRetornarTodosOsProcessosPorChaveProcesso() {
		// when
		processoService.findAll("SOFT 1/2021", null, null);
		// then
		verify(processoRepository).findAllByChaveProcesso("SOFT 1/2021");
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdInteressado() {
		// when
		processoService.findAll(null, 1L, null);
		// then
		verify(processoRepository).findAllByCdInteressadoId(1L);
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdAssunto() {
		// when
		processoService.findAll(null, null, 1L);
		// then
		verify(processoRepository).findAllByCdAssuntoId(1L);
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdInteressadoECdAssunto() {
		// when
		processoService.findAll(null, 1L, 1L);
		// then
		verify(processoRepository).findAllByCdInteressadoIdAndCdAssuntoId(1L, 1L);
	}

	@Test
	void deveRetornarProcessoBaseadoNoId() {
		// given
		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);
		processo.setId(1L);

		// when
		when(processoRepository.findById(1L)).thenReturn(Optional.of(processo));
		Processo novoProcesso = processoService.find(1L);

		// then
		assertThat(novoProcesso.getId()).isEqualTo(processo.getId());
	}

	@Test
	void deveRetornarExceptionCasoNenhumProcessoEncontrado() {
		assertThatThrownBy(() -> processoService.find(1L)).isInstanceOf(ProcessoNotFoundException.class);
	}

	@Test
	void deveCriarUmProcesso() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714003", LocalDate.of(1988, 8, 3));
		Assunto assunto = new Assunto("descricao");

		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);
		processo.setId(1L);

		// when
		processoService.create(processo);
		ArgumentCaptor<Processo> processoArgumentoCapturado = ArgumentCaptor.forClass(Processo.class);

		// then
		verify(processoRepository).save(processoArgumentoCapturado.capture());

		Processo processoCapturado = processoArgumentoCapturado.getValue();

		assertThat(processoCapturado).isEqualTo(processo);
	}

	@Test
	void deveRetornarExceptionQuandoAssuntoInativoNaCriacaoDoProcesso() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714003", LocalDate.of(1988, 8, 3));

		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);

		// then
		assertThatThrownBy(() -> processoService.create(processo)).isInstanceOf(AssuntoFlAtivoInvalidException.class);
	}

	@Test
	void deveRetornarExceptionQuandoInteressadoInativoNaCriacaoDoProcesso() {
		// given
		Assunto assunto = new Assunto("descricao");
		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);

		// then
		assertThatThrownBy(() -> processoService.create(processo)).isInstanceOf(InteressadoFlAtivoInvalidException.class);
	}

	@Test
	void deveAtualizarUmProcesso() {
		// given
		Interessado interessado = new Interessado("Mauricio", "12834714003", LocalDate.of(1988, 8, 3));
		interessado.setId(2l);
		Assunto assunto = new Assunto("descricao");
		assunto.setId(2l);

		Processo processo = new Processo("SOFT", "2021", "descricao", assunto, interessado);
		processo.setId(1L);

		when(processoRepository.findById(1L)).thenReturn(Optional.of(processo));

		// when
		Processo novoProcesso = new Processo("SOFT", "2021", "descricao alterada", assunto, interessado);
		processoService.update(1L, novoProcesso);

		ArgumentCaptor<Processo> processoArgumentoCapturado = ArgumentCaptor.forClass(Processo.class);

		// then
		verify(processoRepository).save(processoArgumentoCapturado.capture());

		Processo processoCapturado = processoArgumentoCapturado.getValue();

		assertThat(processoCapturado).isNotNull();
		assertThat(processoCapturado.getSgOrgaoSetor()).isEqualTo(novoProcesso.getSgOrgaoSetor());
		assertThat(processoCapturado.getNuAno()).isEqualTo(novoProcesso.getNuAno());
		assertThat(processoCapturado.getDescricao()).isEqualTo(novoProcesso.getDescricao());
		assertThat(processoCapturado.getCdAssunto().getId()).isEqualTo(assunto.getId());
		assertThat(processoCapturado.getCdInteressado().getId()).isEqualTo(interessado.getId());
	}

	@Test
	void deveExcluirUmProcessoPorId() {
		// when
		processoService.delete(1L);
		// then
		verify(processoRepository).deleteById(1L);
	}

}
