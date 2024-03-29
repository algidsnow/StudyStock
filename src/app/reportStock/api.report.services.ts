import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ApiReportComponent {
    _urlApi = environment.LocalAPI
    constructor(private http: HttpClient) {
    }
    Get_Data_24hMoney(option: OptionReport24h): Observable<any> {
        const httpOptions: any =
        {
            ContentType: 'application/json; charset=utf-8',
            // tslint:disable-next-line: max-line-length
            params: { "locale": "vi", "symbol": option.StockCode, "period": +option.Period, "view": +option.View, "page": 1, "expanded": true }
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
    r1_Post_Data(model, url: string): Observable<any> {
        const options: any = {
          ContentType: 'application/json; charset=utf-8',
        };
        return this.http.post<any>(this._urlApi + url, model, options);
      }
      r1_Get_Data(url: string): Observable<any> {
        const options: any = {
          ContentType: 'application/json; charset=utf-8',
        };
        return this.http.get<any>(this._urlApi + url, options);
      }
}
export class HeaderReport24h{
    quarter: number;
    type: string;
    year: number
}
export class OptionReport24h{
    constructor(){
        this.StockCode = "mbb";
        this.Period = 2;
        this.View = 1;
        this.FormularType = 1;
    }
    StockCode: string;
    Period?: number;
    View?: number;
    FormularType: number;
}
export class CreateReport24hData{
    constructor(){
        this.Calculator  = '';
        this.CalculatorName = '';
        this.SelectedCols = [];
    }
    Calculator: string;
    CalculatorName: string;
    SelectedCols: any[]
}
export class CommonEnumData{
    Id: number;
    Name: string;
}

export  enum FinanciReportType{
    BalanceSheet = 1,
    IncomeStatement = 2,
    StatementOfCashFlows = 3
}
export const FinanciReportTypeLabel = new Map<number, string>([
    [FinanciReportType.BalanceSheet, 'Bảng cân đối kế toán'],
    [FinanciReportType.IncomeStatement, 'Báo cáo kết quả kinh doanh'],
    [FinanciReportType.StatementOfCashFlows, 'Lưu chuyển tiền tệ']
  ]);

  export  enum FormulaTypeEnum{
    Col = 1,
    Number = 2,
}
export const FormulaTypeEnumLabel = new Map<number, string>([
    [FormulaTypeEnum.Col, 'Theo cột'],
    [FormulaTypeEnum.Number, 'Theo chỉ số'],
  ]);

