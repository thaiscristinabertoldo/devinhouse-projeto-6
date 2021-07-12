package br.com.devinhouse.grupo04.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.entity.Processo;

@DataJpaTest
class ProcessoRepositoryTest {

	@Autowired
	private ProcessoRepository repositoryTestProcesso;

	@Autowired
	private InteressadoRepository repositoryTestInteressado;

	@Autowired
	private AssuntoRepository repositoryTestAssunto;

	@AfterEach
	private void deleteAll() {
		repositoryTestProcesso.deleteAll();
		repositoryTestInteressado.deleteAll();
		repositoryTestAssunto.deleteAll();
	}

	@Test
	void deveRetornarTodosOsProcessosPorChaveProcesso() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));
		Interessado novoInteressado = repositoryTestInteressado.save(interessado);

		Assunto assunto = new Assunto("construção civil");
		Assunto novoAssunto = repositoryTestAssunto.save(assunto);

		Processo processo = new Processo("soft", "2021", "implementar", novoAssunto, novoInteressado);
		Processo novoProcesso = repositoryTestProcesso.save(processo);

		// when
		List<Processo> processos = repositoryTestProcesso.findAllByChaveProcesso(novoProcesso.getChaveProcesso());

		// then
		assertThat(processos).asList().size().isEqualTo(1);
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdInteressadoECdAssunto() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));
		Interessado novoInteressado = repositoryTestInteressado.save(interessado);

		Assunto assunto = new Assunto("construção civil");
		Assunto novoAssunto = repositoryTestAssunto.save(assunto);

		Processo processo = new Processo("soft", "2021", "implementar", novoAssunto, novoInteressado);
		repositoryTestProcesso.save(processo);

		// when
		List<Processo> processos = repositoryTestProcesso.findAllByCdInteressadoIdAndCdAssuntoId(novoInteressado.getId(), novoAssunto.getId());

		// then
		assertThat(processos).asList().size().isEqualTo(1);
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdAssunto() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));
		Interessado novoInteressado = repositoryTestInteressado.save(interessado);

		Assunto assunto = new Assunto("construção civil");
		Assunto novoAssunto = repositoryTestAssunto.save(assunto);

		Processo processo = new Processo("soft", "2021", "implementar", novoAssunto, novoInteressado);
		repositoryTestProcesso.save(processo);

		// when
		List<Processo> processos = repositoryTestProcesso.findAllByCdAssuntoId(novoAssunto.getId());

		// then
		assertThat(processos).asList().size().isEqualTo(1);
	}

	@Test
	void deveRetornarTodosOsProcessosPorCdInteressado() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));
		Interessado novoInteressado = repositoryTestInteressado.save(interessado);

		Assunto assunto = new Assunto("construção civil");
		Assunto novoAssunto = repositoryTestAssunto.save(assunto);

		Processo processo = new Processo("soft", "2021", "implementar", novoAssunto, novoInteressado);
		repositoryTestProcesso.save(processo);

		// when
		List<Processo> processos = repositoryTestProcesso.findAllByCdInteressadoId(novoInteressado.getId());

		// then
		assertThat(processos).asList().size().isEqualTo(1);
	}

}
