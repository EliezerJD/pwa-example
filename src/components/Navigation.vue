<template>
  <div class="home">
  	<div class="navbarr">
  		<div class="logo">
  			<img src="../assets/insta.png" class="mainLogo">
  		</div>
  		<div class="info">
				<div class="todosUno">
					<button @click="home" class="btn"><i class="fa fa-home fa-4x" aria-hidden="true"></i></button>
				</div>
				<div class="todosDos">
					<button class="btn" data-toggle="dropdown"><i class="fa fa-user-o fa-3x" aria-hidden="true"></i></button>
					<div class="dropdown-menu" aria-labelledby="uno">
				    	<li><a @click="profile" class="dropdown-item">Mi perfil</a></li>
				    	<li><a @click="followers" class="dropdown-item">Seguidores</a></li>
					</div>
				</div>
					
				<div class="todosTres">
  					<button class="btn" data-toggle="dropdown" id="dos"><i class="fa fa-cog fa-4x" aria-hidden="true"></i></button>
					<div class="dropdown-menu" aria-labelledby="dos">
						<li><a @click="logout" class="dropdown-item">Cerrar Sesión</a></li>
					</div>
				</div>
		</div>

  	</div>
  		
  </div>
    <!--<input @click="logout" value="Cerrar Sesión" type="submit" class="form-control btn btn-primary" />-->
    
    	
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import router from '../router'
export default {
	data () {
	    return {
	      username: ''
	    }
    },
	methods: {
    logout: function() {
      var temp4:any = localStorage.getItem("token");
      localStorage.clear();
      localStorage.setItem("token", temp4);
      router.push('/login')
    },
    home: function() {
      router.push('home')
    },
    profile: function() {
      router.push('profile')
    },
    followers: function() {
      router.push('followers')
    },
  },
  created() {

  },
  
}

</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');

	.home{
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 75px;
	}
	.navbarr{
		background-color: white;
		grid-column: 1/1;
		grid-row: 1/1;
		display: grid;
		grid-template-columns: 2fr 2fr 4fr;
		grid-template-rows: 1fr 1fr 1fr;
		justify-items: center;
	}
	.info{
		grid-column: 3/3;
		grid-row: 2/2;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
	}
	.logo{
		margin-top: 4px;
		margin-left: 200px;
		grid-column: 1/1;
		grid-row: 2/2;
	}
	.mainLogo{
		margin-top: 11px;
	    height: 56px;
	    width: 182px;
	}
	.todosUno{
		margin-top: 5px;
		grid-column: 1/1;
		grid-row: 1/1;
	}
	.todosDos{
		grid-column: 2/2;
		grid-row: 1/1;
		margin-top: 12px;
	}
	.todosTres{
		margin-top: 5px;
		grid-column: 3/3;
		grid-row: 1/1;
		margin-left: -10px;
	}
</style>
