package br.com.devinhouse.grupo5.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devinhouse.grupo5.model.Assunto;
import br.com.devinhouse.grupo5.model.Interessado;
import br.com.devinhouse.grupo5.model.Processo;

public interface ProcessoRepository extends JpaRepository<Processo, Long> {
	Optional<Processo> findByChaveProcesso(String chaveProcesso);

	List<Processo> findByCdAssunto(Assunto cdAssunto);

	List<Processo> findByCdInteressado(Interessado cdInteressado);
	
	Boolean existsByChaveProcesso(String chaveProcesso);
}
