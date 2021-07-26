package br.com.devinhouse.grupo5.service;

import java.util.List;
import java.util.stream.Collectors;

import br.com.devinhouse.grupo5.domain.exceptions.AssuntoNaoEncontradoException;
import br.com.devinhouse.grupo5.dto.AssuntoInputDTO;
import br.com.devinhouse.grupo5.dto.AssuntoOutputDTO;
import br.com.devinhouse.grupo5.model.Assunto;
import br.com.devinhouse.grupo5.repository.AssuntoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssuntoService {

    @Autowired
    AssuntoRepository assuntoRepository;

    @Autowired
    ModelMapper modelMapper;

    public AssuntoOutputDTO cadastrarAssunto(AssuntoInputDTO novoAssunto) {
        return toDTO(assuntoRepository.save(toAssunto(novoAssunto)));
    }

    public AssuntoOutputDTO buscarAssuntoPorId(Long id) {
        return toDTO(assuntoRepository.findById(id).orElseThrow(AssuntoNaoEncontradoException::new));
    }

    public AssuntoOutputDTO buscarAssuntoPorDescrisao(String descrisao) {
        return toDTO(assuntoRepository.findByDescricao(descrisao).orElseThrow(AssuntoNaoEncontradoException::new));
    }

    public List<AssuntoOutputDTO> buscarTodosAssuntos() {
      return toDTO(assuntoRepository.findAll());
    }

    private AssuntoOutputDTO toDTO(Assunto assunto){
        return modelMapper.map(assunto, AssuntoOutputDTO.class);
    }

    private List<AssuntoOutputDTO> toDTO(List<Assunto> assuntos) {
      return assuntos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    private Assunto toAssunto(AssuntoInputDTO assuntoInputDTO){
        return modelMapper.map(assuntoInputDTO, Assunto.class);
    }

}
