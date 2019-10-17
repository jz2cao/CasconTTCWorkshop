import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material";
import { Observable } from 'rxjs';
import { OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{
  title = 'cascon-subway-prediction';
  control1 = new FormControl();
  control2 = new FormControl();
  options: string[] = ['Finch', 'North York Center', 'Sheppard-Yonge', 'York Mills',
  'Lawrence', 'Eglinton', 'Davisville'];
  directionOptions: string[] = ['East', 'West', 'North', 'South'];
  chosenDirection: string;
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  cloudApiKey: "b2L1liMCcap6dKPMj_jKlrpe1-Ix5vGbxbSZ3MQKKuaP";
  mlInstanceID: "a2fa723d-75e3-4f52-9ba0-f3c770442766";

  constructor(private httpClient: HttpClient) {};

  ngOnInit() {
    this.filteredOptions1 = this.control1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptions2 = this.control2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().startsWith(filterValue));
  }

  performPrediction() {
    // getting iam token

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const tokenurl = "https://iam.bluemix.net/oidc/token"

    this.httpClient.post(proxyurl + tokenurl,
    new HttpParams()
      .set("grant_type", "urn:ibm:params:oauth:grant-type:apikey")
      .set("apikey", "b2L1liMCcap6dKPMj_jKlrpe1-Ix5vGbxbSZ3MQKKuaP")
    ,
      { headers: new HttpHeaders()
                .set("Content-Type", "application/x-www-form-urlencoded")
                .set("Accept", "application/json")
                .set("Access-Control-Allow-Origin", "*")
      }
    )
    .subscribe(
      data  => {
        console.log("PUT Request is successful ", data);
        const result = JSON.parse(JSON.stringify(data));
        const bearerToken = result.access_token;
        const bodyData = {"fields":["age","sex","cp","trestbps","chol","fbs","restecg","thalach","exang","oldpeak","slope","ca","thal"],"values":[[123,123,213,123,213,123,213,123,213,123,45,345,345]]};
        const predictionUrl = "https://us-south.ml.cloud.ibm.com/v3/wml_instances/38b8aa8f-fb60-4d34-8866-16ac7b076618/deployments/6d0cda0b-5a6c-487d-9f6d-c07069b9334a/online";

        this.httpClient.post(proxyurl + predictionUrl,
          bodyData,
            { headers: new HttpHeaders()
                      .set("Content-Type", "application/javascript")
                      .set("Accept", "application/json")
                      .set("Authorization", `Bearer ${bearerToken}`)
                      .set("ML-Instance-ID", "a2fa723d-75e3-4f52-9ba0-f3c770442766")
            }
        )
        .subscribe(
          data => {
            console.log("prediction successful", data);
          },
          error => {
            console.log("Rrror", error);
          }
        )

      },
      error  => {
        console.log("Rrror", error);
      }
    );
  }

  /*events: string[] = [];

addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.events.push(`${type}: ${event.value.getDay()}`);
}*/

  //payload = '{"input_data": [{"fields": ["Time", "Bound", "Line", "Month", "DayOfMonth", "Friday", "Monday", "Saturday", "Sunday", "Thursday", "Tuesday", "Wednesday", "ATC FAILURE", "BATHURST STATION", "BAY LOWER", "BAY LOWER STATION", "BAY STATION", "BAYVIEW STATION", "BESSARIAN STATION", "BESSARION STATION", "BLOOR DANFORTH SUBWAY", "BLOOR STATION", "BROADVIEW STATION", "CASTLE FRANK STATION", "CASTLE FRANK TO SHERBO", "CHESTER STATION", "CHRISTIE STATION", "COLLEGE STATION", "COXWELL STATION", "DAVISVILLE BUILD UP", "DAVISVILLE HOSTLER", "DAVISVILLE STATION", "DAVISVILLE YARD", "DON MILLS STATION", "DONLANDS STATION", "DOWNSVIEW PARK STATION", "DUFFERIN STATION", "DUFFERIN TO LANSDOWNE", "DUNDAS STATION", "DUNDAS WEST STATION", "DUPONT STATION", "EGLINTON STATION", "EGLINTON WEST STATION", "EGLINTON WEST TO VMC", "ELLESMERE STATION", "FINCH STATION", "FINCH TO UNION STATION", "FINCH WEST STATION", "GLENCAIRN STATION", "GLENCAIRN TO ST GEORGE", "GREENWOOD PORTAL", "GREENWOOD STATION", "GREENWOOD WYE", "GREENWOOD WYE (ENTERI", "GREENWOOD YARD", "HIGH PARK STATION", "HIGHWAY 407 STATION", "ISLINGTON STATION", "JANE STATION", "KEELE STATION", "KEELE TO DUNDAS WEST", "KEELE YARD", "KENNEDY - MCCOWAN", "KENNEDY BD STATION", "KENNEDY SRT STATION", "KENNEDY STATION TO KIP", "KING STATION", "KING STATION TO UNION", "KING TO UNION", "KIPLING STATION", "KIPLING STATION TO KEN", "KIPLING TO ROYAL YORK", "LANSDOWNE STATION", "LAWRENCE EAST STATION", "LAWRENCE EAST TO ELLES", "LAWRENCE STATION", "LAWRENCE TO EGLINTON S", "LAWRENCE WEST STATION", "LEAVING LAWRENCE EAST", "LEAVING YONGE/SHEPPARD", "LESLIE STATION", "LESLIE STATION(APPROAC", "MAIN STREET STATION", "MCBRIEN BUILDING", "MCCOWAN STATION", "MCCOWAN TO KENNEDY STA", "MCCOWAN YARD", "MIDLAND STATION", "MUSEUM STATION", "NORTH YORK CTR STATION", "OLD MILL STATION", "OLD MILL TO ISLINGTON", "OSGOODE POCKET", "OSGOODE STATION", "OSSINGTON AND DUFFERIN", "OSSINGTON STATION", "PAPE STATION", "PIONEER VILLAGE STATIO", "QUEEN STATION", "QUEEN'S PARK STATION", "ROSEDALE STATION", "ROYAL YORK STATION", "RUNNYMEDE STATION", "SCARB CTR STATION", "SCARBOROUGH RAPID TRAN", "SEHPPARD STATION", "SHEPPARD LINE", "SHEPPARD STATION", "SHEPPARD WEST MIGRATI", "SHEPPARD WEST MIGRATIO", "SHEPPARD WEST PORTAL", "SHEPPARD WEST STATION", "SHEPPARD WEST TO WILSO", "SHEPPARD YONGE", "SHEPPARD YONGE STATION", "SHERBOURNE STATION", "SOUTH OF LAWRENCE SRT", "SOUTH OF MIDLAND SRT", "SPADINA BD STATION", "SPADINA STATION", "SPADINA YUS STATION", "SRT LINE", "ST ANDREW STATION", "ST CLAIR STATION", "ST CLAIR WEST STATION", "ST CLAIR WEST TO DUPON", "ST CLAIR WEST TO EGLIN", "ST GEORGE BD STATION", "ST GEORGE YUS STATION", "ST PATRICK STATION", "SUMMERHILL STATION", "SYSTEM WIDE", "TRANSIT CONTROL CENTRE", "TYSSE LINE", "UNION (TO ST ANDREW)", "UNION STATION", "UNION STATION TO FINCH", "UNION STATION TO KING", "UNION STATION TO ST AN", "UNION TO KING STATION", "UNION TO ST ANDREW", "UNION TO ST GEORGE", "VAUGHAN MC STATION", "VICTORIA PARK STATION", "VMC TO SHEPPARD WEST", "WARDEN STATION", "WARDEN TO KENNEDY STAT", "WELBECK EMERGENCY EXIT", "WELLESLEY STATION", "WELLSLEY STATION", "WILSON HOSLTER", "WILSON HOSTLER", "WILSON STATION", "WILSON TO EGLINTON", "WILSON YARD", "WOODBINE STATION", "YONGE BD STATION", "YONGE SHP STATION", "YONGE SHP STATION (LEA", "YONGE UNIVERSITY LINE", "YORK MILLS STATION", "YORK UNIVERSITY STATIO", "YORKDALE STATION", "YUS/BD/SHEPPARD SUBWAY"], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}]}';
  //scoring_url = "https://us-south.ml.cloud.ibm.com/v4/deployments/c431395c-4b07-4569-bfcc-72ce3425c46b/predictions";

  // Example of calling the API
  /*
  const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

function apiPost(scoring_url, token, mlInstanceID, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("ML-Instance-ID", mlInstanceID);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

// NOTE: generate iam_token based on provided documentation
const wmlToken = "Bearer " + iam_token;

// NOTE: retrieve ml_instance_id based on provided documentation
const mlInstanceId = ml_instance_id;

// NOTE: manually define and pass the array(s) of values to be scored in the next line
const payload = '{"input_data": [{"fields": ["Time", "Bound", "Line", "Month", "DayOfMonth", "Friday", "Monday", "Saturday", "Sunday", "Thursday", "Tuesday", "Wednesday", "ATC FAILURE", "BATHURST STATION", "BAY LOWER", "BAY LOWER STATION", "BAY STATION", "BAYVIEW STATION", "BESSARIAN STATION", "BESSARION STATION", "BLOOR DANFORTH SUBWAY", "BLOOR STATION", "BROADVIEW STATION", "CASTLE FRANK STATION", "CASTLE FRANK TO SHERBO", "CHESTER STATION", "CHRISTIE STATION", "COLLEGE STATION", "COXWELL STATION", "DAVISVILLE BUILD UP", "DAVISVILLE HOSTLER", "DAVISVILLE STATION", "DAVISVILLE YARD", "DON MILLS STATION", "DONLANDS STATION", "DOWNSVIEW PARK STATION", "DUFFERIN STATION", "DUFFERIN TO LANSDOWNE", "DUNDAS STATION", "DUNDAS WEST STATION", "DUPONT STATION", "EGLINTON STATION", "EGLINTON WEST STATION", "EGLINTON WEST TO VMC", "ELLESMERE STATION", "FINCH STATION", "FINCH TO UNION STATION", "FINCH WEST STATION", "GLENCAIRN STATION", "GLENCAIRN TO ST GEORGE", "GREENWOOD PORTAL", "GREENWOOD STATION", "GREENWOOD WYE", "GREENWOOD WYE (ENTERI", "GREENWOOD YARD", "HIGH PARK STATION", "HIGHWAY 407 STATION", "ISLINGTON STATION", "JANE STATION", "KEELE STATION", "KEELE TO DUNDAS WEST", "KEELE YARD", "KENNEDY - MCCOWAN", "KENNEDY BD STATION", "KENNEDY SRT STATION", "KENNEDY STATION TO KIP", "KING STATION", "KING STATION TO UNION", "KING TO UNION", "KIPLING STATION", "KIPLING STATION TO KEN", "KIPLING TO ROYAL YORK", "LANSDOWNE STATION", "LAWRENCE EAST STATION", "LAWRENCE EAST TO ELLES", "LAWRENCE STATION", "LAWRENCE TO EGLINTON S", "LAWRENCE WEST STATION", "LEAVING LAWRENCE EAST", "LEAVING YONGE/SHEPPARD", "LESLIE STATION", "LESLIE STATION(APPROAC", "MAIN STREET STATION", "MCBRIEN BUILDING", "MCCOWAN STATION", "MCCOWAN TO KENNEDY STA", "MCCOWAN YARD", "MIDLAND STATION", "MUSEUM STATION", "NORTH YORK CTR STATION", "OLD MILL STATION", "OLD MILL TO ISLINGTON", "OSGOODE POCKET", "OSGOODE STATION", "OSSINGTON AND DUFFERIN", "OSSINGTON STATION", "PAPE STATION", "PIONEER VILLAGE STATIO", "QUEEN STATION", "QUEEN'S PARK STATION", "ROSEDALE STATION", "ROYAL YORK STATION", "RUNNYMEDE STATION", "SCARB CTR STATION", "SCARBOROUGH RAPID TRAN", "SEHPPARD STATION", "SHEPPARD LINE", "SHEPPARD STATION", "SHEPPARD WEST MIGRATI", "SHEPPARD WEST MIGRATIO", "SHEPPARD WEST PORTAL", "SHEPPARD WEST STATION", "SHEPPARD WEST TO WILSO", "SHEPPARD YONGE", "SHEPPARD YONGE STATION", "SHERBOURNE STATION", "SOUTH OF LAWRENCE SRT", "SOUTH OF MIDLAND SRT", "SPADINA BD STATION", "SPADINA STATION", "SPADINA YUS STATION", "SRT LINE", "ST ANDREW STATION", "ST CLAIR STATION", "ST CLAIR WEST STATION", "ST CLAIR WEST TO DUPON", "ST CLAIR WEST TO EGLIN", "ST GEORGE BD STATION", "ST GEORGE YUS STATION", "ST PATRICK STATION", "SUMMERHILL STATION", "SYSTEM WIDE", "TRANSIT CONTROL CENTRE", "TYSSE LINE", "UNION (TO ST ANDREW)", "UNION STATION", "UNION STATION TO FINCH", "UNION STATION TO KING", "UNION STATION TO ST AN", "UNION TO KING STATION", "UNION TO ST ANDREW", "UNION TO ST GEORGE", "VAUGHAN MC STATION", "VICTORIA PARK STATION", "VMC TO SHEPPARD WEST", "WARDEN STATION", "WARDEN TO KENNEDY STAT", "WELBECK EMERGENCY EXIT", "WELLESLEY STATION", "WELLSLEY STATION", "WILSON HOSLTER", "WILSON HOSTLER", "WILSON STATION", "WILSON TO EGLINTON", "WILSON YARD", "WOODBINE STATION", "YONGE BD STATION", "YONGE SHP STATION", "YONGE SHP STATION (LEA", "YONGE UNIVERSITY LINE", "YORK MILLS STATION", "YORK UNIVERSITY STATIO", "YORKDALE STATION", "YUS/BD/SHEPPARD SUBWAY"], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}]}';
const scoring_url = "https://us-south.ml.cloud.ibm.com/v4/deployments/c431395c-4b07-4569-bfcc-72ce3425c46b/predictions";

apiPost(scoring_url, wmlToken, mlInstanceId, payload, function (resp) {
	let parsedPostResponse;
	try {
		parsedPostResponse = JSON.parse(this.responseText);
	} catch (ex) {
		// TODO: handle parsing exception
	}
	console.log("Scoring response");
	console.log(parsedPostResponse);
}, function (error) {
	console.log(error);
});
   */
}
