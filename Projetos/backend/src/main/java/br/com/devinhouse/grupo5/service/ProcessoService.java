package br.com.devinhouse.grupo5.service;

import java.util.List;
import java.util.stream.Collectors;

import br.com.devinhouse.grupo5.domain.exceptions.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.devinhouse.grupo5.dto.AssuntoOutputDTO;
import br.com.devinhouse.grupo5.dto.InteressadoOutputDTO;
import br.com.devinhouse.grupo5.dto.ProcessoInputDTO;
import br.com.devinhouse.grupo5.dto.ProcessoOutputDTO;
import br.com.devinhouse.grupo5.model.Assunto;
import br.com.devinhouse.grupo5.model.Interessado;
import br.com.devinhouse.grupo5.model.Processo;
import br.com.devinhouse.grupo5.repository.ProcessoRepository;

import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;

@Service
public class ProcessoService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	InteressadoService interessadoService;

	@Autowired
	AssuntoService assuntoService;

	@Autowired
	ProcessoRepository processoRepository;

	public ProcessoOutputDTO salvarProcesso(ProcessoInputDTO processoInputDTO) {
		var processo = toProcesso(processoInputDTO);

		Boolean existNuProcesso = processoRepository.existsByNuProcesso(processo.getNuProcesso());
		if (TRUE.equals(existNuProcesso)) {
			throw new NuProcessoJaCadastradoException();
		}

		Boolean existChaveProcesso = processoRepository.existsByChaveProcesso(processo.getChaveProcesso());
		if (TRUE.equals(existChaveProcesso)) {
			throw new NuProcessoJaCadastradoException(processo.getChaveProcesso());
		}

		InteressadoOutputDTO interessadoOut = interessadoService.buscarInteressadoPeloId(processoInputDTO.getCdInteressado());
		if (interessadoOut != null) {
			if (FALSE.equals(interessadoOut.getFlAtivo())) {
				throw new InteressadoInativoException(interessadoOut.getId());
			}
			processo.setCdInteressado(modelMapper.map(interessadoOut, Interessado.class));
		} else {
			throw new InteressadoNaoEncontradoException();
		}

		AssuntoOutputDTO assuntoOut = assuntoService.buscarAssuntoPorId(processoInputDTO.getCdAssunto());
		if (assuntoOut != null) {
			if (FALSE.equals(assuntoOut.getFlAtivo())) {
				throw new AssuntoInativoException(assuntoOut.getId());
			}
			processo.setCdAssunto(modelMapper.map(assuntoOut, Assunto.class));
		} else {
			throw new AssuntoNaoEncontradoException();
		}
		return toDTO(processoRepository.save(processo));
	}

	public List<ProcessoOutputDTO> buscarTodosProcessos() {
		return toDTO(processoRepository.findAll());
	}

	public ProcessoOutputDTO buscarUmProcesso(Long id) {
		var processo = processoRepository.findById(id).orElseThrow(() -> new ProcessoNaoEncontradoException(id));
		return toDTO(processo);
	}

	public ProcessoOutputDTO buscarUmProcessoPorChave(String chaveProcesso) {
		var processo = processoRepository.findByChaveProcesso(chaveProcesso)
				.orElseThrow(() -> new ProcessoNaoEncontradoException(chaveProcesso));
		return toDTO(processo);
	}

	public List<ProcessoOutputDTO> buscarUmProcessoPorCdInteressado(Long cdInteressado) {
		var interessado = modelMapper.map(interessadoService.buscarInteressadoPeloId(cdInteressado), Interessado.class);
		List<Processo> processos = processoRepository.findByCdInteressado(interessado);

		return toDTO(processos);
	}

	public List<ProcessoOutputDTO> buscarUmProcessoPorCdAssunto(Long cdAssunto) {
		var assunto = modelMapper.map(assuntoService.buscarAssuntoPorId(cdAssunto), Assunto.class);
		List<Processo> processos = processoRepository.findByCdAssunto(assunto);

		return toDTO(processos);
	}

	public ProcessoOutputDTO buscarUmProcessoPorNumero(Long numeroProcesso) {
		var processo = processoRepository.findByNuProcesso(numeroProcesso)
				.orElseThrow(() -> new ProcessoNaoEncontradoException(numeroProcesso));
		return toDTO(processo);
	}


	public List<ProcessoOutputDTO> buscarUmProcessoPorCdAssuntoDescrisao(String cdAssunto) {
		var assunto = modelMapper.map(assuntoService.buscarAssuntoPorDescrisao(cdAssunto), Assunto.class);
		List<Processo> processos = processoRepository.findByCdAssunto(assunto);

		return toDTO(processos);
	}

	public void atualizarProcesso(ProcessoInputDTO processoInputDTO, Long id) {
		var processoIndicado = processoRepository.findById(id)
				.orElseThrow(() -> new ProcessoNaoEncontradoException(id));
		var processoAtualizado = toProcesso(processoInputDTO);

		if(!processoAtualizado.getNuProcesso().equals(processoIndicado.getNuProcesso())) {

			Boolean existNuProcesso = processoRepository.existsByNuProcesso(processoAtualizado.getNuProcesso());
			if (TRUE.equals(existNuProcesso)) {
				throw new NuProcessoJaCadastradoException();
			}
		}

		InteressadoOutputDTO interessadoOut = interessadoService.buscarInteressadoPeloId(processoInputDTO.getCdInteressado());
		if (interessadoOut != null) {
			processoAtualizado.setCdInteressado(modelMapper.map(interessadoOut, Interessado.class));
		} else {
			throw new InteressadoNaoEncontradoException();
		}

		AssuntoOutputDTO assuntoOut = assuntoService.buscarAssuntoPorId(processoInputDTO.getCdAssunto());
		if (assuntoOut != null) {
			processoAtualizado.setCdAssunto(modelMapper.map(assuntoOut, Assunto.class));
		} else {
			throw new AssuntoNaoEncontradoException();
		}
		BeanUtils.copyProperties(processoAtualizado, processoIndicado, "id");
		processoRepository.save(processoIndicado);
	}

	public ProcessoOutputDTO deletarProcesso(Long id) {
		var processo = processoRepository.findById(id).orElseThrow(() -> new ProcessoNaoEncontradoException(id));
		processoRepository.deleteById(id);
		return toDTO(processo);
	}

	private Processo toProcesso(ProcessoInputDTO processoInputDTO) {
		return modelMapper.map(processoInputDTO, Processo.class);
	}

	private ProcessoOutputDTO toDTO(Processo processo) {
		return modelMapper.map(processo, ProcessoOutputDTO.class);
	}

	private List<ProcessoOutputDTO> toDTO(List<Processo> processos) {
		return processos.stream().map(this::toDTO).collect(Collectors.toList());
	}

}
