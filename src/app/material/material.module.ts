import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ],
  exports: [
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
