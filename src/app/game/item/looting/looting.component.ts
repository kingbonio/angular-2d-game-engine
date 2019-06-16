import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-looting',
  templateUrl: './looting.component.html',
  styleUrls: ['./looting.component.scss']
})
export class LootingComponent implements OnInit {
  form: FormGroup;
  description: string;

  constructor(
    private dialogRef: MatDialogRef<LootingComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      // ...
    });
  }

  public save() {
    this.dialogRef.close(this.form.value);
  }

  public close() {
    this.dialogRef.close();
  }

}
