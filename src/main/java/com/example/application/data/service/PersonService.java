package com.example.application.data.service;

import java.util.List;

import com.example.application.data.entity.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;

@Service
public class PersonService extends CrudService<Person, Integer> {

  private PersonRepository repository;

  public PersonService(@Autowired PersonRepository repository) {
    this.repository = repository;
  }

  @Override
  protected PersonRepository getRepository() {
    return repository;
  }

  public List<Person> findAll() {
    return repository.findAll();
  }

}
