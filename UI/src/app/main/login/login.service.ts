import { Injectable, NgZone } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private zone: NgZone) { }
 // constructor(private zone: NgZone) { }
/*
  loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.zone.run(() => {
               gapi.load('auth2', {
                   callback: resolve,
                   onerror: reject,
                   timeout: 1000, // 5 seconds.
                   ontimeout: reject
               });
        });
   });
  }

  initClient(): Promise<any> {
    var API_KEY = '504282615568-dmai2kmd8f7rghaurl3ujppseedvu9vs.apps.googleusercontent.com'// Your API key.
    var DISCOVERY_DOC = 'YpH4KzGBBfga5rNeaHpwD7nJ'// Your discovery doc URL.
    var initObj = {
        'client_id': API_KEY,
        'client_secret': DISCOVERY_DOC,
    };

    return new Promise((resolve, reject) => {
        this.zone.run(() => {
            gapi.client.init(initObj).then(resolve, reject);
        });
    });
  }*/
}