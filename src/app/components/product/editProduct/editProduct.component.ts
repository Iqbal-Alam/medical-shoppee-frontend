import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'edit-product',
    templateUrl: './editProduct.component.html',
    styleUrls: ['./editProduct.component.scss']
})
export class EditProduct {
    medicineForm: FormGroup;
    editObjectData;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditProduct>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        const { id, created_at, updated_at, ...rest } = data;
        const labelValueArray = Object.keys(rest).map(key => ({
            label: key,
            value: data[key]
        }));

        this.editObjectData = labelValueArray;
        console.log('edit data', this.editObjectData);
        this.medicineForm = this.fb.group({
            id: [data.id],
            medicine_name: [data.medicine_name],
            hsn: [data.hsn],
            pack: [data.pack],
            mfg: [data.mfg],
            exp: [data.exp],
            batch: [data.batch],
            qty: [data.qty],
            free: [data.free],
            scheme: [data.scheme],
            mrp: [data.mrp],
            rate: [data.rate],
            tax_td: [data.tax_td],
            tax_td_amt: [data.tax_td_amt],
            gst: [data.gst],
            amount: [data.amount],
            created_at: [new Date(data.created_at).toISOString().slice(0, 19).replace('T', ' ')],
            updated_at: [new Date(data.updated_at).toISOString().slice(0, 19).replace('T', ' ')]
        });
    }
    ngOnInit(): void {}

    onSubmit(): void {
        if (this.medicineForm.valid) {
            this.dialogRef.close(this.medicineForm.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
