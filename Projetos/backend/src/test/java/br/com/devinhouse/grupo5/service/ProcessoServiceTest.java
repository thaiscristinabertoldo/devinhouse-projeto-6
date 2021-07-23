package br.com.devinhouse.grupo5.service;

import br.com.devinhouse.grupo5.domain.exceptions.*;
import br.com.devinhouse.grupo5.dto.*;
import br.com.devinhouse.grupo5.model.Assunto;
import br.com.devinhouse.grupo5.model.Interessado;
import br.com.devinhouse.grupo5.model.Processo;
import br.com.devinhouse.grupo5.repository.ProcessoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProcessoServiceTest {

	@Mock
	ProcessoRepository processoRepository;

	@InjectMocks
	ProcessoService processoService;

	@Mock
	ModelMapper modelMapper;

	@Mock
	InteressadoService interessadoService;

	@Mock
	AssuntoService assuntoService;

	@Test
	void salvarProcessoComInformacoesValidas() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(false);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(interessadoOutputDTO);
		when(modelMapper.map(interessadoOutputDTO, Interessado.class)).thenReturn(interessado);
		when(assuntoService.buscarAssuntoPorId(any())).thenReturn(assuntoOutputDTO);
		when(modelMapper.map(assuntoOutputDTO, Assunto.class)).thenReturn(assunto);

		processoService.salvarProcesso(processoInputDTO);

		verify(processoRepository, times(1)).save(processo);
	}

	@Test
	void deveRetornarErroDeChaveProcessoJaExistente() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(true);

		Throwable error = catchThrowable(() ->
				processoService.salvarProcesso(processoInputDTO)
		);
		assertThat(error).isInstanceOf(NuProcessoJaCadastradoException.class);
	}

	@Test
	void deveRetornarErroDeInativoExceptionInteressado() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO(
				1L,
				"Fulano",
				"95132259090",
				LocalDate.parse("2010-10-20"),
				false
		);
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(false);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(interessadoOutputDTO);

		Throwable error = catchThrowable(() ->
				processoService.salvarProcesso(processoInputDTO)
		);
		assertThat(error).isInstanceOf(InteressadoInativoException.class);
	}

	@Test
	void deveRetornarErroDeInteressadoNaoEncontradoException() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(false);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(null);

		Throwable error = catchThrowable(() ->
				processoService.salvarProcesso(processoInputDTO)
		);
		assertThat(error).isInstanceOf(InteressadoNaoEncontradoException.class);
	}

	@Test
	void deveRetornarErroDeInativoExceptionAssunto() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO(
				1L,
				"Teste Unitário",
				LocalDate.parse("2010-10-20"),
				false
		);

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(false);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(interessadoOutputDTO);
		when(modelMapper.map(interessadoOutputDTO, Interessado.class)).thenReturn(interessado);
		when(assuntoService.buscarAssuntoPorId(any())).thenReturn(assuntoOutputDTO);

		Throwable error = catchThrowable(() ->
				processoService.salvarProcesso(processoInputDTO)
		);
		assertThat(error).isInstanceOf(AssuntoInativoException.class);
	}

	@Test
	void deveRetornarErroDeAssuntoNaoEncontradoException() {

		Processo processo = new Processo();
		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO();

		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(processoRepository.existsByChaveProcesso(any())).thenReturn(false);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(interessadoOutputDTO);
		when(modelMapper.map(interessadoOutputDTO, Interessado.class)).thenReturn(interessado);
		when(assuntoService.buscarAssuntoPorId(any())).thenReturn(null);

		Throwable error = catchThrowable(() ->
				processoService.salvarProcesso(processoInputDTO)
		);
		assertThat(error).isInstanceOf(AssuntoNaoEncontradoException.class);
	}

	@Test
	void buscarTodosProcessos() {
		ArrayList<Processo> processos = new ArrayList<>();

		when(processoRepository.findAll()).thenReturn(processos);

		processoService.buscarTodosProcessos();

		verify(processoRepository, times(1)).findAll();
	}

	@Test
	void buscarUmProcesso() {
		Processo processo = new Processo();

		when(processoRepository.findById(1L)).thenReturn(Optional.of(processo));

		processoService.buscarUmProcesso(1L);

		verify(processoRepository, times(1)).findById(1L);
	}

	@Test
	void buscarUmProcessoNaoEncontrado() {
		Throwable erro = catchThrowable(() -> processoService.buscarUmProcesso(1L));

		assertThat(erro).isInstanceOf(ProcessoNaoEncontradoException.class);
	}

	@Test
	void buscarUmProcessoPorChave() {
		Processo processo = new Processo();

		when(processoRepository.findByChaveProcesso("SOFT 1/2021")).thenReturn(Optional.of(processo));

		processoService.buscarUmProcessoPorChave("SOFT 1/2021");

		verify(processoRepository, times(1)).findByChaveProcesso("SOFT 1/2021");
	}

	@Test
	void buscarUmProcessoPorChaveNaoEncontrado() {
		Throwable erro = catchThrowable(() -> processoService.buscarUmProcessoPorChave("SOFT 1/2020"));

		assertThat(erro).isInstanceOf(ProcessoNaoEncontradoException.class);
	}

	@Test
	void buscarUmProcessoPorCdInteressado() {
		ArrayList<Processo> processos = new ArrayList<>();
		Processo processo = new Processo();
		processos.add(processo);
		Interessado interessado = new Interessado(1L, "Fulano de Tal", "65701715000", LocalDate.parse("2021-05-26"), true);

		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();

		when(interessadoService.buscarInteressadoPeloId(interessado.getId())).thenReturn(interessadoOutputDTO);
		when(modelMapper.map(interessadoService.buscarInteressadoPeloId(interessado.getId()), Interessado.class))
				.thenReturn(interessado);
		when(processoRepository.findByCdInteressado(interessado)).thenReturn(processos);

		processoService.buscarUmProcessoPorCdInteressado(1L);

		verify(processoRepository, times(1)).findByCdInteressado(interessado);
	}

	@Test
	void buscarUmProcessoPorCdAssunto() {
		ArrayList<Processo> processos = new ArrayList<>();
		Assunto assunto = new Assunto(1L, "Descrição Assunto", LocalDate.parse("2021-05-26"), true);
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		Processo processo = new Processo();

		when(assuntoService.buscarAssuntoPorId(assunto.getId())).thenReturn(assuntoOutputDTO);
		when(modelMapper.map(assuntoService.buscarAssuntoPorId(assunto.getId()), Assunto.class)).thenReturn(assunto);
		when(processoRepository.findByCdAssunto(assunto)).thenReturn(processos);

		processoService.buscarUmProcessoPorCdAssunto(1L);

		verify(processoRepository, times(1)).findByCdAssunto(assunto);
	}

	@Test
	void atualizarProcesso() {

		AssuntoInputDTO assuntoInputDTO = new AssuntoInputDTO();
		Assunto assunto = new Assunto();
		AssuntoOutputDTO assuntoOutputDTO = new AssuntoOutputDTO();

		InteressadoInputDTO interessadoInputDTO = new InteressadoInputDTO();
		Interessado interessado = new Interessado();
		InteressadoOutputDTO interessadoOutputDTO = new InteressadoOutputDTO();

		ProcessoInputDTO processoInputDTO = new ProcessoInputDTO(
				"SOFT",
				"2020",
				"Teste",
				1L,
				1L
		);
		Processo processo = new Processo(
				processoInputDTO.getSgOrgaoSetor(),
				processoInputDTO.getNuAno(),
				processoInputDTO.getDescricao(),
				assunto,
				interessado
		);

		ProcessoOutputDTO processoOutputDTO = new ProcessoOutputDTO();

		when(processoRepository.findById(any())).thenReturn(Optional.of(processo));
		when(modelMapper.map(processoInputDTO, Processo.class)).thenReturn(processo);
		when(interessadoService.buscarInteressadoPeloId(any())).thenReturn(interessadoOutputDTO);
		when(modelMapper.map(interessadoOutputDTO, Interessado.class)).thenReturn(interessado);
		when(assuntoService.buscarAssuntoPorId(any())).thenReturn(assuntoOutputDTO);
		when(modelMapper.map(assuntoOutputDTO, Assunto.class)).thenReturn(assunto);

		processoService.atualizarProcesso(processoInputDTO, processo.getId());

		verify(processoRepository, times(1)).save(processo);
	}

	@Test
	void deletarProcesso() {

		Processo processo = new Processo();

		when(processoRepository.findById(any())).thenReturn(Optional.of(processo));

		processoService.deletarProcesso(1L);

		verify(processoRepository, times(1)).deleteById(1L);
	}
}