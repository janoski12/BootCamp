<template>
    <div class="container">
        <h1 class="my-4">Lista de Cursos</h1>
        <v-row>
            <v-col
                v-for="(curso, index) in cursos"
                :key="index"
                cols="12"
                sm="4"
            >
                <v-card>
                    <v-img
                        :src="curso.img"
                        height="200px"
                    ></v-img>

                    <v-card-title>{{ curso.nombre }}</v-card-title>

                    <v-card-subtitle>Informacion</v-card-subtitle>

                    <v-card-text>
                        <v-row>
                            <v-col> <strong>Costo:</strong> {{ curso.costo }}</v-col>
                            <v-col> <strong>Duracion: </strong>{{ curso.duracion }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col> <strong>Cupos:</strong>{{ curso.cupos }}</v-col>
                            <v-col> <strong>Completado:</strong>{{ curso.compleptado ? 'Si' : 'No' }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col><strong>Fecha de Registro:</strong>{{ curso.fechaRegistro }}</v-col>
                        </v-row>
                        <p><strong>Descripcion:</strong>{{ curso.descripcion }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    computed: {
        cursos() {
            return this.$store.state.cursos;
        }
    }
}
</script>

<style>
.container {
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.v-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-weight: bold;
}

.v-img {
  background-color: #f5f5f5;
}

.v-row {
  justify-content: center;
}
</style>