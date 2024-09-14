import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://medical-shop-app-production.up.railway.app/login';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        console.log('login request', email, password);
        const body = { email, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<any>(this.apiUrl, body, { headers });
    }
}
