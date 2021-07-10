package br.com.devinhouse.grupo5.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devinhouse.grupo5.model.Interessado;

public interface InteressadoRepository extends JpaRepository<Interessado, Long> {
	Optional<Interessado> findByNuIdentificacao(String nuIdentificacao);

	Boolean existsByNuIdentificacao(String nuIdentificacao);
}
