import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  teamMembers: any[] = [
    {
      name: 'John Doe',
      studentId: '12345678',
      role: 'Developer',
      email: 'john@example.com'
    },
    {
      name: 'Jane Smith',
      studentId: '87654321',
      role: 'Designer',
      email: 'jane@example.com'
    },
    {
      name: 'Alex Johnson',
      studentId: '98765432',
      role: 'Tester',
      email: 'alex@example.com'
    }
  ];

}
