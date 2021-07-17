package br.com.devinhouse.grupo04.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;

import javax.annotation.security.RolesAllowed;
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

import br.com.devinhouse.grupo04.dto.InteressadoDTOInput;
import br.com.devinhouse.grupo04.dto.InteressadoDTOOutput;
import br.com.devinhouse.grupo04.entity.Interessado;
import br.com.devinhouse.grupo04.mapper.InteressadoMapper;
import br.com.devinhouse.grupo04.service.InteressadoService;

@RestController
@RequestMapping(value = "/v1" + "/interessados")
public class InteressadoController {

	@Autowired
	private InteressadoMapper interessadoMapper;
	
	@Autowired
	private InteressadoService service;

	@RolesAllowed("user") 
	@PostMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.CREATED)
	public InteressadoDTOOutput create(@Valid @RequestBody InteressadoDTOInput interessadoDTO) {
		Interessado interessado = service.create(interessadoMapper.toInteressado(interessadoDTO));

		return interessadoMapper.toDto(interessado);
	}

	@RolesAllowed("user") 
	@GetMapping(produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public List<InteressadoDTOOutput> findAll(@RequestParam(required = false) String nu_identificacao) {
		List<Interessado> interessados = service.findAll(nu_identificacao);

		return interessadoMapper.toDto(interessados);
	}

	@RolesAllowed("user") 
	@GetMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public InteressadoDTOOutput find(@PathVariable long id) {
		Interessado interessado = service.find(id);

		return interessadoMapper.toDto(interessado);
	}

	@RolesAllowed("user") 
	@PutMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void update(@PathVariable Long id, @RequestBody InteressadoDTOInput interessadoDTO) {
		service.update(id, interessadoMapper.toInteressado(interessadoDTO));
	}

	@RolesAllowed("user") 
	@DeleteMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
	@ResponseBody
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

}
