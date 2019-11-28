<template>
  <div id="app">
    <Navigation/>
    <div class="profile">
  		<div class="menu">
  			<button type="button" class="btn btn-success btn-redondo" data-toggle="modal" data-target="#modalAdd" @click="initVideo">Nueva publicación</button>
  			<div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" 
  data-keyboard="false">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Nueva publicación</h5>
			      </div>
			      <div class="modal-body">
			        <input type="text" name="description" class="form-control" placeholder="Descripción" id="description" v-model="description">
			        <div class="camera-modal">
				      <video ref="video" class="camera-stream" id="video" />
				      <canvas class="camera-stream" id="canvasimg"></canvas>
				      <div class="camera-modal-container">
				            <span @click="capture" class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
				              <i class="material-icons">camera</i>
				            </span>
				        </div>
				    </div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="cancel">Cancelar</button>
			        <button type="button" class="btn btn-success" data-dismiss="modal" @click="add">Publicar</button>
			      </div>
			    </div>
			  </div>
			</div>
  		</div>

  	</div>
  	<div class="imagenes" id="imagenes">
  			
  	</div>
  </div>
  

</template>
<script>
import Navigation from '@/components/Navigation.vue'

require('material-design-lite')
import firebase from 'firebase';
import $ from 'jquery'
import router from '../router.ts'
export default {
	data () {
	    return {
	    	description: '',
	    }
  	},
    components: {
        Navigation
    },
    methods: {
	    add: function() {
	    	var canvas2 = document.getElementById("canvasimg");
	    	var inputVal = document.getElementById("description").value;
	    	canvas2.toBlob(function(blob) {
				firebase.storage().ref().child(`images/picture-${new Date().getTime()}`).put(blob).then(snapshop => {
		          firebase.storage().ref().child(snapshop.ref.location.path).getDownloadURL().then(url => {
		            firebase.database().ref(snapshop.ref.location.path).set({
				        userId: localStorage.getItem("id"),
				        url: url,
				        description: inputVal,
				    });
				    firebase.database().ref("lasImg/"+localStorage.getItem("id")).set({
				        userId: localStorage.getItem("id"),
				        lasturl: url,
				        description: inputVal,
				    });
    				router.replace('register')
					
				    
		          }).catch(error => {
		            console.error('error get url file', error)
		            switch (error.code) {
		              case 'storage/object_not_found':
		                // File doesn't exist
		                break;
		              case 'storage/unauthorized':
		                // User doesn't have permission to access the object
		                break;
		              case 'storage/canceled':
		                // User canceled the upload
		                break;
		              case 'storage/unknown':
		                // Unknown error occurred, inspect the server response
		                break;
		            }
		          });
		        });
			});
	    	
	    },
	    cancel: function() {
	    	const tracks = this.mediaStream.getTracks();
    		tracks.map(track => track.stop());
	    },
	    empty: function() {
	    	$('#imagenes').empty();
	    },
	    init: function() {
	    	if (localStorage.getItem("id") == null) {
		        this.$router.replace('login')
		    }
	    	var y=0;
	    	var arrayTemp = [];
	    	var arrayTemp2 = [];
		firebase.database().ref("images/").orderByValue().on("value", function(snapshot) {
			snapshot.forEach(function(data) {
			  	if(data.val().userId==localStorage.getItem("id")){
			  		var img33 = document.createElement("img");
			  		var urltemp = data.val().url;
					img33.src = urltemp;
					arrayTemp[y]=urltemp;
					arrayTemp2[y]=data.val().description;
					var src = document.getElementById("imagenes");
					var node = document.createElement("button"); 
					var no = document.createElement("a"); 
					node.appendChild(document.createTextNode("Borrar"));
					no.appendChild(document.createTextNode(data.val().description));
					node.classList.add("btn-danger2");
					no.classList.add("desc");
					node.onclick = function(){
						const userRef = firebase.database().ref("images/").child(data.key);
    					userRef.remove()
    					firebase.database().ref("lasImg/").orderByValue().on("value", function(snapshot2) {
							snapshot2.forEach(function(data2) {
								if(urltemp == data2.val().lasturl && y>0){
									firebase.database().ref("lasImg/"+localStorage.getItem("id")).set({
								        userId: localStorage.getItem("id"),
								        lasturl: arrayTemp[y-1],
								        description: arrayTemp2[y-1],
								    });
								}
						    });
						});
						router.replace('register')
					}; 
					src.appendChild(node);
					src.appendChild(img33);
					src.appendChild(no);
					y++;
			  	}
		    });
		});
	    },
	    initVideo: function() {
	    	$('#canvasimg').hide();
	    	$('#video').show();
	    	navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
		      this.mediaStream = mediaStream;
		      this.$refs.video.srcObject = mediaStream;
		      this.$refs.video.play();
		    }).catch(error => {
		      alert(error);
		    });
	    },
	    capture: function() {
	    	const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      		const imageCapture = new window.ImageCapture(mediaStreamTrack);
	    	imageCapture.takePhoto()
			  .then(blob => createImageBitmap(blob))
			  .then(imageBitmap => {
			    const canvas = document.querySelector('#canvasimg');
			    $('#canvasimg').show();
			    $('#video').hide();
    			drawCanvas(canvas, imageBitmap);
    			const tracks = this.mediaStream.getTracks();
    			tracks.map(track => track.stop());
			  })
			  .catch(error => alert("Error"));
		},   
    },
    mounted() {
    	this.empty();
    	this.init();
 	},
}
function drawCanvas(canvas, img) {
	canvas.width = getComputedStyle(canvas).width.split('px')[0];
	canvas.height = getComputedStyle(canvas).height.split('px')[0];
	let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
	let x = (canvas.width - img.width * ratio) / 2;
	let y = (canvas.height - img.height * ratio) / 2;
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
	      x, y, img.width * ratio, img.height * ratio);
}



</script>

<style>
.btn-danger2{
	color: white;
	grid-row: 3/3;
	width: 70px;
	height: 22px;
	text-align: center;
	background-color: rgb(217, 83, 79);
	border-radius: 25px;
}
.desc{
	grid-row: 2/2;
}
.imagenes img{
	height: 150px;
	width: 230px;
	border-radius: 400px;
	grid-row: 1/1;
}
.imagenes{
	display: grid;
	grid-column-gap: 5px;
	grid-row-gap: 20px;
	grid-template-columns: repeat(6, 210px);
	grid-template-rows: 130px 2px 2px;
	justify-items: center;
	margin-left: 40px;
	margin-right: 40px;
	margin-top: -75px;
}
.btn-redondo{
	border-radius: 25px !important;
}
.camera-modal-container {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
}
.take-picture-button {
        margin-top: 1px; 
}
.profile{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	justify-items: center;
}
.menu{
	margin-top: 10px;
	grid-column: 2/2;
	grid-row: 1/1;		
}
.camera-stream {
	margin-top: 10px;
    width: 100%;
    height: 300px;
    }
</style>