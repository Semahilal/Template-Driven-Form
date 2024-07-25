import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private apiUrl = 'http://localhost:8080/mesaj/get';
  private apiUrl2 = 'http://localhost:8080/mesaj/create';
  private apiUrl3 = 'http://localhost:8080/mesaj/delete';
  private apiUrl4 = 'http://localhost:8080/mesaj/update';
  private apiUrl5 = 'http://localhost:8080/mesaj/list';


  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(this.apiUrl5);
  }

  getPeople() {
    return this.http.get(this.apiUrl);
  }
  
  createPeople(person: {
                        id: number | null, 
                        name: string | null, 
                        surname: string | null, 
                        age: number | null, 
                        city: string | null, 
                        option: string  | null
                      }) {
                          debugger
    return this.http.post(this.apiUrl2, person);
  }

  deletePeople(person: {
    id: number | null, 
    name: string | null, 
    surname: string | null, 
    age: number | null, 
    city: string | null, 
    option: string  | null
  }) {
    return this.http.delete(this.apiUrl3 + '/' + person.id);
  }

  updatePeople(person: {
    id: number | null, 
    name: string | null, 
    surname: string | null, 
    age: number | null, 
    city: string | null, 
    option: string  | null
  }) {
    return this.http.put(this.apiUrl4 + '/' + person.id , person);
  }
}