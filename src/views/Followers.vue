<template>
  <div id="app">
    <Navigation/>
	<div class="layout2">
		<div class="seguidores">
			<h3>Mis Seguidores</h3>
			<hr class="hr">
			<div class="lista-seguidores" id="lista-seguidores">

			</div>
		</div>
		<div class="siguiendo">
			<h3>Siguiendo</h3>
			<hr class="hr">
			<div class="lista-seguidos" id="lista-seguidos">
				
			</div>
		</div>
	</div>
  	</div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import firebase from 'firebase';
import router from '../router.ts'
export default {
	data () {
	    return {
	    	
	    }
  	},
	components: {
        Navigation
    },
    methods: {
    	init: function() {
    		var arrayFollowersF = [];
    		var arrayFollowers2F = [];
    		var arrayUsuariosF = [];
    		var arrayUsuarios2F = [];
    		var x=0;
    		firebase.database().ref("followers/").orderByValue().on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					arrayFollowersF[x] = data.val().idSeguido;
					arrayFollowers2F[x] = data.val().idSeguidor;
					x++;
				});
			});
			x=0;
			firebase.database().ref("usuarios/").orderByValue().on("value", function(snapshot2) {
				snapshot2.forEach(function(data2) {
					arrayUsuariosF [x] = data2.val().uid;
					arrayUsuarios2F [x] = data2.val().username;
					x++;
				});
			});
			setTimeout(function(){
				var src = document.getElementById("lista-seguidores");
				var src2 = document.getElementById("lista-seguidos");
	      		for(x=0; x<arrayFollowersF.length; x++){
	      			if(arrayFollowersF[x]==localStorage.getItem("id")){
	      				var aux2 = buscarId(arrayFollowers2F[x], arrayUsuariosF);
	      				if(aux2!=-1){
	      					var a = document.createElement("a");
	      					var br = document.createElement("br");
	      					var br2 = document.createElement("br");
	      					a.appendChild(document.createTextNode("- "+arrayUsuarios2F[aux2]));
	      					src.appendChild(a);
	      					src.appendChild(br);
	      					src.appendChild(br2);
	      				}
	      			}
	      			if(arrayFollowers2F[x]==localStorage.getItem("id")){
	      				var aux3 = buscarId(arrayFollowersF[x], arrayUsuariosF);
	      				if(aux3!=-1){
	      					var xd = document.createElement("a");
	      					var xd2 = document.createElement("br");
	      					var xd3 = document.createElement("br");
	      					xd.appendChild(document.createTextNode("- "+arrayUsuarios2F[aux3]));
	      					src2.appendChild(xd);
	      					src2.appendChild(xd2);
	      					src2.appendChild(xd3);
	      				}
	      			}
	      		}

      		}, 1300);
      	},
    },
    mounted() {
    	this.init();
 	},
}
function buscarId(cadena1, array){
	var y=0;
	for(y=0; y<array.length;y++){
		//console.log(arrayUsuariosF[y] + " == " + cadena1);
		if(array[y]==cadena1){
			return y;
		}
	}
	return -1;
}
</script>
<style>
.layout2{
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 526px;
}
.seguidores{
	text-align: center;
	grid-column: 1/1;
	border-style: none;
	display: grid;
	grid-template-rows: 20px 10px 10px;
	justify-items: center;
}
.siguiendo{
	text-align: center;
	grid-column: 2/2;
	display: grid;
	border-top: none;
	border-bottom: none;
	border-left: 1px solid;
	border-right: none;
	grid-template-rows: 20px 10px 10px;
	justify-items: center;
}
.lista-seguidores{
	grid-row: 3/3;
	margin-top: 70px;
}
.lista-seguidores a{
	font-size: 25px;
}
.lista-seguidos{
	grid-row: 3/3;
	margin-top: 70px;
}
.lista-seguidos a{
	font-size: 25px;
}
.hr{
	margin-top: 55px;
	grid-row: 2/2;
	width: 350px;
	text-align: center;
	color: black;
	border: 0.1px solid black;
	background-color: black;
}
</style>
