<template>
    <div class="container" style="text-align: justify;">
        <h1>Character Details</h1>
        <form>
            <div class="form-group">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control" readonly name="name" v-model='personaje.name'>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="editionInput">alter_ego:</label>
                    <input type="text" class="form-control" readonly name="edition" v-model='personaje.alter_ego'>
                </div>
                <div class="form-group col-md-6">
                    <label for="LanguageInput">create_year:</label>
                    <input type="text" class="form-control" readonly name="language" v-model='personaje.create_year'>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <h1>Comics:</h1>
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
    </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            personaje:{id:"",name:"",alter_ego:"",create_year:"",comics:[]},
            ilustrator:[],
            revistas:[],
            id:0
        }
    },
    created () {
        this.getPersonaje(app.$route.params.id)
    },
    methods: {
        getPersonaje(id){
            fetch('https://p1-sd-personajes-microservice.herokuapp.com/personaje/'+id,{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.personaje = data;
                this.id = this.getNextId(this.personaje);
                
            })
            .catch(function (error) {
                console.log('Error f1: ' + error);
            })
        }
    }
}

</script>