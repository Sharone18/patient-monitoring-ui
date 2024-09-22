import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../api-service.service";
import {PatientModel} from "../PatientModel";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  isAddPatient: boolean = true; // Default option

  patientName: string = '';
  patientAge: string = '';
  patientGender: string = '';
  patientId: string = '';
  errorMessage: string | null = null;


  constructor(private apiService: ApiServiceService, private router: Router) { }

  toggleOption() {
    this.isAddPatient = !this.isAddPatient;
  }

  onConfirm() {
    if (this.isAddPatient) {
      let patientModel: PatientModel = {
        id: this.patientId,
        name: this.patientName,
        gender: this.patientGender,
        age: this.patientAge
      };
      console.log('Adding Patient:', patientModel);

      this.apiService.save(patientModel).subscribe(
        (response) => {
          // Handle successful login here
          this.router.navigate(['ecg']); // Redirect to ECG Page
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.errorMessage = 'Error saving patient';
        }
      );
    } else {
      console.log('Viewing Patient with ID:', this.patientId);
      // Handle the logic for viewing a patient
      this.router.navigate(['ecg']); // Redirect to ECG Page
    }
  }
}
