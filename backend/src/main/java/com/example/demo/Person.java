package com.example.demo;

public class Person {
    private int id;
    private String name;
    private String surname;
    private int age;
    private String city;

    private String option;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Person() {
    }

    public Person(int id, String name, String surname, int age, String city, String option) {
        this.id=id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.city = city;
        this.option = option;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

}
