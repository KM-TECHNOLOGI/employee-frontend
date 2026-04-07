import { Component, effect, inject } from '@angular/core';
import { Dispatcher } from '@ngrx/signals/events';
import { SmartTableComponent } from 'src/app/pages/ui-components/smart-table/smart-table.component';
import { Employee, employeeEvents, EmployeeStore } from 'src/app/store/EmployeeMasterData';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employeelist',
  imports: [SmartTableComponent, MatButtonModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.scss',
})
export class EmployeelistComponent {

  private store = inject(EmployeeStore);
  private dispatcher = inject(Dispatcher);
  dialog = inject(MatDialog);

  employees: any[] = [];

  action: string = '';

  displayedColumns = ['name', 'department', 'email', 'salary'];

  constructor() {
    // ✅ Store se data listen karo
    effect(() => {
      this.employees = this.store.employees();
      console.log('Employees:', this.employees);
    });
  }

  ngOnInit() {

    this.dispatcher.dispatch(employeeEvents.loadEmployees());

  }

  AddEmployee() {
    this.dialog.open(AddemployeeComponent, {
      data: { mode: 'create' },
      disableClose: true,
    });
  }

  EditEmployee(row: any) {
    console.log('EditEmployee called', this.employees);
    this.dialog.open(AddemployeeComponent, {
      data: { mode: 'edit', employee: row },
      disableClose: true,
    });
  }

  DeleteEmployee(row: any) {
    console.log('DeleteEmployee called with id:', row.id);
    this.dispatcher.dispatch(employeeEvents.deleteEmployee({ id: row.id }));
  }

}
