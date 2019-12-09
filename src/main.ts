import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import * as firebase from 'firebase';
import '@firebase/messaging';


Vue.config.productionTip = false;

const config= {
	apiKey: "AIzaSyANdWe9OiE341F3bsJzyxg6WWwCL45l6ek",
    authDomain: "pwa-example-a3809.firebaseapp.com",
    databaseURL: "https://pwa-example-a3809.firebaseio.com",
    projectId: "pwa-example-a3809",
    storageBucket: "gs://pwa-example-a3809.appspot.com/",
    messagingSenderId: "554748748763",
    appId: "1:554748748763:web:ef3aa560b6afc6ae7cfdfe"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BH_9t-HQ8APkLUgAg0HePfI7wVm2WGjI7BKvSC4Taket2j26EXBdpUcmdeMpbSj2A3mKAg5kGWmJtb2JrpgM-5Y");
messaging.requestPermission().then(() => {
    
    messaging.getToken().then((token) => {
      var token_temp:any = token;
      localStorage.setItem("token",token_temp);
      console.log(token_temp);
      
    });
}).catch((err) => {
    console.log('Unable to get permission to notify', err);
});




new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
