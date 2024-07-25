package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mesaj")
@CrossOrigin( origins = "http://localhost:4200/" , allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        maxAge=3600)
public class DemoApi {
    List<Person> people = new LinkedList<>(Arrays.asList(
            new Person(1,"John", "Doe", 30,"New York", "Active"),
            new Person(2,"Jane", "Doe", 40,"New York", "Passive")
    ));
    @GetMapping("/get")
    public List<Person> getPeople() {
        return this.people;
    }

    @GetMapping("/list")
    public List<Person> getList (){
        return this.people;
    }


    @PostMapping("/create")
    public List<Person> createPeople(@RequestBody Person person) {
        Person newPerson = new Person();
        newPerson.setId(person.getId());
        newPerson.setName(person.getName());
        newPerson.setSurname(person.getSurname());
        newPerson.setAge(person.getAge());
        newPerson.setCity(person.getCity());
        newPerson.setOption(person.getOption());

        this.people.add(newPerson);
        return this.people;
    }

    @DeleteMapping("/delete/{personid}")
    public List<Person> deletePeople(@PathVariable int personid){
        for (int i = 0; i < this.people.size(); i++) {
            if (this.people.get(i).getId() == personid) {
                this.people.remove(i);
                break;
            }
        }
        return this.people;
    }

    @PutMapping("/update/{personid}")
    public List<Person> updatePeople(@PathVariable int personid, @RequestBody Person updatedPerson){
        for (int i = 0; i < this.people.size(); i++) {
            if (this.people.get(i).getId() == personid) {
                this.people.set(i, updatedPerson);
                break;
            }
        }
        return this.people;
    }





}
