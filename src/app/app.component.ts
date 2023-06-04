import { Component,OnInit } from '@angular/core';
import { WeatherService } from 'src/services/weather/weather.service';
import { RootWeather } from './Models/weather.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootLocation } from './Models/location'
import { LocationService } from 'src/services/Location/location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'weather-app';
  cityName:string='';
  iconId?:string="03d";
  
 

  

  imageUrl?:string=`https://openweathermap.org/img/wn/${this.iconId}@2x.png`;

  weatherData?:RootWeather;

  lat:number=30.044420;
  lon:number=31.235712;
  constructor(private weatherSer:WeatherService,private locationServ:LocationService,
    private _snackBar: MatSnackBar
    ) {
    
   
  }
  ngOnInit(): void {
    
    this.getLatAndLon();
    this.getWeatheData();  
   
  }


 

   getWeatheData(){

     this.weatherSer.getWeatherData(this.lat,this.lon).subscribe(
       (data)=>{
      
         this.weatherData=data;
        this.imageUrl=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
         

         
       }
     );
    
  }

  getLatAndLon(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data)=>{
        this.lat=data.coords.latitude;
        this.lon=data.coords.longitude;
        this.getWeatheData();
      }
      )
    
    } 

    else { 
     this._snackBar.open(`can't find the location.`,'ok');
   
    }
   
  }

  

  search(){
     
    this.locationServ.getLocationData(this.cityName).subscribe(result=>{
     
      if(result.length>0){
       
        this.weatherSer.getWeatherData(result[0].lat,result[0].lon).subscribe(
          (data)=>{
         
            this.weatherData=data;
           this.imageUrl=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          
            
          }
        );

        
        
        
      }
      else{
        this._snackBar.open(`can't find city !`,'ok');

        
      }

     

     
     
      
    });
   }
    

  
}
