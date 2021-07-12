package br.com.devinhouse.grupo04.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.devinhouse.grupo04.dto.ProcessoDTOInput;
import br.com.devinhouse.grupo04.dto.ProcessoDTOOutput;
import br.com.devinhouse.grupo04.mapper.ProcessoMapper;
import br.com.devinhouse.grupo04.service.ProcessoService;

@RestController
@RequestMapping(value = "/v1" + "/processos")
public class ProcessoController {

	@Autowired
	private ProcessoService service;

	@Autowired
	private ProcessoMapper processoMapper;

	@GetMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public List<ProcessoDTOOutput> findAll(@RequestParam(required = false) String chave_processo,
			@RequestParam(required = false) Long cd_interessado_id,
			@RequestParam(required = false) Long cd_assunto_id
			) {
		return processoMapper.toDto(service.findAll(chave_processo, cd_interessado_id, cd_assunto_id));

	}

	@GetMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public ProcessoDTOOutput find(@PathVariable Long id) {
		return processoMapper.toDto(service.find(id));
	}

	@PostMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.CREATED)
	public ProcessoDTOOutput create(@Valid @RequestBody ProcessoDTOInput processoDTO) {
		return processoMapper.toDto(service.create(processoMapper.toProcesso(processoDTO)));
	}

	@PutMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void update(@PathVariable Long id, @RequestBody ProcessoDTOInput processoDTO) {
		service.update(id, processoMapper.toProcesso(processoDTO));
	}

	@DeleteMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}