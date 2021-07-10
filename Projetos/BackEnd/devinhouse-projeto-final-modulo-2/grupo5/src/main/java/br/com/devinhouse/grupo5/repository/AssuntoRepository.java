package br.com.devinhouse.grupo5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devinhouse.grupo5.model.Assunto;

public interface AssuntoRepository extends JpaRepository<Assunto, Long> {
}
