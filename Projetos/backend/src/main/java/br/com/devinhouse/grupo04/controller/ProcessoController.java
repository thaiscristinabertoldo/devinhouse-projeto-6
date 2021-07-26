package br.com.devinhouse.grupo04.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin
@RestController
@RequestMapping(value = "/v1" + "/processos")
public class ProcessoController {
	
	private static final Logger logger = LogManager.getLogger(ProcessoController.class);

	@Autowired
	private ProcessoService service;

	@Autowired
	private ProcessoMapper processoMapper;
	
	@RolesAllowed("user")
	@GetMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public List<ProcessoDTOOutput> findAll(@RequestParam(required = false) String chave_processo,
			@RequestParam(required = false) Long nu_processo,
			@RequestParam(required = false) String cd_assunto_descricao
			) {
		logger.info("ProcessoController.findAll chamado com os seguintes params: chave_processo = {}, nu_processo = {}, cd_assunto_descricao = {}", chave_processo, nu_processo, cd_assunto_descricao);
		
		return processoMapper.toDto(service.findAll(chave_processo, nu_processo, cd_assunto_descricao));

	}
	
	@RolesAllowed("user")
	@GetMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public ProcessoDTOOutput find(@PathVariable Long id) {
		logger.info("ProcessoController.find chamado com seguinte id: {}", id);
		
		return processoMapper.toDto(service.find(id));
	}
	
	@RolesAllowed("user")
	@PostMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.CREATED)
	public ProcessoDTOOutput create(@Valid @RequestBody ProcessoDTOInput processoDTO) {
		logger.info("ProcessoController.create chamado");
		
		return processoMapper.toDto(service.create(processoMapper.toProcesso(processoDTO)));
	}
	
	@RolesAllowed("user")
	@PutMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void update(@PathVariable Long id, @RequestBody ProcessoDTOInput processoDTO) {
		logger.info("ProcessoController.update chamado");
		
		service.update(id, processoMapper.toProcesso(processoDTO));
	}
	
	@RolesAllowed("user")
	@DeleteMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		logger.info("ProcessoController.delete chamado com seguinte id: {}", id);
		
		service.delete(id);
	}
}