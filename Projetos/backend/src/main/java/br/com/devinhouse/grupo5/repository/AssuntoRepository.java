package br.com.devinhouse.grupo5.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devinhouse.grupo5.model.Assunto;

public interface AssuntoRepository extends JpaRepository<Assunto, Long> {
    Optional<Assunto> findByDescricao(String descrisao);
}
