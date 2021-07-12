package br.com.devinhouse.grupo04.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.com.devinhouse.grupo04.dto.InteressadoDTOInput;
import br.com.devinhouse.grupo04.dto.InteressadoDTOOutput;
import br.com.devinhouse.grupo04.entity.Interessado;

@Mapper(componentModel = "spring")
public interface InteressadoMapper {
	@Mapping(source = "dtNascimento", target = "dtNascimento", dateFormat = "dd/MM/yyyy")
	Interessado toInteressado(InteressadoDTOInput interessadoDTO);
	InteressadoDTOOutput toDto(Interessado interessado);
	List<InteressadoDTOOutput> toDto(List<Interessado> interessados);
}
