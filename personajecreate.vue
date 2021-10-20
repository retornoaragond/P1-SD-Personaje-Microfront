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
                    <input type="text" class="form-control" name="alter_ego" v-model='personaje.alter_ego'>
                </div>
                <div class="form-group col-md-6">
                    <label for="LanguageInput">create_year:</label>
                    <input type="text" class="form-control" name="create_year" v-model='personaje.create_year'>
                </div>
            </div>
        </form>
        <div class="form-group">
            <label for="idInput">Id:</label>
            <input type="text" class="form-control" readonly name="id" v-model='id'>
        </div>
        <router-link class="btn btn-primary" :to="'/personaje'">Back</router-link>
        <a class="btn btn-primary" v-on:click="createComic()">Create</a>
    </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            personaje:{id:"",name:"",alter_ego:"",create_year:"",comics:[]},
            personajes:[],
            ilustrator:[],
            revistas:[],
            id:0
        }
    },
    created () {
        this.getPersonajes()
    },
    methods: {
        getPersonajes(){
            fetch('https://p1-sd-personajes-microservice.herokuapp.com/personaje',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.personajes = data;
                this.id = this.getNextId(this.personajes);
                
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
        createComic(){
            this.personaje.id = this.id;
            let ilus = this.personaje;
            console.log(JSON.stringify(ilus));
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(ilus)
            };
           fetch("https://p1-sd-personajes-microservice.herokuapp.com/personaje",opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/personaje');
            })
            //console.log(opc);
        }
    }
}

</script>