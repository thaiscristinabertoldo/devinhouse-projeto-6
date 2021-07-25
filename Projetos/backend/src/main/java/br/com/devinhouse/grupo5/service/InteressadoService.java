package br.com.devinhouse.grupo5.service;

import br.com.devinhouse.grupo5.domain.exceptions.*;
import br.com.devinhouse.grupo5.dto.InteressadoInputDTO;
import br.com.devinhouse.grupo5.dto.InteressadoOutputDTO;
import br.com.devinhouse.grupo5.model.Interessado;
import br.com.devinhouse.grupo5.repository.InteressadoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static br.com.devinhouse.grupo5.util.Validacoes.validarCpf;
import static br.com.devinhouse.grupo5.util.Validacoes.validarDtNascimento;


@AllArgsConstructor
@Service
public class InteressadoService {

  @Autowired
  private final InteressadoRepository interessadoRepository;

  @Autowired
  private final ModelMapper modelMapper;

  public InteressadoOutputDTO cadastrarInteressado(InteressadoInputDTO novoInteressado) {

    if(!validarCpf(novoInteressado.getNuIdentificacao())){
      throw new CpfInvalidoException();
    }

    if(!validarDtNascimento(novoInteressado.getDtNascimento())){
      throw new DataDeNascimentoInvalidaException();
    }

    if (interessadoRepository.findByNuIdentificacao(novoInteressado.getNuIdentificacao()).isPresent()) {
      throw new CpfJaExistenteException("Há um interessado cadastrado com a mesma identificação.");
    }

    return toDTO(interessadoRepository.save(toInteressado(novoInteressado)));
  }

  public InteressadoOutputDTO buscarInteressadoPeloId(Long id) {
    return toDTO(interessadoRepository.findById(id).orElseThrow(InteressadoNaoEncontradoException::new));
  }

  public InteressadoOutputDTO buscarInteressadoPeloNuIdentificacao(String valor) {
    return toDTO(
            interessadoRepository.findByNuIdentificacao(valor).orElseThrow(InteressadoNaoEncontradoException::new));
  }

  private InteressadoOutputDTO toDTO(Interessado interessado) {
    return modelMapper.map(interessado, InteressadoOutputDTO.class);
  }

  private Interessado toInteressado(InteressadoInputDTO interessadoInputDTO) {
    return modelMapper.map(interessadoInputDTO, Interessado.class);
  }

}
