package br.com.devinhouse.grupo5.service;

import br.com.devinhouse.grupo5.domain.exceptions.CpfInvalidoException;
import br.com.devinhouse.grupo5.domain.exceptions.CpfJaExistenteException;
import br.com.devinhouse.grupo5.domain.exceptions.DataDeNascimentoInvalidaException;
import br.com.devinhouse.grupo5.domain.exceptions.InteressadoNaoEncontradoException;
import br.com.devinhouse.grupo5.dto.InteressadoInputDTO;
import br.com.devinhouse.grupo5.dto.InteressadoOutputDTO;
import br.com.devinhouse.grupo5.model.Interessado;
import br.com.devinhouse.grupo5.repository.InteressadoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InteressadoServiceTest {

    @InjectMocks
    private InteressadoService interessadoService;

    @Mock
    private InteressadoRepository interessadoRepository;

    @Mock
    private ModelMapper modelMapper;

    @Test
    void verificarOCadastroDeUmInteressadoComInformacoesValidas(){
        // Given
        InteressadoInputDTO interessadoInputDTO = new InteressadoInputDTO(
                "Fulano",
                "61201446090",
                LocalDate.parse("2000-12-12"),
                true
        );
        Interessado interessado = new Interessado(
                1L,
                interessadoInputDTO.getNmInteressado(),
                interessadoInputDTO.getNuIdentificacao(),
                interessadoInputDTO.getDtNascimento(),
                interessadoInputDTO.getFlAtivo()
        );
        when(modelMapper.map(any(InteressadoInputDTO.class), eq(Interessado.class)))
          .thenReturn(interessado);
        when(interessadoRepository.save(interessado))
          .thenReturn(interessado);
        when(modelMapper.map(any(Interessado.class), eq(InteressadoOutputDTO.class)))
          .thenReturn(new InteressadoOutputDTO());
        // When
        assertThat(interessadoService.cadastrarInteressado(interessadoInputDTO)) // Then
          .isInstanceOf(InteressadoOutputDTO.class);
        verify(interessadoRepository, times(1)).save(interessado);
    }

    @Test
    void deveRetornarCpfJaCadastradoException(){

        InteressadoInputDTO interessadoInputDTO = new InteressadoInputDTO(
                "Fulano",
                "61201446090",
                LocalDate.parse("2000-12-12"),
                true
        );

        Interessado interessado = new Interessado(
                1L,
                interessadoInputDTO.getNmInteressado(),
                interessadoInputDTO.getNuIdentificacao(),
                interessadoInputDTO.getDtNascimento(),
                interessadoInputDTO.getFlAtivo()
        );

        when(interessadoRepository.findByNuIdentificacao(any())).thenReturn(Optional.of(interessado));

        Throwable error = catchThrowable(()->
        interessadoService.cadastrarInteressado(interessadoInputDTO)
                );

        assertThat(error).isInstanceOf(CpfJaExistenteException.class);
    }

    @Test
    void verificarOCadastroDeUmInteressadoComCPFInvalido(){
        // Given
        InteressadoInputDTO interessadoInputDTO = new InteressadoInputDTO(
                "Fulano",
                "12345678910",
                LocalDate.parse("2000-12-12"),
                true
        );
        // When
        Throwable exception = catchThrowable(() -> interessadoService.cadastrarInteressado(interessadoInputDTO));
        assertThat(exception) // Then
          .isInstanceOf(CpfInvalidoException.class);
    }

    @Test
    void verificarOCadastroDeUmInteressadoComDtNascimentoInvalido(){
        // Given
        InteressadoInputDTO interessadoInputDTO = new InteressadoInputDTO(
                "Fulano",
                "10736794034",
                LocalDate.parse("2021-12-12"),
                true
        );
        // When
        Throwable exception = catchThrowable(() -> interessadoService.cadastrarInteressado(interessadoInputDTO));
        assertThat(exception) // Then
          .isInstanceOf(DataDeNascimentoInvalidaException.class);
    }

    @Test
    void deveRetornarUm(){
        // Given
        when(interessadoRepository.findByNuIdentificacao(any()))
          .thenReturn(Optional.of(new Interessado()));
        when(modelMapper.map(any(Interessado.class), eq(InteressadoOutputDTO.class)))
          .thenReturn(new InteressadoOutputDTO());
        // When
        assertThat(interessadoService.buscarInteressadoPeloNuIdentificacao(any())) // Then
            .isInstanceOf(InteressadoOutputDTO.class);
        verify(interessadoRepository, times(1))
          .findByNuIdentificacao(any());
    }

    @Test
    void deveRetornarErroQuandoBuscarPorUmNumeroDeIdentificacaoInexistente(){
        // when
        Throwable exception = catchThrowable(() -> interessadoService.buscarInteressadoPeloNuIdentificacao("12345678910"));
        assertThat(exception) // Then
          .isInstanceOf(InteressadoNaoEncontradoException.class);
    }

    @Test
    void deveRetornarUmInteressadoQuandoBuscarPorUmIdExistente(){
        // Given
        when(interessadoRepository.findById(any()))
          .thenReturn(Optional.of(new Interessado()));
        when(modelMapper.map(any(Interessado.class), eq(InteressadoOutputDTO.class)))
          .thenReturn(new InteressadoOutputDTO());
        // When
        assertThat(interessadoService.buscarInteressadoPeloId(any())) // Then
          .isInstanceOf(InteressadoOutputDTO.class);
        verify(interessadoRepository, times(1)).findById(any());
    }

    @Test
    void deveRetornarErroQuandoBuscarPorUmIdInexistente(){
        // When
        Throwable exception = catchThrowable(() -> interessadoService.buscarInteressadoPeloId(1L));
        assertThat(exception) // Then
          .isInstanceOf(InteressadoNaoEncontradoException.class);
    }

}
