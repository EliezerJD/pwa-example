<template>
  <div id="app">
    <Navigation/>
    
    <div class="imagenes2" id="imagenes2">
  			
  			
  	</div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import firebase from 'firebase';
import router from '../router.ts'
import axios from 'axios';
export default {
	data () {
	    return {
	    	
	    }
  	},
	components: {
        Navigation
    },
    methods: {
    	init(){

    		if (localStorage.getItem("id") == null) {
		        this.$router.replace('login')
		    }
		    console.log("Yo: " + localStorage.getItem("id"));
	    	var arrayUrl = [];
    		var arrayId = [];
    		var arrayDesc = [];
    		var x=0;
    		firebase.database().ref("lasImg/").orderByValue().on("value", function(snapshot) {
				snapshot.forEach(function(data) {
					arrayUrl[x] = data.val().lasturl;
					arrayId[x] = data.val().userId;
					arrayDesc[x] = data.val().description;
					x++;
			    });
			});
			this.listarFotos(arrayUrl, arrayId, arrayDesc);
	    },
	    listarFotos(arrayUrl, arrayId, arrayDesc){
			var x=0;
			var z=0;
			var temp;
			var arraySeguido=[];
			var arraySeguidor=[];
			var arrayData=[];
			setTimeout(function(){
		    	firebase.database().ref("followers/").orderByValue().on("value", function(snapshot3) {
						snapshot3.forEach(function(data3) {
							arraySeguido[x]=data3.val().idSeguido;
							arraySeguidor[x]=data3.val().idSeguidor;
							arrayData[x]=data3.key;
							x++;
					});
				});
		    	for(x=arrayUrl.length-1; x>=0;x--){
		    		if(arrayId[x]!=localStorage.getItem("id")){
		    			var boton = document.createElement("button");
		    			var desc = document.createElement("a");
		    			var img = document.createElement("img"); 
		    			img.src = arrayUrl[x];
		    			desc.classList.add("desc2");
		    			desc.appendChild(document.createTextNode(arrayDesc[x]));
		    			var src = document.getElementById("imagenes2");
		    			var index = buscarEnArray(arrayId[x], localStorage.getItem("id"), arraySeguido, arraySeguidor);
		    			boton.id=x;
		    			if(index!=-1){
		    				boton.id = index;
		    				boton.classList.add("btn-followed");
		    				boton.appendChild(document.createTextNode("Siguiendo"));
		    				boton.onclick = function(){
		    					var string = arrayData[this.id];
								const userRef2 = firebase.database().ref("followers/").child(string);
    							userRef2.remove();
    							router.replace('login');
							}	
		    			}else{
		    				boton.classList.add("btn-follow");
		    				boton.appendChild(document.createTextNode("Seguir"));
		    				boton.onclick = function(){
		    					var tempIndex = this.id;
								firebase.database().ref(`followers/activity-${new Date().getTime()}`).set({
									idSeguidor: localStorage.getItem("id"),
									idSeguido: arrayId[tempIndex],
								});
								firebase.database().ref("tokens_nav/").orderByValue().on("value", function(snapshot9) {
									snapshot9.forEach(function(data9) {
										if(data9.key==arrayId[tempIndex]){
											firebase.database().ref("usuarios/").orderByValue().on("value", function(snapshot10) {
												snapshot10.forEach(function(data10) {
													console.log("key: "+data9.key);
													if(data10.val().uid==localStorage.getItem("id")){
													
														follow(data9.val().token, data10.val().username);
													}
												});
											});
										}
									});
								});
								router.replace('login');
							}
		    			}
		    			src.appendChild(img);
						src.appendChild(boton);
						src.appendChild(desc);
		    		}
					
				}
			}, 1400);
			var arraySeguido=[];
			var arraySeguidor=[];
		}
    },
    mounted() {
    	this.init();
 	},
}

function buscarEnArray(cadena1, cadena2, arraySeguido, arraySeguidor){
	var y=0;
  for(y=0; y<arraySeguido.length; y++){
  	if(arraySeguido[y]==cadena1 && arraySeguidor[y]==cadena2){
  		return y;
  	}
  }
  return -1;
}
function follow(tokennav, name){
			console.log(name);
            let endpointfirebasenotification = "https://fcm.googleapis.com/fcm/send";
            axios.post(endpointfirebasenotification,{
                "to": tokennav,
                "notification": {
                    "title": "InstaFake",
                    "body": name + ` ha comenzado a seguirte`,
                    "icon": "./img/icons/android-chrome-192x192.png"
                }
            },{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"key=AAAAgSmaI9s:APA91bG-sZ242fU2unSSLs9OBTjRGamc098vxsZLpkBLIekuzGkl0a9CB0BX6bZp8DOXl_WbVO4kccChlFAkMcyi3ZJV7BirKMT8EfzYCcs566KHTfvGRyaYg5kbLulDuHjzUY7kZbSf"
                }
            });
}
</script>
<style>
.btn-follow{
	color: white;
	grid-row: 3/3;
	width: 70px;
	height: 22px;
	text-align: center;
	background-color: rgb(2, 117, 216);
	border-radius: 25px;
	border-style: none;
}
.btn-followed{
	color: white;
	grid-row: 3/3;
	width: 75px;
	height: 22px;
	text-align: center;
	background-color: rgb(41, 43, 44);
	border-radius: 25px;
	border-style: none;
}
.imagenes2 img{
	height: 150px;
	width: 230px;
	border-radius: 400px;
}
.desc2{
	grid-row: 2/2;
}
.imagenes2{
	display: grid;
	grid-column-gap: 5px;
	grid-row-gap: 20px;
	grid-template-columns: repeat(6, 210px);
	grid-template-rows: 130px 2px 2px;
	justify-items: center;
	margin-left: 40px;
	margin-right: 40px;
	margin-top: 10px;
	
	
}
</style>