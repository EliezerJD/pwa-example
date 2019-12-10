<template>
  <div class="layout">
    <div class="windowOne">
      <img src="../assets/insta.png" class="mainLogo">
      <input v-model="email"  type="text" class="form-control us" placeholder="Correo electrónico" />
      <input v-model="password"  type="password" class="form-control pa" placeholder="Contraseña" />
      <input @click="login" value="Iniciar Sesión" type="submit" class="form-control btn btn-primary ok" />
      <hr class="hr1">
      <hr class="hr2">
      <div class="o">o</div>
      <div class="facebooklog">
       <i class="fa fa-facebook-official"></i> Iniciar sesión con Face
      </div>
      <div class="recover">
        ¿Olvidaste tu contraseña?
      </div>
    </div>
    <div class="windowTwo">
      <div class="texto">
        ¿No tienes una cuenta? <a href="" @click="registerPage"> Registrate</a>
      </div>
    </div>
    <div class="apps">
      <img src="../assets/apps.png" class="appslogo">
    </div>
  </div>
</template>

<script>
require('material-design-lite')
import firebase from 'firebase';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert("Logueado");
          localStorage.setItem("id", firebase.auth().currentUser.uid);
          console.log(localStorage.getItem("token"));
          firebase.database().ref("tokens_nav/"+localStorage.getItem("id")).set({
                token: localStorage.getItem("token"),
          });
          this.$router.replace('home')
        },
        (error) => {
          alert("Error");
          console.log(error.message);
        }
      );
    },
    registerPage: function() {
      this.$router.replace('register')
    },
    init(){
      if (localStorage.getItem("id") != null) {
        this.$router.replace('home')
      }else{

      }
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

  body {
      background-color: rgba(249,249,249,1);
      width: 100%;
      height: 100%;
  }
  .layout{
    display: grid;
    grid-template-rows: 10px 385px 8px 65px 12px 87px;
    grid-template-columns: repeat(40, 1fr);
  }
  .windowOne{
    background-color: white;
    grid-row: 2/2;
    grid-column: 16/26;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(230,230,230);
    display: grid;
    grid-template-columns: 100px 140px 100px;
    grid-template-rows: repeat(20, 1fr);
    justify-items: center;
  }
  .windowTwo{
    background-color: white;
    grid-row: 4/4;
    grid-column: 16/26;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(230,230,230);
  }
  .mainLogo{
    height: 56px;
    width: 182px;
    grid-column: 2/2;
    grid-row: 3/3;
  }
  .us{
    grid-row: 7/7;
    grid-column: 2/2;
    width: 270px;
    background-color: rgba(249,249,249,1);
  }
  .pa{
    margin-top: 5px;
    grid-column: 2/2;
    grid-row: 8/9;
    width: 270px;
    background-color: rgba(249,249,249,1);
  }
  .ok{
    grid-row: 10/10;
    grid-column: 2/2;
    width: 270px;
  }
  .texto{
    font-size: 17px;
    margin-top: 20px;
    text-align: center;
  }
  a:link{
    color: rgb(0,146,248);
    text-decoration: none;
  }
  .hr1{
    grid-column: 1/1;
    grid-row: 12/12;
    border-width: 1px;
    width: 100px;
    margin-left: 75px;
  }
  .o{
    margin-top: 3px;
    grid-row: 12/12;
    grid-column: 2/2;
    color: gray;
    font-size: 18px;
  }
  .hr2{
    grid-column: 3/3;
    grid-row: 12/12;
    border-width: 1px;
    width: 100px;
    margin-right: 75px;
  }
  .facebooklog{
    text-align: center;
    grid-column: 2/2;
    grid-row: 14/14;
    font-size: 14px;
    white-space: nowrap;
    font-weight: bold;
    color: rgb(51,77,137);
  }
  .recover{
    text-align: center;
    grid-column: 2/2;
    grid-row: 17/17;
    font-size: 12px;
    white-space: nowrap;
    color: rgb(0,49,109);
  }
  .apps{
    grid-row: 6/6;
    grid-column: 16/26;
  }
  .appslogo{
    width: 351px;
    height: 87px;
  }

</style>