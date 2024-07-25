import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DropdownModule } from 'primeng/dropdown';
import { OverlayModule } from 'primeng/overlay';
import { InputNumberModule } from 'primeng/inputnumber';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import { TabViewModule } from "primeng/tabview";
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

import { MyServiceService } from "./my-service.service";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    providers : [MyServiceService],
      imports: [BrowserModule, 
          TabViewModule,
          DropdownModule,
          FormsModule,
          BrowserAnimationsModule,
          OverlayModule,
          InputTextModule,
          InputNumberModule,
          ButtonModule,
          TableModule,
          DialogModule,
          PaginatorModule,
          RippleModule,
          HttpClientModule
    ],
      
})

export class AppModule{}