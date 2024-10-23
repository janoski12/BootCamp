<template>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">


    <div class="container mt-5">
        <h1 class="text-center mb-4">Administración</h1>

        <div class="tex-center mb-3">
            <button class="btn btn-primary" @click="abrirModalAgregar">Agregar Curso</button>
        </div>

        <table class="table table-hover table-bordered text-center">
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
                        <span :class="{ 'badge bg-success': curso.costo > 0, 'badge bg-secondary': curso.costo === 0 }">
                            ${{ curso.costo }}
                        </span>
                    </td>
                    <td>
                        <span :class="{ 'badge bg-info': curso.completado, 'badge bg-danger': !curso.completado }">
                            {{ curso.completado ? 'Terminado' : 'No Terminado' }}
                        </span>
                    </td>
                    <td>{{ curso.fecha_registro }}</td>
                    <td>
                        <button @click="abrirModalEditar(curso)" class="btn btn-warning btn-sm me-1">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button @click="eliminar(curso.id)" class="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4">
            <div class="alert alert-info" role="alert">
                <i class="fas fa-users"></i> Cantidad total de alumnos permitidos: {{ totalAlumnosPermitidos }}.
            </div>
            <div class="alert alert-primary" role="alert">
                <i class="fas fa-user-check"></i> Cantidad total de alumnos inscritos: {{ totalInscritos }}.
            </div>
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-user-times"></i> Cantidad total de cupos restantes: {{ totalCuposRestantes }}.
            </div>
            <div class="alert alert-success" role="alert">
                <i class="fas fa-check-circle"></i> Cantidad total de cursos terminados: {{ totalCursosTerminados }}.
            </div>
            <div class="alert alert-warning" role="alert">
                <i class="fas fa-folder-open"></i> Cantidad total de cursos activos: {{ totalCursosActivos }}.
            </div>
            <div class="alert alert-secondary" role="alert">
                <i class="fas fa-book"></i> Cantidad total de cursos: {{ totalCursos }}.
            </div>

        </div>

        <!-- Modal para agregar curso-->

        <div class="modal fade" id="agregarCursoModal" tabindex="-1" aria-labelledby="agregarCursoModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Agregar Curso</h5>
                        <button type="button" class="btn-close" @click="cerrarModalAgregar"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="agregarCurso">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" v-model="nuevoCurso.nombre" required />
                            </div>

                            <div class="mb-3">
                                <label for="img" class="form-label">URL de la imagen</label>
                                <input type="url" class="form-control" v-model="nuevoCurso.img" required />
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cupos" class="form-label">Cupos del curso</label>
                                    <input type="number" class="form-control" v-model="nuevoCurso.cupos" required />
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="inscritos" class="form-label">Inscritos en el curso</label>
                                    <input type="number" class="form-control" v-model="nuevoCurso.inscritos" required />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="duracion" class="form-label">Duracion del curso</label>
                                    <input type="text" class="form-control" v-model="nuevoCurso.duracion" required />
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="fecha" class="form-label">Fecha de registro</label>
                                    <input type="date" class="form-control" v-model="nuevoCurso.fecha" required />
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="costo" class="form-label">Costo del curso</label>
                                <input type="number" class="form-control" v-model="nuevoCurso.costo" required />
                            </div>

                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripción del curso</label>
                                <textarea class="form-control" rows="3" v-model="nuevoCurso.descripcion"
                                    required></textarea>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">Agregar</button>
                                <button type="reset" class="btn btn-warning" @click="limpiarFormulario">Limpiar
                                    Formulario</button>
                                <button type="button" class="btn btn-danger" @click="cerrarModalAgregar">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal lateral personalizado para editar curso -->
        <div v-if="modalEditarVisible" class="side-modal">
            <h3>Editar Curso</h3>
            <form @submit.prevent="guardarEdicion">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="cursoActual.nombre" />
                </div>
                <div class="mb-3">
                    <label for="cupos" class="form-label">Cupos</label>
                    <input type="number" class="form-control" id="cupos" v-model="cursoActual.cupos" />
                </div>
                <div class="mb-3">
                    <label for="inscritos" class="form-label">Inscritos</label>
                    <input type="number" class="form-control" id="inscritos" v-model="cursoActual.inscritos" />
                </div>
                <div class="mb-3">
                    <label for="duracion" class="form-label">Duración</label>
                    <input type="text" class="form-control" id="duracion" v-model="cursoActual.duracion" />
                </div>
                <div class="mb-3">
                    <label for="costo" class="form-label">Costo</label>
                    <input type="number" class="form-control" id="costo" v-model="cursoActual.costo" />
                </div>
                <div class="mb-3">
                    <label for="completado" class="form-label">Completado</label>
                    <select class="form-control" id="completado" v-model="cursoActual.completado">
                        <option :value="true">Sí</option>
                        <option :value="false">No</option>
                    </select>
                </div>
                <div class="actions">
                    <button type="submit" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-danger" @click="cerrarModalEditar">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { Modal } from 'bootstrap';

export default {
    data() {
        return {
            modalAgregarVisible: false,
            modalEditarVisible: false,
            nuevoCurso: {
                nombre: '',
                img: '',
                cupos: '',
                inscritos: '',
                duracion: '',
                fechaRegistro: '',
                costo: '',
                descripcion: '',
            },
            cursoActual: {},
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
    actions: {
        editarCurso({ commit }, cursoActualizado) {
            commit('EDITAR_CURSO', cursoActualizado);
        },
    },

    methods: {
        abrirModalAgregar() {
            const myModalAgregar = new Modal(document.getElementById('agregarCursoModal'), {
                keyboard: false
            });
            myModalAgregar.show();
        },

        cerrarModalAgregar() {
            const myModalAgregar = Modal.getInstance(document.getElementById('agregarCursoModal'));
            myModalAgregar.hide();
        },
        agregarCurso() {
            this.$store.dispatch('agregarCurso', this.nuevoCurso);
            this.cerrarModal();
        },

        abrirModalEditar(curso) {
            this.cursoActual = { ...curso };
            this.modalEditarVisible = true;
        },

        cerrarModalEditar() {
            this.modalEditarVisible = false;
        },

        guardarEdicion() {
            this.$store.dispatch('editarCurso', this.cursoActual);
            this.cerrarModalEditar();
        },

        limpiarFormulario() {
            this.nuevoCurso = {
                nombre: '',
                img: '',
                cupos: '',
                inscritos: '',
                duracion: '',
                fecha_registro: '',
                costo: '',
                descripcion: ''
            };
        },
        eliminar(id) {
            this.$store.dispatch('eliminarCurso', id);
        }
    }
};
</script>

<style scoped>
.table {
    margin-bottom: 2rem;
}

.table td,
.table th {
    vertical-align: middle;
}

.alert {
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.alert i {
    margin-right: 10px;
}

.side-modal {
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
}
</style>