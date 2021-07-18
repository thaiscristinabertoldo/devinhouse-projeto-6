package br.com.devinhouse.grupo04.exceptionHandler;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.devinhouse.grupo04.service.exceptions.AssuntoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.AssuntoNotFoundException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoFlAtivoInvalidException;
import br.com.devinhouse.grupo04.service.exceptions.InteressadoNotFoundException;
import br.com.devinhouse.grupo04.service.exceptions.NuIdentificacaoJaExistenteException;
import br.com.devinhouse.grupo04.service.exceptions.ProcessoNotFoundException;

@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageSource messageSource;
	
	private Logger log = LogManager.getLogger(AppExceptionHandler.class);
	
	@ExceptionHandler(ProcessoNotFoundException.class)
	public ResponseEntity<Object> handleProcessoNotFoundException(ProcessoNotFoundException ex, WebRequest request) {
		logar(ex);

		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 404);
		return ResponseEntity.status(404).body(validacao);
	}

	@ExceptionHandler(AssuntoNotFoundException.class)
	public ResponseEntity<Object> handleAssuntoNotFoundException(AssuntoNotFoundException ex, WebRequest request) {
		logar(ex);

		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 404);
		return ResponseEntity.status(404).body(validacao);
	}

	@ExceptionHandler(AssuntoFlAtivoInvalidException.class)
	public ResponseEntity<Object> handleAssuntoFlAtivoInvalidException(AssuntoFlAtivoInvalidException ex, WebRequest request){
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 400);
		return ResponseEntity.status(400).body(validacao);
	}
	
	@ExceptionHandler(InteressadoNotFoundException.class)
	public ResponseEntity<Object> handleInteressadoNotFoundException(InteressadoNotFoundException ex, WebRequest request) {
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 404);
		return ResponseEntity.status(404).body(validacao);
	}
	

	@ExceptionHandler(InteressadoFlAtivoInvalidException.class)
	public ResponseEntity<Object> handleInteressadoFlAtivoInvalidException(InteressadoFlAtivoInvalidException ex, WebRequest request) {
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 400);
		return ResponseEntity.status(400).body(validacao);
	}

	@ExceptionHandler(NuIdentificacaoJaExistenteException.class)
	public ResponseEntity<Object> handleNuIdentificacaoJaExistenteException(NuIdentificacaoJaExistenteException ex,	WebRequest request) {
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), ex.getMessage(), 400);
		return ResponseEntity.status(400).body(validacao);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), "Um ou mais campos estão incorretos. Corrija e tente novamente", 400);

		List<Validacao.Campo> campos = ex.getBindingResult().getAllErrors().stream()
				.map(erro -> new Validacao.Campo(((FieldError) erro).getField(), messageSource.getMessage(erro, LocaleContextHolder.getLocale())))
				.collect(Collectors.toList());

		validacao.setCampos(campos);

		return super.handleExceptionInternal(ex, validacao, headers, status, request);
	}

	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		logar(ex);
		
		Validacao validacao = new Validacao(LocalDate.now(), "Endpoint não cadastrado" , 404);
		return ResponseEntity.status(404).body(validacao);
	}
	
	private void logar(Throwable ex) {
		log.warn(ex.getMessage(), ex);
	}
}
