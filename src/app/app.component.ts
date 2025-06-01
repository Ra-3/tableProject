import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  username: string;
  photo?: string; // Add photo property
}

@Component({
  selector: 'app-root',
  imports: [ MatTableModule, HttpClientModule, CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tableProject';
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<User>();
  editingCell: { row: User, column: string } | null = null; // Property to track the edited cell

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get<User[]>('https://fake-json-api.mock.beeceptor.com/users')
      .subscribe((data) => {
        if (data && data.length > 0) {
          // Add a dummy photo URL for demonstration
          const usersWithPhotos = data.map(user => ({
            ...user,
            photo: `https://i.pravatar.cc/50?u=${user.id}`
          }));
          this.displayedColumns = Object.keys(usersWithPhotos[0]);
          console.log(this.displayedColumns);
          this.dataSource.data = usersWithPhotos;
        } else {
           this.dataSource.data = data;
        }
      });
  }

  // Method to start editing a cell
  startEdit(row: User, column: string) {
    this.editingCell = { row, column };
  }
}
