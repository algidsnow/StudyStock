import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ApiReportComponent {
    constructor(private http: HttpClient) {
    }

    Get_Data_24hMoney(): Observable<any> {
        debugger;
        const httpOptions: any =
        {
            ContentType: 'application/json; charset=utf-8',
            params: { "locale": "vi", "symbol": "shb", "period": 2, "view": 1, "page": 1, "expanded": true }
        };
        return new Observable<any>(obs =>{
            this.http.get<any>('https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-report', httpOptions)
            .pipe().subscribe(x => {
                if(x['status'] === 200){
                    // this.headersReport24h = x['headers'];
                    return obs.next(x);
                }
            });
        });
    }
    Get_Data_Dstock() {
        const httpOptions: any =
        {
            ContentType: 'application/json; charset=utf-8',
            params: {
                "q": "code:MBB~reportType:QUARTER~modelType:2,90,102,412~fiscalDate:2022-12-31,2022-09-30,2022-06-30,2022-03-31,2021-12-31,2021-09-30,2021-06-30,2021-03-31,2020-12-31"
                , "sort": "fiscalDate",
                "size": 2000
            }
        };
        return this.http.get<any>('https://finfo-api.vndirect.com.vn/v4/financial_statements', httpOptions)
            .pipe().subscribe(x => {
                console.log(x);
            });
    }
    Get_Model_Dstock(): Observable<any>{
        const httpOptions: any =
        {
            ContentType: 'application/json; charset=utf-8',
            params: {
                "q": "codeList:MBB~modelType:3,91,103,413~note:TT199/2014/TT-BTC,TT334/2016/TT-BTC,TT49/2014/TT-NHNN,TT202/2014/TT-BTC~displayLevel:0,1,2,3"
                , "sort": "displayOrder:asc",
                "size": 999
            }
        };
        return this.http.get<any>('https://finfo-api.vndirect.com.vn/v4/financial_models', httpOptions).pipe()
    }
}
export class HeaderReport24h{
    quarter: number;
    type: string;
    year: number
}