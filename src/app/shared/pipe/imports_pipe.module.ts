import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomstatusPipe } from './roomstatus.pipe';
import { HousetypePipe } from './housetype.pipe';
import { FormatVndPipe } from './format.vnd.pipe';


@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [
    RoomstatusPipe,
    HousetypePipe,
    FormatVndPipe
  ],
  exports:[
    RoomstatusPipe,
    HousetypePipe,
    FormatVndPipe
  ]
})
export class Imports_pipeModule { }
