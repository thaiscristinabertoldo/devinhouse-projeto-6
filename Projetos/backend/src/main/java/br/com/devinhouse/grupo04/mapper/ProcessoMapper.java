package br.com.devinhouse.grupo04.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.com.devinhouse.grupo04.dto.ProcessoDTOInput;
import br.com.devinhouse.grupo04.dto.ProcessoDTOOutput;
import br.com.devinhouse.grupo04.entity.Processo;
import br.com.devinhouse.grupo04.service.AssuntoService;
import br.com.devinhouse.grupo04.service.InteressadoService;

@Mapper(componentModel = "spring", uses = {InteressadoService.class, AssuntoService.class})
public interface ProcessoMapper {	
	@Mapping(source = "cdInteressadoId", target = "cdInteressado" )
	@Mapping(source = "cdAssuntoId", target = "cdAssunto" )
	Processo toProcesso(ProcessoDTOInput dtoInput);
	@Mapping(target = "cdInteressado", expression = "java(processo.getCdInteressado())" )
	@Mapping(target = "cdAssunto", expression = "java(processo.getCdAssunto())" )
	ProcessoDTOOutput toDto(Processo processo);
	List<ProcessoDTOOutput> toDto(List<Processo> processos);
}