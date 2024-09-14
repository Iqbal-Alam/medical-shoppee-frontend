import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isSpinnerLoading = false;
    sidenavOpened = true;

    menuItems = [
        { label: 'Add Medicine', route: '/user/addMedicine' },
        { label: 'Medicine', route: '/user/medicine' }
    ];

    constructor(private spinnerService: SpinnerService) { }

    ngOnInit(): void {
    }
}