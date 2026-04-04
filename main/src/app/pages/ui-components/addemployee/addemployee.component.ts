import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Common
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [null, [Validators.required, Validators.min(1000)]]
    });
  }

  submit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    console.log('Employee Data:', this.employeeForm.value);

    // 👉 yahan tum API call ya SignalStore call kar sakte ho
    // this.store.addEmployee(this.employeeForm.value);

    this.router.navigate(['/employees']);
  }

  cancel() {
    this.router.navigate(['/employees']);
  }

  // getter for template
  get f() {
    return this.employeeForm.controls;
  }
}