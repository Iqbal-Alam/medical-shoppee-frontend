import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'  // This makes the service available globally
})
export class ApiService {

    private apiUrl = 'https://medical-shop-app-production.up.railway.app';
    private mockDataUrl = 'assets/mock-json/addMedicineForm.json';

    constructor(private http: HttpClient) { }

    // GET request
    getData(endpoint: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${endpoint}`);
    }

    // POST request
    postData(endpoint: string, body: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(`${this.apiUrl}/${endpoint}`, body, httpOptions);
    }

    getLocalJsonData(): Observable<any> {
        return this.http.get<any>(this.mockDataUrl);
    }

    updateData(rootUrl: string, id: number, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${rootUrl}/${id}`, data);
    }

    deleteData(rootUrl: string, id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${rootUrl}/${id}`);
    }

}
