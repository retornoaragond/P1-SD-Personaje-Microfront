const routes = [
    { path: '/personaje', component: httpVueLoader('personajeindex.vue'), props: true },
    { path: '/personaje/create', component: httpVueLoader('personajecreate.vue'), props: { create: true } },
    { path: '/personaje/:id', component: httpVueLoader('personajedetails.vue'), props: { show: true } },
    { path: '/personaje/edit/:id', component: httpVueLoader('personajeedit.vue'), props: { show: true } }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router,
    el: "#app",
    data: {
        titulo: "Proyecto #1: Esteban Espinoza & Marco Murillo"
    }
}).$mount('#app')