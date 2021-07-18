package br.com.devinhouse.grupo04.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.devinhouse.grupo04.entity.Processo;
import br.com.devinhouse.grupo04.repository.ProcessoRepository;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.ProcessoNotFoundException;
import br.com.devinhouse.grupo04.util.AtualizaColunasUtil;

@Service
public class ProcessoService {
	
	private static final Logger logger = LoggerFactory.getLogger(ProcessoService.class);

	@Autowired
	private ProcessoRepository repository;

	public List<Processo> findAll(String chaveProcesso, Long cdInteressadoId, Long cdAssuntoId) {

		if (chaveProcesso != null) {
			return repository.findAllByChaveProcesso(chaveProcesso);
		}

		if (cdInteressadoId != null && cdAssuntoId != null) {
			return repository.findAllByCdInteressadoIdAndCdAssuntoId(cdInteressadoId, cdAssuntoId);
		}

		if (cdInteressadoId != null) {
			return repository.findAllByCdInteressadoId(cdInteressadoId);
		}

		if (cdAssuntoId != null) {
			return repository.findAllByCdAssuntoId(cdAssuntoId);
		}

		return repository.findAll();

	}

	public Processo find(Long id) {
		Optional<Processo> result = repository.findById(id);

		return result.orElseThrow(() -> new ProcessoNotFoundException());
	}

	public Processo create(Processo processo) {
		verificaFlAtivoInteressadoAssunto(processo);

		return repository.save(processo);
	}


	public void update(Long id, Processo processo) {
		Processo novoProcesso = find(id);

		BeanUtils.copyProperties(processo, novoProcesso, AtualizaColunasUtil.getNullPropertyNames(processo));

		verificaFlAtivoInteressadoAssunto(novoProcesso);

		repository.save(novoProcesso);
	}

	public void delete(Long id) {
		
		logger.warn("Processo excluído");

		repository.deleteById(id);
	}

	private void verificaFlAtivoInteressadoAssunto(Processo processo) {
		char assuntoFlAtivo = Character.toLowerCase(processo.getCdAssunto().getFlAtivo());
		char interessadoFlAtivo = Character.toLowerCase(processo.getCdInteressado().getFlAtivo());
		
		if (assuntoFlAtivo != 's') {
			logger.warn("Tentativa de registro assunto inválida, assunto não está ativo");
			throw new AssuntoFlAtivoInvalidException("O Assunto deve estar ativo");
		}
		
		if (interessadoFlAtivo != 's') {
			logger.warn("Tentativa de registro interessado inválida, interessado não está ativo");
			throw new InteressadoFlAtivoInvalidException("O Interessado deve estar ativo");
		}
	}
	
}