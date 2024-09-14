import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface formInterface {
    label: string;
    value?: string;
}

@Component({
    selector: 'add-product',
    templateUrl: './addProduct.component.html',
    styleUrls: ['./addProduct.component.scss']
})
export class AddProduct implements OnInit {

    loading = false;
    medicineformField: formInterface[] = [];


    medicineForm: FormGroup = this.fb.group({
        medicine_name: [''],
        hsn: [''],
        pack: [''],
        mfg: [''],
        exp: [''],
        batch: [''],
        qty: [''],
        free: [''],
        scheme: [''],
        mrp: [''],
        rate: [''],
        tax_td: [''],
        tax_td_amount: [''],
        gst: [''],
        amount: [''],
    });

    constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.apiService.getLocalJsonData().subscribe(
            (response: formInterface[]) => {
                this.medicineformField = response;
                console.log('medicine form html data', this.medicineformField);
            },
            (error) => {
                console.error('Error fetching data:', error);
                this._snackBar.open(error.error.message, 'Close', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5000
                });
            }
        );
        this.medicineForm = this.fb.group({
            medicine_name: ['', Validators.required],
            hsn: ['', Validators.required],
            pack: ['', Validators.required],
            mfg: ['', Validators.required],
            exp: ['', Validators.required],
            batch: ['', Validators.required],
            qty: ['', Validators.required],
            free: [''],
            scheme: [''],
            mrp: ['', Validators.required],
            rate: ['', Validators.required],
            tax_td: ['', Validators.required],
            tax_td_amt: ['', Validators.required],
            gst: ['', Validators.required],
            amount: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.medicineForm.valid) {
            console.log(this.medicineForm.value);

            this.apiService.postData('add_medicine', this.medicineForm.value).subscribe(
                (response) => {
                    console.log('saved medicine response', response);
                    this._snackBar.open('Medicine Saved', 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                },
                (error) => {
                    console.error('Error fetching data:', error);
                    this._snackBar.open(error.error.message, 'Close', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5000
                    });
                }
            );
        } else {

        }
    }



}