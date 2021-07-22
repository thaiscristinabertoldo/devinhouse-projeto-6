package br.com.devinhouse.grupo5.domain.exceptionhandler;

import br.com.devinhouse.grupo5.domain.exceptions.*;
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
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class ValidationHandler extends ResponseEntityExceptionHandler {

  @Autowired
  private MessageSource messageSource;

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                HttpStatus status, WebRequest request) {

    var validation = newValidation("Um ou mais campos estão incorretos. Corrija e tente novamente", status);

    new Locale("pt-BR");
    List<Validation.Campo> campos = ex.getBindingResult().getAllErrors().stream()
            .map(e -> new Validation.Campo(((FieldError) e).getField(),
                            messageSource.getMessage(e, LocaleContextHolder.getLocale()))
                    // messageSource.getMessage(e, new Locale("pt-BR")))
            ).collect(Collectors.toList());

    validation.setCampos(campos);

    return super.handleExceptionInternal(ex, validation, headers, status, request);
  }

  @ExceptionHandler(CpfJaExistenteException.class)
  public ResponseEntity<Object> cpfExistenteHandler(CpfJaExistenteException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, NOT_FOUND);
  }

  @ExceptionHandler(AssuntoInativoException.class)
  public ResponseEntity<Object> assuntoInativoHandler(AssuntoInativoException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  @ExceptionHandler(InteressadoInativoException.class)
  public ResponseEntity<Object> interessadoInativoHandler(InteressadoInativoException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  @ExceptionHandler(ProcessoNaoEncontradoException.class)
  public ResponseEntity<Object> pessoaNaoEncontradaHandler(ProcessoNaoEncontradoException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, NOT_FOUND);
  }

  @ExceptionHandler(AssuntoNaoEncontradoException.class)
  public ResponseEntity<Object> assuntoNaoEncontradoHandler(AssuntoNaoEncontradoException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, NOT_FOUND);
  }

  @ExceptionHandler(NuProcessoJaCadastradoException.class)
  public ResponseEntity<Object> nuProcessoJaCadastradoException(NuProcessoJaCadastradoException ex, WebRequest webRequest){
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  @ExceptionHandler(InteressadoNaoEncontradoException.class)
  public ResponseEntity<Object> interessadoNaoEncontradoHandler(InteressadoNaoEncontradoException ex, WebRequest webRequest) {
    return exceptionSchema(ex, webRequest, NOT_FOUND);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Object> constraintViolationException(ConstraintViolationException ex, WebRequest webRequest){
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  @ExceptionHandler(CpfInvalidoException.class)
  public ResponseEntity<Object> constraintViolationException(CpfInvalidoException ex, WebRequest webRequest){
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  @ExceptionHandler(DataDeNascimentoInvalidaException.class)
  public ResponseEntity<Object> constraintViolationException(DataDeNascimentoInvalidaException ex, WebRequest webRequest){
    return exceptionSchema(ex, webRequest, BAD_REQUEST);
  }

  private ResponseEntity<Object> exceptionSchema(Exception ex, WebRequest webRequest, HttpStatus status){
    var validation = newValidation(ex.getMessage(), status);
    return super.handleExceptionInternal(ex, validation, new HttpHeaders(), status, webRequest);
  }

  private Validation newValidation(String titulo, HttpStatus status) {
    var validation = new Validation();
    validation.setStatus(status.value());
    validation.setDataHora(OffsetDateTime.now());
    validation.setTitulo(titulo);

    return validation;
  }
}
