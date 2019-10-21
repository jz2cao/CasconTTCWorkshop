import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent, MatAutocompleteSelectedEvent } from "@angular/material";
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
  stationOptions: string[] = ['SHEPPARD WEST STATION', 'MUSEUM STATION', 'KIPLING STATION',
  'COLLEGE STATION', 'WARDEN STATION', 'WILSON YARD',
  'DONLANDS STATION', 'KEELE STATION', 'KENNEDY BD STATION',
  'KENNEDY SRT STATION', 'VICTORIA PARK STATION', 'OLD MILL STATION',
  'DAVISVILLE STATION', 'EGLINTON WEST STATION',
  'ROYAL YORK STATION', 'CHESTER STATION', 'COXWELL STATION',
  'ST GEORGE BD STATION', 'SHERBOURNE STATION', 'EGLINTON STATION',
  'PAPE STATION', 'BLOOR STATION', 'ST PATRICK STATION',
  'CHRISTIE STATION', 'LAWRENCE EAST STATION', 'UNION STATION',
  'MCCOWAN STATION', 'YORK MILLS STATION', 'HIGH PARK STATION',
  'FINCH STATION', 'LESLIE STATION', 'GREENWOOD STATION',
  'KING STATION', 'WILSON STATION', 'VAUGHAN MC STATION',
  'MAIN STREET STATION', 'LAWRENCE STATION', 'QUEEN’S PARK STATION',
  'JANE STATION', 'DUNDAS STATION', 'ST GEORGE YUS STATION',
  'FINCH WEST STATION', 'DAVISVILLE YARD', 'ISLINGTON STATION',
  'YONGE SHP STATION', 'YORKDALE STATION', 'WOODBINE STATION',
  'ST CLAIR STATION', 'SHEPPARD STATION', 'ROSEDALE STATION',
  'BAY STATION', 'BAYVIEW STATION', 'BATHURST STATION',
  'MIDLAND STATION', 'DUPONT STATION', 'WELLESLEY STATION',
  'SUMMERHILL STATION', 'LAWRENCE WEST STATION',
  'SPADINA YUS STATION', 'BROADVIEW STATION',
  'ST CLAIR WEST STATION', 'SPADINA BD STATION', 'DUFFERIN STATION',
  'ELLESMERE STATION', 'DOWNSVIEW PARK STATION', 'OSSINGTON STATION',
  'CASTLE FRANK STATION', 'YONGE BD STATION', 'DUNDAS WEST STATION',
  'GLENCAIRN STATION', 'HIGHWAY 407 STATION',
  'PIONEER VILLAGE STATIO', 'KIPLING STATION TO KEN',
  'KENNEDY STATION TO KIP', 'NORTH YORK CTR STATION',
  'LANSDOWNE STATION', 'QUEEN STATION', 'YONGE UNIVERSITY LINE',
  'BLOOR DANFORTH SUBWAY', 'ST ANDREW STATION', 'OSGOODE STATION',
  'DON MILLS STATION', 'TYSSE LINE', 'SCARB CTR STATION',
  'GREENWOOD YARD', 'DAVISVILLE HOSTLER', 'SHEPPARD WEST MIGRATI',
  'RUNNYMEDE STATION', 'UNION TO ST GEORGE',
  'LAWRENCE EAST TO ELLES', 'BAY LOWER', 'EGLINTON WEST TO VMC',
  'WARDEN TO KENNEDY STAT', 'MCCOWAN YARD', 'BESSARION STATION',
  'UNION STATION TO FINCH', 'OSSINGTON AND DUFFERIN',
  'LEAVING LAWRENCE EAST', 'MCCOWAN TO KENNEDY STA',
  'SEHPPARD STATION', 'GREENWOOD PORTAL', 'YORK UNIVERSITY STATIO',
  'DUFFERIN TO LANSDOWNE', 'WILSON HOSTLER', 'WILSON TO EGLINTON',
  'SHEPPARD WEST PORTAL', 'GREENWOOD WYE', 'KEELE YARD',
  'TRANSIT CONTROL CENTRE', 'KING STATION TO UNION',
  'LEAVING YONGE/SHEPPARD', 'GLENCAIRN TO ST GEORGE',
  'ST CLAIR WEST TO EGLIN', 'SHEPPARD WEST MIGRATIO',
  'ST CLAIR WEST TO DUPON', 'OLD MILL TO ISLINGTON', 'SRT LINE',
  'KIPLING TO ROYAL YORK', 'SHEPPARD LINE', 'KING TO UNION',
  'LESLIE STATION(APPROAC', 'OSGOODE POCKET', 'UNION TO ST ANDREW',
  'YONGE SHP STATION (LEA', 'GREENWOOD WYE (ENTERI',
  'YUS/BD/SHEPPARD SUBWAY', 'VMC TO SHEPPARD WEST', 'ATC FAILURE',
  'SYSTEM WIDE', 'WELLSLEY STATION', 'WILSON HOSLTER',
  'SHEPPARD YONGE STATION', 'UNION STATION TO KING',
  'SHEPPARD WEST TO WILSO', 'SPADINA STATION',
  'UNION STATION TO ST AN', 'KEELE TO DUNDAS WEST',
  'SOUTH OF LAWRENCE SRT', 'SOUTH OF MIDLAND SRT',
  'DAVISVILLE BUILD UP', 'WELBECK EMERGENCY EXIT',
  'UNION TO KING STATION', 'UNION (TO ST ANDREW)',
  'MCBRIEN BUILDING', 'BESSARIAN STATION', 'KENNEDY - MCCOWAN',
  'CASTLE FRANK TO SHERBO', 'LAWRENCE TO EGLINTON S',
  'FINCH TO UNION STATION', 'SCARBOROUGH RAPID TRAN',
  'BAY LOWER STATION', 'SHEPPARD YONGE'];

  lineOptions: string[] = ["Bloor-Danforth", "Sheppard", "Scarborough", "Yonge-University"];
  // lineOptions: string[] = ['BD', 'SHP', 'SRT', 'YU'];
  directionOptions: string[] = ['North', 'South', 'West', 'East'];
  chosenDirection: string;
  chosenLine: string;
  chosenStation: string;
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  cloudApiKey = "b2L1liMCcap6dKPMj_jKlrpe1-Ix5vGbxbSZ3MQKKuaP";
  mlInstanceID = "bf7eada0-e2c4-4f19-9339-bd5f69ec38de";
  selectedDate = {};
  selectedStation = "";
  selectedTravelTime = null;
  outputValue = "0";
  bodyData = {"input_data":[
    {"fields":["Time","Bound","Line","Month","DayOfMonth","Friday","Monday","Saturday","Sunday","Thursday","Tuesday","Wednesday","ATC FAILURE","BATHURST STATION","BAY LOWER","BAY LOWER STATION","BAY STATION","BAYVIEW STATION","BESSARIAN STATION","BESSARION STATION","BLOOR DANFORTH SUBWAY","BLOOR STATION","BROADVIEW STATION","CASTLE FRANK STATION","CASTLE FRANK TO SHERBO","CHESTER STATION","CHRISTIE STATION","COLLEGE STATION","COXWELL STATION","DAVISVILLE BUILD UP","DAVISVILLE HOSTLER","DAVISVILLE STATION","DAVISVILLE YARD","DON MILLS STATION","DONLANDS STATION","DOWNSVIEW PARK STATION","DUFFERIN STATION","DUFFERIN TO LANSDOWNE","DUNDAS STATION","DUNDAS WEST STATION","DUPONT STATION","EGLINTON STATION","EGLINTON WEST STATION","EGLINTON WEST TO VMC","ELLESMERE STATION","FINCH STATION","FINCH TO UNION STATION","FINCH WEST STATION","GLENCAIRN STATION","GLENCAIRN TO ST GEORGE","GREENWOOD PORTAL","GREENWOOD STATION","GREENWOOD WYE","GREENWOOD WYE (ENTERI","GREENWOOD YARD","HIGH PARK STATION","HIGHWAY 407 STATION","ISLINGTON STATION","JANE STATION","KEELE STATION","KEELE TO DUNDAS WEST","KEELE YARD","KENNEDY - MCCOWAN","KENNEDY BD STATION","KENNEDY SRT STATION","KENNEDY STATION TO KIP","KING STATION","KING STATION TO UNION","KING TO UNION","KIPLING STATION","KIPLING STATION TO KEN","KIPLING TO ROYAL YORK","LANSDOWNE STATION","LAWRENCE EAST STATION","LAWRENCE EAST TO ELLES","LAWRENCE STATION","LAWRENCE TO EGLINTON S","LAWRENCE WEST STATION","LEAVING LAWRENCE EAST","LEAVING YONGE/SHEPPARD","LESLIE STATION","LESLIE STATION(APPROAC","MAIN STREET STATION","MCBRIEN BUILDING","MCCOWAN STATION","MCCOWAN TO KENNEDY STA","MCCOWAN YARD","MIDLAND STATION","MUSEUM STATION","NORTH YORK CTR STATION","OLD MILL STATION","OLD MILL TO ISLINGTON","OSGOODE POCKET","OSGOODE STATION","OSSINGTON AND DUFFERIN","OSSINGTON STATION","PAPE STATION","PIONEER VILLAGE STATIO","QUEEN STATION","QUEEN'S PARK STATION","ROSEDALE STATION","ROYAL YORK STATION","RUNNYMEDE STATION","SCARB CTR STATION","SCARBOROUGH RAPID TRAN","SEHPPARD STATION","SHEPPARD LINE","SHEPPARD STATION","SHEPPARD WEST MIGRATI","SHEPPARD WEST MIGRATIO","SHEPPARD WEST PORTAL","SHEPPARD WEST STATION","SHEPPARD WEST TO WILSO","SHEPPARD YONGE","SHEPPARD YONGE STATION","SHERBOURNE STATION","SOUTH OF LAWRENCE SRT","SOUTH OF MIDLAND SRT","SPADINA BD STATION","SPADINA STATION","SPADINA YUS STATION","SRT LINE","ST ANDREW STATION","ST CLAIR STATION","ST CLAIR WEST STATION","ST CLAIR WEST TO DUPON","ST CLAIR WEST TO EGLIN","ST GEORGE BD STATION","ST GEORGE YUS STATION","ST PATRICK STATION","SUMMERHILL STATION","SYSTEM WIDE","TRANSIT CONTROL CENTRE","TYSSE LINE","UNION (TO ST ANDREW)","UNION STATION","UNION STATION TO FINCH","UNION STATION TO KING","UNION STATION TO ST AN","UNION TO KING STATION","UNION TO ST ANDREW","UNION TO ST GEORGE","VAUGHAN MC STATION","VICTORIA PARK STATION","VMC TO SHEPPARD WEST","WARDEN STATION","WARDEN TO KENNEDY STAT","WELBECK EMERGENCY EXIT","WELLESLEY STATION","WELLSLEY STATION","WILSON HOSLTER","WILSON HOSTLER","WILSON STATION","WILSON TO EGLINTON","WILSON YARD","WOODBINE STATION","YONGE BD STATION","YONGE SHP STATION","YONGE SHP STATION (LEA","YONGE UNIVERSITY LINE","YORK MILLS STATION","YORK UNIVERSITY STATIO","YORKDALE STATION","YUS/BD/SHEPPARD SUBWAY"],
      "values":[["12:23","S","YUS","11","23","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]]
    }]}

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

    return this.stationOptions.filter(option => option.toLowerCase().startsWith(filterValue));
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = new Date(event.value);
    this.selectedDate = {
      month: date.getMonth() + 1, // somehow month has value less than 1;
      dayofMonth: date.getDate()
    }
  }

  onTraveltimeChange(event: any) {
    this.selectedTravelTime = event.target.value;
    console.log(event.target.value);
  }

  onStartStationChange(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.selectedStation = event.option.value;
    
  }

  onBoundChange(event: any) {
    console.log(this.chosenDirection);
  }

  _getBound(){
    switch (this.chosenDirection) {
      case "North" : {
        return "n";
      }
      case "South" : {
        return "s";
      }
      case "West": {
        return "w";
      }
      case "East": {
        return "e";
      }
      default: {
        return "n";
      }
    }
  }

  _getLine() {
    switch (this.chosenLine) {
      case "Bloor-Danforth": {
        return "BD";
      }
      case "Sheppard": {
        return "SHP";
      }
      case "Scarborough": {
        return "SRT";
      }
      case "Yonge-University": {
        return "YU";
      }
    }
  }

  _getDay() {
    // initial value
    const dayArray = new Array(7).fill(0);

    const day = this.selectedDate["day"];
    dayArray[day - 1] = 1;
    return dayArray;
  }

  _getStation() {
    const stationArray = new Array(this.stationOptions.length).fill(0);
    const selectedIndex = this.stationOptions.indexOf(this.selectedStation);
    if(selectedIndex !== -1) {
      stationArray[selectedIndex] = 1;
    }
    return stationArray;
  }

  performPrediction() {
    // getting iam token
    const predictionValue = [];
    let valueSet = [];

    // get the time:
    valueSet.push(this.selectedTravelTime);

    // get the bound
    valueSet.push(this._getBound());

    // get the Line
    valueSet.push(this._getLine());

    // get date month
    valueSet.push(this.selectedDate["month"]);
    valueSet.push(this.selectedDate["dayofMonth"]);

    valueSet = valueSet.concat(this._getDay());

    valueSet = valueSet.concat(this._getStation());

    predictionValue.push(valueSet);
    this.bodyData.input_data[0].values = predictionValue;

    console.log("prediction value");
    console.log(predictionValue);


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
        const predictionUrl = "https://us-south.ml.cloud.ibm.com/v4/deployments/c352c820-51ac-4bdc-9b2e-d440fa090592/predictions";

        this.httpClient.post(proxyurl + predictionUrl,
          this.bodyData,
            { headers: new HttpHeaders()
                      .set("Content-Type", "application/javascript")
                      .set("Accept", "application/json")
                      .set("Authorization", `Bearer ${bearerToken}`)
                      .set("ML-Instance-ID", "bf7eada0-e2c4-4f19-9339-bd5f69ec38de")
            }
        )
        .subscribe(
          data => {
            console.log("prediction successful", data);
            const result = data["predictions"][0].values[0];
            this.outputValue = parseFloat(result).toFixed(2);
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
}
