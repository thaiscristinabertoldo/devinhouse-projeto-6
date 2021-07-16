package br.com.devinhouse.grupo04.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.devinhouse.grupo04.entity.Assunto;
import br.com.devinhouse.grupo04.repository.AssuntoRepository;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoNotFoundException;
import br.com.devinhouse.grupo04.util.AtualizaColunasUtil;

@Service
public class AssuntoService {

	@Autowired
	private AssuntoRepository repository;

	public List<Assunto> findAll() {

		return repository.findAll();
	}

	public Assunto find(Long id) {
		if (id == null) {
			return null;
		}
		Assunto assunto = recuperaAssunto(id);

		return assunto;
	}

	public Assunto create(Assunto assunto) {
		return repository.save(assunto);
	}

	public void update(Long id, Assunto assunto) {
		char flAtivo = Character.toLowerCase(assunto.getFlAtivo());

		if ((flAtivo != 's') && (flAtivo != 'n')) {
			throw new AssuntoFlAtivoInvalidException("O flAtivo deve ser 's' ou 'n'");
		}

		assunto.setFlAtivo(Character.toLowerCase(assunto.getFlAtivo()));

		Assunto novoAssunto = recuperaAssunto(id);

		BeanUtils.copyProperties(assunto, novoAssunto, AtualizaColunasUtil.getNullPropertyNames(assunto));

		repository.save(novoAssunto);

	}

	public void delete(Long id) {
		repository.deleteById(id);
	}

	private Assunto recuperaAssunto(Long id) {
		Optional<Assunto> result = repository.findById(id);

		Assunto assunto = result.orElseThrow(() -> new AssuntoNotFoundException());
		return assunto;
	}

}
