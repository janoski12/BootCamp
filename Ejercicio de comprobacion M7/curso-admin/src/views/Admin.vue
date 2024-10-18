<template>
    <div>
        <h1>Administracion de Cursos</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cupos</th>
                    <th>Inscritos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="curso in cursos" :key="curso.id">
                    <td>{{ curso.nombre }}</td>
                    <td>{{ curso.cupos }}</td>
                    <td>{{ curso.inscritos }}</td>
                    <td>
                        <button @click="editar(curso)">Editar</button>
                        <button @click="eliminar(curso.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="abrirModalAgregar">Agregar Curso</button>

        <p>Total de alumnos permitidos: {{ totalAlumnosPermitidos }}</p>
        <p>Total de alumnos inscritos: {{ totalInscritos }}</p>
        <p>Cursos activos: {{ cursosActivos }}</p>


        <div v-if="modalVisible">
            <form @submit.prevent="agregarCurso">
                <input v-model="nuevoCurso.nombre" placeholder="Nombre" required />
                <button type="submit">Agregar</button>
                <button @click="cerrarModal">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalVisible: false,
            nuevoCurso: {
                nombre: '',
                cupos: '',
                inscritos: ''
            }
        };
    },
    computed: {
        cursos() {
            return this.$store.state.cursos;
        }
    },
    methods: {
        abrirModalAgregar() {
            this.modalVisible = true;
        },
        cerrarModal() {
            this.modalVisible = false;
        },
        agregarCurso() {
            this.$store.dispatch('agregarCurso', this.nuevoCurso);
            this.cerrarModal();
        },
        eliminar(id) {
            this.$store.dispatch('eliminarCurso', id);
        },
        editar(curso) {

        }
    }
}
</script>