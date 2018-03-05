const packageJson = require('../../package.json');

export const environment = {
  appName: 'BooksGames-Br',
  envName: 'DEV',
  production: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  firebaseConfigs : {
    apiKey: "AIzaSyBx9iUZTB1eBnAapZwF8C_fpAocqKE0nzs",
    authDomain: "booksgames-br.firebaseapp.com",
    databaseURL: "https://booksgames-br.firebaseio.com",
    projectId: "booksgames-br",
    storageBucket: "booksgames-br.appspot.com",
    messagingSenderId: "498253610795"
  },
  googleMapsKey: 'AIzaSyCktXSNqWz_UBK4ly8tD0OgpZUHaJ4NjVQ'
};

