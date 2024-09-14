import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface formInterface {
    label: string;
    value?: string;
}

@Component({
    selector: 'sell-product',
    templateUrl: './sellProduct.component.html',
    styleUrls: ['./sellProduct.component.scss']
})
export class SellProduct {

    loading = false;
    sellMedicineformField: formInterface[] = [];


    sellMedicineForm: FormGroup = this.fb.group({
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
                this.sellMedicineformField = response;
                console.log('medicine form html data', this.sellMedicineformField);
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
        this.sellMedicineForm = this.fb.group({
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
        if (this.sellMedicineForm.valid) {
            console.log(this.sellMedicineForm.value);

            this.apiService.postData('add_medicine', this.sellMedicineForm.value).subscribe(
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