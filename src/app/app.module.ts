import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TsRadioGroupModule } from '@terminus/ui-radio-group';
import { TsPaginatorModule } from '@terminus/ui-paginator';
import { TsLoginFormModule } from '@terminus/ui-login-form';
import { TsPipesModule } from '@terminus/ui-pipes';
import { TsSelectionListModule } from '@terminus/ui-selection-list';
import { TsOptionModule } from '@terminus/ui-option';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxGroupModule } from './checkbox-group/checkbox-group.module';
import { TsCheckboxModule } from '@terminus/ui-checkbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TsRadioGroupModule,
    TsCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TsPaginatorModule,
    TsLoginFormModule,
    TsPipesModule,
    TsSelectionListModule,
    TsOptionModule,
    CheckboxGroupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
