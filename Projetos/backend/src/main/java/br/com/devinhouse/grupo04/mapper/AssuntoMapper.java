package br.com.devinhouse.grupo04.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import br.com.devinhouse.grupo04.dto.AssuntoDTOInput;
import br.com.devinhouse.grupo04.dto.AssuntoDTOOutput;
import br.com.devinhouse.grupo04.entity.Assunto;

@Mapper(componentModel = "spring")
public interface AssuntoMapper {

	Assunto toAssunto(AssuntoDTOInput assuntoDTO);
	AssuntoDTOOutput toDto(Assunto assunto);
	List<AssuntoDTOOutput> toDto(List<Assunto> assuntos);
}
