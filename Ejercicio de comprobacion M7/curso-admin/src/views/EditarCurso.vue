<template>
    <div>
        <h1>Editar Curso</h1>
        <form @submit.prevent="guardarCambios">
            <div>
                <label>Nombre:</label>
                <input v-model="curso.nombre" />
            </div>
            <div>
                <label>Cupos:</label>
                <input v-model.number="curso.cupos" type="number" />
            </div>
            <button type="submit">Guardar</button>
        </form>
        <button @click="volver">Cancelar</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curso: {}
        };
    },
    created() {
        const id = this.$route.params.id;
        this.cargarCurso(id);
    },
    methods: {
        cargarCurso(id) {
            this.curso = this.$store.state.cursos.find(curso => curso.id === parseInt(id));
        },
        guardarCambios() {
            this.$store.dispatch('editarCurso', this.curso);
            this.$router.push('/admin');
        },
        volver() {
            this.$router.push('/admin');
        }
    }
};
</script>