package br.com.devinhouse.grupo04.service;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
	
	private static final Logger logger = LogManager.getLogger(ProcessoService.class);

	@Autowired
	private ProcessoRepository repository;

	public List<Processo> findAll(String chaveProcesso, Long nuProcesso, String cdAssuntoDescricao) {

		if (chaveProcesso != null && !chaveProcesso.isBlank()) {
			return repository.findAllByChaveProcessoContainingIgnoreCase(chaveProcesso);
		}

		if (nuProcesso != null) {
			return repository.findAllByNuProcesso(nuProcesso);
		}

		if (cdAssuntoDescricao != null && !cdAssuntoDescricao.isBlank()) {
			return repository.findAllByCdAssuntoDescricaoContainingIgnoreCase(cdAssuntoDescricao);
		}

		return repository.findAll();

	}

	public Processo find(Long id) {
		Optional<Processo> result = repository.findById(id);
		
		if (!result.isPresent()) {
			logger.error("ProcessoService find: Processo não encontrado");
		}

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
		repository.deleteById(id);
	}

	private void verificaFlAtivoInteressadoAssunto(Processo processo) {
		char assuntoFlAtivo = Character.toLowerCase(processo.getCdAssunto().getFlAtivo());
		char interessadoFlAtivo = Character.toLowerCase(processo.getCdInteressado().getFlAtivo());
		
		if (assuntoFlAtivo != 's') {
			logger.error("ProcessoService create/update: O Assunto deve estar ativo");
			
			throw new AssuntoFlAtivoInvalidException("O Assunto deve estar ativo");
		}
		
		if (interessadoFlAtivo != 's') {
			logger.error("ProcessoService create/update: O Interessado deve estar ativo");
			
			throw new InteressadoFlAtivoInvalidException("O Interessado deve estar ativo");
		}
	}
	
}