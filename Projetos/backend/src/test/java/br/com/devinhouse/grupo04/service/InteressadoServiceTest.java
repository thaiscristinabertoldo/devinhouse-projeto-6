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

import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.repository.InteressadoRepository;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoNotFoundException;
import br.com.devinhouse.grupo04.service.exceptions.NuIdentificacaoJaExistenteException;

@ExtendWith(MockitoExtension.class)
class InteressadoServiceTest {

	@Mock
	private InteressadoRepository interessadoRepository;

	@InjectMocks
	private InteressadoService interessadoService;

	@Test
	void deveCriarUmInteressado() {
		// given
		Interessado interessado = new Interessado("Joao Silva", "21597054038", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);

		// when
		interessadoService.create(interessado);
		ArgumentCaptor<Interessado> interessadoArgumentoCapturado = ArgumentCaptor.forClass(Interessado.class);

		// then
		verify(interessadoRepository).save(interessadoArgumentoCapturado.capture());

		Interessado interessadoCapturado = interessadoArgumentoCapturado.getValue();

		assertThat(interessadoCapturado).isEqualTo(interessado);
	}

	@Test
	void deveRetornarNullnoIdNull() {

		// when
		Interessado serviceInteressado = interessadoService.find(null);

		// then
		assertThat(serviceInteressado).isEqualTo(null);

	}

	@Test
	void deveRetornarListaInteressadoPorCpf() {
		// when
		interessadoService.findAll("30733668062");
		// then
		verify(interessadoRepository).findAllByNuIdentificacao("30733668062");
	}

	@Test
	void deveRetornarTodosOsInteressados() {
		// when
		interessadoService.findAll(null);
		// then
		verify(interessadoRepository).findAll();
	}

	@Test
	void deveRetornarInteressadoBaseadoNoId() {
		// given
		Interessado interessado = new Interessado("Joao Silva", "06893346050", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);

		// when
		when(interessadoRepository.findById(1L)).thenReturn(Optional.of(interessado));
		Interessado serviceInteressado = interessadoService.find(1L);

		// then
		assertThat(serviceInteressado.getId()).isEqualTo(interessado.getId());
	}

	@Test
	void deveRetornarExceptionCasoNenhumInteressadoEncontrado() {
		assertThatThrownBy(() -> interessadoService.find(1L)).isInstanceOf(InteressadoNotFoundException.class);
	}

	@Test
	void deveRetornarExceptionCasoNuIdentificacaoJaExistente() {
		// given
		Interessado interessado = new Interessado("Joao Silva", "26923170095", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);
		Interessado interessadoCpfIgual = new Interessado("Joao Silva", "26923170095", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);
		// when
		when(interessadoRepository.findByNuIdentificacao("26923170095")).thenReturn(Optional.of(interessado));

		// then
		assertThatThrownBy(() -> interessadoService.create(interessadoCpfIgual))
				.isInstanceOf(NuIdentificacaoJaExistenteException.class);
	}

	@Test
	void deveRetornarExceptionCasoFlAtivoSejaDiferenteDeSOuN() {
		Interessado interessado = new Interessado("Joao Silva", "06893346050", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);
		interessado.setFlAtivo('V');

		assertThatThrownBy(() -> interessadoService.update(1L, interessado))
				.isInstanceOf(InteressadoFlAtivoInvalidException.class);
	}

	@Test
	void deveAtualizarUmInteressado() {
		// given
		Interessado interessado = new Interessado("Joao Silva", "93116828024", LocalDate.of(1986, 2, 1));
		interessado.setId(1L);
		when(interessadoRepository.findById(1L)).thenReturn(Optional.of(interessado));

		// when
		Interessado novoInteressado = new Interessado("joao teste update", "93116828024", LocalDate.of(1920, 2, 1));
		interessadoService.update(1L, novoInteressado);

		ArgumentCaptor<Interessado> interessadoArgumentoCapturado = ArgumentCaptor.forClass(Interessado.class);
		// then

		verify(interessadoRepository).save(interessadoArgumentoCapturado.capture());

		Interessado interessadoCapturado = interessadoArgumentoCapturado.getValue();

		assertThat(interessadoCapturado).isNotNull();
		assertThat(interessadoCapturado.getNmInteressado()).isEqualTo(novoInteressado.getNmInteressado());
		assertThat(interessadoCapturado.getNuIdentificacao()).isEqualTo(novoInteressado.getNuIdentificacao());
		assertThat(interessadoCapturado.getDtNascimento()).isEqualTo(LocalDate.of(1920, 2, 1));
		assertThat(interessadoCapturado.getFlAtivo()).isEqualTo(novoInteressado.getFlAtivo());
	}

	@Test
	void deveExcluirUmInteressadoPorId() {
		// when
		interessadoService.delete(1L);
		// then
		verify(interessadoRepository).deleteById(1L);
	}

}
