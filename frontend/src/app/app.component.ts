import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { KeyFilterModule } from 'primeng/keyfilter';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';

import {FormGroup } from '@angular/forms';

import { MyServiceService } from './my-service.service';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DropdownModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule, TableModule, CommonModule, DialogModule, 
    PaginatorModule, KeyFilterModule, IconFieldModule, InputIconModule, TagModule, RippleModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [MyServiceService]
  
})

export class AppComponent {
  title = 'primeng';
  cities: any[]; // <--- Declare the cities property
  situations: any[];
  formGroup!: FormGroup;
 
  model: {
    id : number | null,
    name: string | null;
    surname: string | null;
    age: number | null;
    selectedCity: {
      label: string;
      value: string;
    } | null;
    selectedoption: {
      label2: string;
      value: string;
    } | null;
  } = {
    id: null,
    name: null,
    surname: null,
    age: null,
    selectedCity: null,
    selectedoption: null
  };

  people: any[] = [];
  filteredPeople: any[] = [];
  originalPeople: any[] = [];
  newPerson: any = {};
  backPerson: any = {};
  selectedPerson: any = {};
  clonedPeople: { [s: string]: any } = {};

  selectedCity: { label: string, value: string } | null;
  selectedoption: { label2: string, value: string } | null;


  isEditMode: boolean = false;


  visible : boolean = false;
  visible2 : boolean = false;

  constructor(private myService : MyServiceService) {
    this.selectedCity=null;
    this.selectedoption=null;
    
    this.cities = [
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
    ];

    this.situations = [
      { label2: 'Active', value: 'Active' },
      { label2: 'Passive', value: 'Passive' },
    ];   
  }
  ngOnInit(): void {
    this.originalPeople=this.people;
    this.filteredPeople = [...this.people]; 
  
    this.myService.getPeople().subscribe((response: Object) =>{
      
      if (Array.isArray(response)) {
        response.forEach(person => {
          this.backPerson = {
            id : person.id,
          
            name: person.name,
            surname:person.surname,
            age: person.age,
            selectedCity: { label: person.city, value: person.city },
            selectedoption: { label2: person.option, value: person.option }
          };
          
          console.log(person.id); // access the id property
          console.log(person.city); // access the name property
          this.originalPeople.push(this.backPerson);
        });
        this.filteredPeople = [...this.originalPeople];
      } else {
        console.error('Response is not an array');
      }
    });

   
    /*
    this.formGroup = new FormGroup({
      value: new FormControl(undefined, [Validators.pattern('^[0-9]+$'), Validators.required] ),
      text: new FormControl<string>('', Validators.required),
      text2: new FormControl<string>('', Validators.required),
      selectedCity: new FormControl<any>(null, Validators.required),
      selectedoption: new FormControl<any>(null, Validators.required),
    });*/
  }

  onSubmit () {
    
    //editing person
    if(this.isEditMode){
      this.selectedPerson = {
        ...this.selectedPerson,
        name: this.model.name,
        surname: this.model.surname,
        age: this.model.age,
        selectedCity: this.model.selectedCity ? { label: this.model.selectedCity.label, value: this.model.selectedCity.value } : null,
        selectedoption: this.model.selectedoption ? { label2: this.model.selectedoption.label2, value: this.model.selectedoption.value } : null
      
      };
      this.myService.updatePeople({
        id : this.selectedPerson.id,
        name: this.selectedPerson.name,
        surname: this.selectedPerson.surname,
        age: this.selectedPerson.age,
        city: this.selectedPerson.selectedCity.label,
        option: this.selectedPerson.selectedoption.value}
        )
      .subscribe(response=> {
        debugger
        this.filteredPeople = Object.values(response).map((person) => ({
          id: person.id,
          name: person.name,
          surname:person.surname,
          age: person.age,
          selectedCity: { label: person.city, value: person.city },
          selectedoption: { label2: person.option, value: person.option }
        }));})
      }



      /*console.log("onSubmit condition called")
      this.selectedPerson = {
        ...this.selectedPerson,
        name: this.model.name,
        surname: this.model.surname,
        age: this.model.age,
        selectedCity: this.model.selectedCity ? { label: this.model.selectedCity.label, value: this.model.selectedCity.value } : null,
        selectedoption: this.model.selectedoption ? { label2: this.model.selectedoption.label2, value: this.model.selectedoption.value } : null
      
      };
      const index = this.originalPeople.findIndex(person => person.id === this.selectedPerson.id);
    if (index !== -1) {
      Object.assign(this.originalPeople[index], this.selectedPerson);
    }this.filteredPeople = [...this.originalPeople];
      this.newPerson = {};
      this.model.name = '';
      this.model.surname = '';
      this.model.age = null;
      this.selectedCity = null;
      this.selectedoption = null;*/
      
    
    
    //Adding new person
    /*console.log('OnSubmit called');
    if (this.isEditMode==false) {
    this.newPerson = {
      id : this.nextId++,
      name: this.model.name,
      surname: this.model.surname,
      age: this.model.age,
      selectedCity: this.model.selectedCity,
      selectedoption: this.model.selectedoption
    };
    this.originalPeople.push(this.newPerson);
    this.filteredPeople = [...this.originalPeople];
    this.newPerson = {};
    this.model.name = '';
    this.model.surname = '';
    this.model.age = null ;
    this.selectedCity =null;
    this.selectedoption=null;
    console.log(this.selectedCity)
  }alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))*/

  //Adding new Person
  if (this.isEditMode==false) {
    
  this.myService.createPeople({
    id : Math.floor(Math.random() * 1000),
    name: this.model.name,
    surname: this.model.surname,
    age: this.model.age,
    city: this.model.selectedCity?.label ??null,
    option: this.model.selectedoption?.label2 ?? null,
    
 }).subscribe(response => {
    console.log(response);
    
    this.filteredPeople = Object.values(response).map((person) => ({
      id: person.id,
      name: person.name,
      surname:person.surname,
      age: person.age,
      selectedCity: { label: person.city, value: person.city },
      selectedoption: { label2: person.option, value: person.option }
    }));})
  this.myService.getList();
  }
}

  removePerson(person: any){
    debugger;
    this.myService.deletePeople(
      person
    ).subscribe(response => {
      debugger
      this.filteredPeople = Object.values(response).map((person) => ({
        id: person.id,
        name: person.name,
        surname:person.surname,
        age: person.age,
        selectedCity: { label: person.city, value: person.city },
        selectedoption: { label2: person.option, value: person.option }
      }));})
      
      
    /*console.log('Reset called')
    const index = this.people.indexOf(person);
  if (index !== -1) {
    this.originalPeople.splice(index, 1);
    this.filteredPeople = [...this.originalPeople];*/
  }
  

  showDialog(id ?: number){
    if(id){
      this.selectedPerson = this.originalPeople.find(x => x.id === id);
      this.model.name=this.selectedPerson.name;
      this.model.surname=this.selectedPerson.surname;
      this.model.age=this.selectedPerson.age;
      this.model.selectedCity=this.selectedPerson.selectedCity;
      this.model.selectedoption=this.selectedPerson.selectedoption
      this.isEditMode = true;
      this.visible=true;
      console.log("selected",this.selectedPerson)
    }else{
      this.model.name = '';
    this.model.surname = '';
    this.model.age = null ;
    this.model.selectedCity =null;
    this.model.selectedoption=null;
      this.selectedPerson = {};
      this.isEditMode = false;
      this.visible=true;
    }
  }

  

  saveAndHide(){
 
    this.onSubmit();
    this.visible=false;
  }
  

  

filterCities(city: string) {
  if (!city || city === '') {
    this.filteredPeople = [...this.originalPeople]; // reset to original data
  } else {
    this.filteredPeople = this.originalPeople.filter(person => person.selectedCity.label === city);
  }

}
filtersituations(situation: string){
  if (!situation || situation === '') {
    this.filteredPeople = [...this.originalPeople]; // reset to original data
  } else {
    this.filteredPeople = this.originalPeople.filter(person => person.selectedoption.label2 === situation);
    console.log(this.selectedoption)
  }
}



}
