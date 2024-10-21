<template>
    <div class="container">
        <h1 class="text-center mt-5">Administración</h1>

        <div class="d-flex justify-content-center mb-4">
            <button class="btn btn-primary" @click="abrirModalAgregar">Agregar Curso</button>
        </div>

        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">Cupos</th>
                    <th scope="col">Inscritos</th>
                    <th scope="col">Duracion</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Terminado</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="curso in cursos" :key="curso.id">
                    <td>{{ curso.nombre }}</td>
                    <td>{{ curso.cupos }}</td>
                    <td>{{ curso.inscritos }}</td>
                    <td>{{ curso.duracion }}</td>
                    <td>
                        <span :class="getBadgeClass(curso.costo)">{{ formatCurrency(curso.costo) }}</span>
                    </td>
                    <td>
                        <span :class="curso.completado ? 'badge badge-sucess' : 'badge badge-secondary'">
                            {{ curso.completado ? 'Si' : 'No' }}
                        </span>
                    </td>
                    <td>{{ curso.fechaRegistro }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm mr-2" @click="editar(curso)">✏️</button>
                        <button class="btn btn-danger btn-sm" @click="eliminar(curso.id)">🗑️</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4">
            <p class="alert alert-prmary">Cantidad total de alumnos permitidos: {{ totalAlumnosPermitidos }} alumnos.</p>
            <p class="alert alert-info">Cantidad total de alumnos inscritos: {{ totalInscritos }} alumnos.</p>
            <p class="alert alert-warning">Cantidad total de cupos restantes: {{ totalCuposRestantes }} alumnos.</p>
            <p class="alert alert-danger">Cantidad total de cursos terminados: {{ totalCursosTerminados }} cursos.</p>
            <p class="alert alert-success">Cantidad total de cursos activos: {{ totalCursosActivos }} cursos.</p>
            <p class="alert alert-secondary">Cantidad total de cursos: {{ totalCursos }} cursos.</p>
        </div>

        <div v-if="modalVisible" class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Agregar Curso</h5>
                        <button type="button" class="close" @click="cerrarModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="agregarCurso">
                            <div class="form-group">
                                <label for="nombre">Nombre del curso</label>
                                <input 
                                    v-model="nuevoCurso.nombre"
                                    id="nombre"
                                    class="form-control"
                                    placeholder="Nombre"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="cupos">Cupos</label>
                                <input 
                                    v-model="nuevoCurso.cupos"
                                    id="cupos"
                                    type="number"
                                    class="form-control"
                                    placeholder="Cupos"
                                    required
                                />
                            </div>
                            <div class="form-control">
                                <label for="inscritos">Inscritos</label>
                                <input 
                                    v-model="nuevoCurso.inscritos"
                                    id="inscritos"
                                    type="number"
                                    class="form-control"
                                    placeholder="Inscritos"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-success">Agregar</button>
                            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
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
                inscritos: '',
            }
        };
    },
    computed: {
        cursos() {
            return this.$store.state.cursos;
        },
        totalAlumnosPermitidos() {
            return this.cursos.reduce((total, curso) => total + curso.cupos, 0);
        },
        totalInscritos() {
            return this.cursos.reduce((total, curso) => total + curso.inscritos, 0);
        },
        totalCuposRestantes() {
            return this.totalAlumnosPermitidos - this.totalInscritos;
        },
        totalCursosTerminados() {
            return this.cursos.filter(curso => curso.inscritos >= curso.cupos).length;
        },
        totalCursosActivos() {
            return this.cursos.filter(curso => !curso.completado).length;
        },
        totalCursos() {
            return this.cursos.length;
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
            this.$router.push(`/editar/${curso.id}`);
        },
        getBadgeClass(costo) {
            return costo >= 50000 ? 'badge badge-success' : 'badge badge-info';
        },
        formatCurrency(value) {
            return `$${value.toLocaleString()}`;
        }
    }
};
</script>

<style>
.modal.show {
    background: rgba(0, 0, 0, 0.5);
}
</style>