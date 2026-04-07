import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dispatcher } from '@ngrx/signals/events';
import { CommonModule } from '@angular/common';
import { employeeEvents } from 'src/app/store/EmployeeMasterData';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  private dispatcher = inject(Dispatcher);

  departments = ['HR', 'Finance', 'Development', 'Sales', 'Marketing'];

  isEditMode: boolean = false;
  employee: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any   // 👈 yahan se data ayega
  ) {}

  ngOnInit(): void {

   console.log('Received Data:', this.data);

  this.employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: [null, [Validators.required, Validators.min(1000)]]
  });

  if (this.data?.mode === 'edit' && this.data?.employee) {

    this.isEditMode = true;
    this.employee = this.data.employee;

    this.employeeForm.patchValue({
      name: this.employee?.name || '',
      department: this.employee?.department || '',
      email: this.employee?.email || '',
      salary: this.employee?.salary || null
    });

  } else {
    this.isEditMode = false;
    console.log('Create Mode ON');
  }
  }

  submit() {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const request = { ...this.employeeForm.value };

    if (this.isEditMode) {
      // ✅ Update
      this.dispatcher.dispatch(employeeEvents.updateEmployee({
        id: this.employee.id,
        request: request
      }));

      console.log('Update Employee:', request);

    } else {
      // ✅ Create
      this.dispatcher.dispatch(employeeEvents.createEmployee(request));
      console.log('Create Employee:', request);
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  get f() {
    return this.employeeForm.controls;
  }
}