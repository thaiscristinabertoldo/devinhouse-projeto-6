package br.com.devinhouse.grupo04.service;

import java.util.List;
import java.util.Optional;

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

	public Interessado create(Interessado interessado) {

		interessado.setNuIdentificacao(interessado.getNuIdentificacao().replaceAll("([^\\d])", ""));

		Optional<Interessado> result = repository.findByNuIdentificacao(interessado.getNuIdentificacao());
		
		if (result.isPresent()) {
			throw new NuIdentificacaoJaExistenteException("CPF informado já cadastrado");
		}

		return repository.save(interessado);
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

	}

	public void delete(Long id) {
		repository.deleteById(id);

	}

	private Interessado recuperaInteressado(Long id) {

		Optional<Interessado> result = repository.findById(id);

		Interessado novoInteressado = result.orElseThrow(() -> new InteressadoNotFoundException());
		return novoInteressado;
	}
}
