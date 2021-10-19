<template>
    <div class="container" style="text-align: justify;">
        <h1>Character Create</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" name="name" v-model='personaje.name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="editionInput">alter_ego:</label>
                    <input type="text" class="form-control" name="edition" v-model='personaje.alter_ego'>
                </div>
                <div class="form-group col-md-6">
                    <label for="LanguageInput">create_year:</label>
                    <input type="text" class="form-control" name="language" v-model='personaje.create_year'>
                </div>
            </div>
            <div class="form-group">
            <label for="idInput">Id:</label>
            <input type="text" class="form-control" readonly name="id" v-model='personaje.id'>
        </div>
        <div class="form-row">
                <div class="form-group col-md-6">
                    <h1>Comics:</h1>
                </div>
                <div class="form-group col-md-6">
                    <button class="btn btn-primary" id="show-modal" @click="showModal = true">Assign Comics</button>
                </div>
            </div>            
            <table class="table table-sm text-left">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comic in this.personaje.comics">                       
                        <td>
                            <li><a :href="'https://comics-p1-sd.netlify.app/#/revista/'+comic.comic_id">{{comic.comic_name}}</li>
                            <!-- Cambiar por el microfront end -->
                        </td>
                    </tr>                  
                </tbody>
            </table>
        </form>
        <router-link class="btn btn-primary" :to="'/personaje'">Back</router-link>
        <button class="btn btn-primary" v-on:click="updatePersonaje()">Edit</button>

        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Assign Comics</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!-- -->
                                    <table class="table table-sm text-left">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Name</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="comic in this.revistas">  
                                                <td>{{comic.name}}</td>                     
                                                <td>
                                                   <button type="button" class="btn btn-primary" v-on:click="addcomic(comic.id,comic.name)">Add</button>
                                                </td>
                                            </tr>                  
                                        </tbody>
                                    </table>
                                    <!-- -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            personaje:{id:"",name:"",alter_ego:"",create_year:"",comics:[]},
            personajes:[],
            revistas:[],
            coms:[],
            showModal:false
        }
    },
    created () {
        this.getPersonaje(app.$route.params.id),
        this.getRevistas()
    },
    methods: {
        getPersonaje(id){
            fetch('https://p1-sd-personajes-microservice.herokuapp.com/personaje/'+id,{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.personaje = data;                
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            })
        },
        getNextId(obj) {
            return (Math.max.apply(Math, obj.map(function(o) {
                return o.id;
            })) + 1);
        },
        updatePersonaje(){
            let ilus = this.personaje;
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(ilus)
            };
            fetch("https://p1-sd-personajes-microservice.herokuapp.com/personaje/"+this.personaje.id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/personaje');
            })
            console.log(opc);
        },
        getRevistas(){
            fetch('https://p1-sd-revistas-microservice.herokuapp.com/revista',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.revistas = data;
            })
        },
        addcomic(id,name){
            let ide = id;
            let nam = name;
            let c = [];
            c = this.personaje.comics;
            c.push({comic_id:ide,comic_name:nam});
            this.personaje.comics = c
            console.log(c);
            console.log(this.personaje.comics);
            this.showModal = false;
        }
    }
}

</script>
<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>