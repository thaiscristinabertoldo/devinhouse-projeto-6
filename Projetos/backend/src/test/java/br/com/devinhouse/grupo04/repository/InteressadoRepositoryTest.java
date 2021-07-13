package br.com.devinhouse.grupo04.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import br.com.devinhouse.grupo04.entity.Interessado;

@DataJpaTest
class InteressadoRepositoryTest {

	@Autowired
	private InteressadoRepository repositoryTest;
	
	@AfterEach
	private void deleteAll() {
		repositoryTest.deleteAll();
	}

	@Test
	void deveRetornarListaInteressadoPorCpf() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));

		repositoryTest.save(interessado);

		// when
		List<Interessado> interessados = repositoryTest.findAllByNuIdentificacao("18272985020");

		// then
		assertThat(interessados).asList().size().isEqualTo(1);
	}

	@Test
	void deveRetornarInteressadoPorCpf() {
		// given
		Interessado interessado = new Interessado("Emanuelle", "18272985020", LocalDate.of(1992, 2, 1));

		repositoryTest.save(interessado);

		// when
		Interessado result = repositoryTest.findByNuIdentificacao("18272985020").get();

		// then
		assertThat(result).isEqualTo(interessado);
	}

}
