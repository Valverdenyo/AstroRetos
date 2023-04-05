/**
* This file can be replaced during build by using the `fileReplacements` array.
*`ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
* The list of file replacements can be found in `angular.json`.
*/
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyATL9Wb8BZ5htLOS4Vy_eEIEvXJ5DlrCI4",
    authDomain: "astroretos-db.firebaseapp.com",
    projectId: "astroretos-db",
    storageBucket: "astroretos-db.appspot.com",
    messagingSenderId: "49988289409",
    appId: "1:49988289409:web:134b5a76a7893164751e80",
    measurementId: "G-QCJVPE1F4N"
  },
  news: {
    apiKey: '392c4ef2447040d1aab42bffac29c335',
    apiUrl: 'https://newsapi.org/v2'
  }
};

/**
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
