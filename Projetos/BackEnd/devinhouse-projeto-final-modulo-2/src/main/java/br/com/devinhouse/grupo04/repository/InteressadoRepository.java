package br.com.devinhouse.grupo04.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.devinhouse.grupo04.entity.Interessado;

@Repository
public interface InteressadoRepository extends JpaRepository<Interessado, Long> {
	List<Interessado> findAllByNuIdentificacao(String nuIdentificacao);
	
	Optional<Interessado> findByNuIdentificacao(String nuIdentificacao);

}
