import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NipValidator } from 'src/app/validators/nip-validator';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  recruitForm: FormGroup;
  allAgree: boolean = false;

  constructor(private fb: FormBuilder) {
    this.recruitForm = this.fb.group({
      name: ['', Validators.required],
      nip: ['', [Validators.required, NipValidator.validateNip]],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      phoneNumber: ['', Validators.pattern('[0-9 ]{9,11}')],
      subject: ['cooperation', Validators.required],
      driveLicense: [false],
      message: [''],
      dataProcessingAgree: [false, Validators.requiredTrue],
      marketingAgree: [false],
    });
  }

  ngOnInit(): void {}

  acceptAllAgreement(): void {
    this.allAgree = !this.allAgree;
    if (this.allAgree) {
      this.recruitForm.get('dataProcessingAgree')?.setValue(true);
      this.recruitForm.get('marketingAgree')?.setValue(true);
    } else {
      this.recruitForm.get('dataProcessingAgree')?.setValue(false);
      this.recruitForm.get('marketingAgree')?.setValue(false);
    }
  }

  submitForm(): void {
    for (const c of Object.keys(this.recruitForm.controls)) {
      this.recruitForm.controls[c].markAsDirty();
    }

    if (this.recruitForm.valid) {
      console.log(this.recruitForm.value);
    }
  }
}
