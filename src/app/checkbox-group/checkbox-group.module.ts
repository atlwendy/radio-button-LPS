import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { TsCheckboxModule } from '@terminus/ui-checkbox';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    TsCheckboxModule,
    FlexModule,
    CommonModule,
  ],
  declarations: [
    CheckboxGroupComponent,
  ],
  exports: [
    CheckboxGroupComponent,
  ],
})
export class CheckboxGroupModule { }
