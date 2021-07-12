package br.com.devinhouse.grupo04.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class AtualizaColunasUtil {
	
	public static String[] getNullPropertyNames(Object origem) {
    final BeanWrapper origemWrapper = new BeanWrapperImpl(origem);
    java.beans.PropertyDescriptor[] propriedades = origemWrapper.getPropertyDescriptors();

    Set<String> propriedadesVazias = new HashSet<>();
    for (java.beans.PropertyDescriptor propriedade : propriedades) {
        Object propriedadeValor = origemWrapper.getPropertyValue(propriedade.getName());
        if (propriedadeValor == null) propriedadesVazias.add(propriedade.getName());
    }
    String[] result = new String[propriedadesVazias.size()];
    return propriedadesVazias.toArray(result);
	}
	
}
