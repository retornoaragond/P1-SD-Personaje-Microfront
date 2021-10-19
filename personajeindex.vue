<template>
        <div class="container">
        <h1>Characters</h1>
            <div class="table-responsive">
                <table class="table table-bordered " style="width:100%;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='cha in this.characters'>
                            <td>{{cha.name}}</td>
                            <td>
                                <router-link class="button" :to="'/personaje/'+cha.id"><img src="./images/font-eye.png" style="width:20px"></router-link>
                                <router-link class="button" :to="'/personaje/edit/'+cha.id"><img src="./images/font-edit.png" style="width:20px"></router-link>
                                <!-- <router-link class="button" :to="'/ilustrator/delete/'+ilus.id"><img src="./images/delete.png" style="width:20px"></router-link>-->
                                <!-- <router-link class="button" to="/ilustrator" @click="deleteIlustrator(ilus.id)" ><img src="./images/delete.png" style="width:20px"></router-link> -->
                                <button type="button" class="btn btn-primary" v-on:click="deletecharacter(cha.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <router-link class="btn btn-primary" :to="'/personaje/create'">Create</router-link>
        </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            characters:[]
        }
    },
    created () {
        this.getIlustrators()
    },
    methods: {
        getIlustrators(){
            fetch('https://p1-sd-personajes-microservice.herokuapp.com/personaje',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.characters = data;
            })
        },
        deletecharacter(id){
            console.log('Hola1 '+id);
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"}
            };
            fetch("https://p1-sd-personajes-microservice.herokuapp.com/personaje/delete/"+id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
                router.push('/personaje');
            })

        }
    }
}

</script>