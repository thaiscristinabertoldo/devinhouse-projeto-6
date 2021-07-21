package br.com.devinhouse.grupo04.service;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.repository.InteressadoRepository;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoNotFoundException;
import br.com.devinhouse.grupo04.service.exceptions.NuIdentificacaoJaExistenteException;
import br.com.devinhouse.grupo04.util.AtualizaColunasUtil;

@Service
public class InteressadoService {

	@Autowired
	private InteressadoRepository repository;
	
	private Logger log = LogManager.getLogger(InteressadoService.class);

	public Interessado create(Interessado interessado) {

		interessado.setNuIdentificacao(interessado.getNuIdentificacao().replaceAll("([^\\d])", ""));

		Optional<Interessado> result = repository.findByNuIdentificacao(interessado.getNuIdentificacao());
		
		if (result.isPresent()) {
			throw new NuIdentificacaoJaExistenteException("CPF informado já cadastrado");
		}
		
		interessado = repository.save(interessado);
		log.info("Interessado " + interessado.getId() + " criado com sucesso.");
		
		return interessado;
	}

	public List<Interessado> findAll(String nuIdentificacao) {
		if (nuIdentificacao != null) {
			return repository.findAllByNuIdentificacao(nuIdentificacao);
		}
		return repository.findAll();
	}

	public Interessado find(Long id) {

		if (id == null) {
			return null;
		}

		return recuperaInteressado(id);

	}

	public void update(Long id, Interessado interessado) {
		char flAtivo = Character.toLowerCase(interessado.getFlAtivo());

		if ((flAtivo != 's') && (flAtivo != 'n')) {
			throw new InteressadoFlAtivoInvalidException("O flAtivo deve ser 's' ou 'n'");
		}

		interessado.setFlAtivo(Character.toLowerCase(interessado.getFlAtivo()));

		Interessado novoInteressado = recuperaInteressado(id);

		BeanUtils.copyProperties(interessado, novoInteressado, AtualizaColunasUtil.getNullPropertyNames(interessado));

		repository.save(novoInteressado);
		log.info("Interessado " + interessado.getId() + " alterado com sucesso.");

	}

	public void delete(Long id) {
		repository.deleteById(id);
		log.info("Interessado " + id + " deletado com sucesso.");

	}

	private Interessado recuperaInteressado(Long id) {

		Optional<Interessado> result = repository.findById(id);

		Interessado novoInteressado = result.orElseThrow(() -> new InteressadoNotFoundException());
		return novoInteressado;
	}
}
