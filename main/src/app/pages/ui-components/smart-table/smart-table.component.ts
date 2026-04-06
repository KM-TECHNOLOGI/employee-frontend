import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';


// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-1.jpg',
    uname: 'Gaming Console',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-2.jpg',
    uname: 'Leather Purse',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-3.jpg',
    uname: 'Red Velvate Dress',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-4.jpg',
    uname: 'Headphone Boat',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-smart-table',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss',
})
export class SmartTableComponent {

  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showActions: boolean = true;
  @Input() title: string = '';
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  @Input() showAdd: boolean = true;

  filteredData: any[] = [];
  finalColumns: string[] = [];

  ngOnChanges() {
    this.filteredData = [...this.dataSource];

    this.finalColumns = this.showActions
      ? [...this.displayedColumns, 'actions']
      : this.displayedColumns;
  }

  // 🔍 Search Filter
  applyFilter(event: any) {
    const value = event.target.value.toLowerCase();

    this.filteredData = this.dataSource.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value)
      )
    );
  }

    onAddClick() {
    console.log('Add clicked');
    this.add.emit(); // 🔥 parent ko notify
  }

  // ✏️ Edit Action
  onEdit(row: any) {
    console.log('Edit clicked', row);
    this.edit.emit(); // 🔥 parent ko notify
  }

  // 🗑️ Delete Action
  onDelete(row: any) {
    console.log('Delete:', row);
  }

}
