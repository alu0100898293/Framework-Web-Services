<template>
  <h1>Formulario para añadir servicios</h1>
  <div>
    <form>
      <div class="flex-row">
        <div class="flex-col">
          <h5>Nombre</h5>
          <InputText type="text" v-model="servName" />
        </div>
        <div class="flex-col">
          <h5>Requisitos</h5>
          <InputText type="text" v-model="servReq" />
        </div>
        <div class="flex-col">
          <h5>Ejecución</h5>
          <InputText type="text" v-model="servExec" />
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-col">
          <h5>Descripción</h5>
          <Textarea id="servDesc" :autoResize="true" v-model="servDesc" />
        </div>
        <div class="flex-col">
          <h5>Tipo de servicio</h5>
          <SelectButton
            v-model="servType"
            :options="['Estatico', 'Continuo']"
            @change="typeChanged"
          />
        </div>
        <div class="flex-col">
          <h5>Subir archivos</h5>
          <FileUpload
            mode="basic"
            accept=".zip,.tar.gz,.rar"
            :maxFileSize="300000000"
            :showUploadButton="false"
            @select="handleFileUpload"
          />
        </div>
      </div>
      <h4>Argumentos</h4>
      <div v-for="(item, index) in servArgs" :key="index">
        <Divider />
        <div class="flex-row">
          <div class="flex-col">
            <h5>Tipo</h5>
            <Dropdown
              style="width: 14rem; text-align: left"
              v-model="item.type"
              :options="['Texto', 'Imagen', 'Archivo']"
              placeholder="Seleccione un tipo de entrada"
            />
          </div>
          <div class="flex-col">
            <h5>Argumento</h5>
            <InputText type="text" v-model="item.arg" />
          </div>
          <div class="flex-col">
            <h5>Nombre</h5>
            <InputText type="text" v-model="item.name" />
          </div>
          <div class="flex-col">
            <h5>Descripcion</h5>
            <Textarea id="servDesc" :autoResize="true" v-model="item.desc" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <Button
          label="Añadir argumento"
          icon="pi pi-plus-circle"
          v-on:click="addArgument()"
        />
        <Button
          label="Borrar argumento"
          class="p-button-delete"
          icon="pi pi-minus-circle"
          v-on:click="removeArgument()"
        />
      </div>

      <Divider />

      <h4>Resultados</h4>
      <div v-if="this.servType === 'Estatico'">
        <h5>Devolver salida estándar</h5>
        <SelectButton v-model="servOut" :options="['No', 'Si']" />
      </div>
      <div v-else>
        <h5>Tipo de respuesta</h5>
        <SelectButton v-model="servOut" :options="['Video', 'Grafico']" />
      </div>

      <Divider />

      <div>
        <Button
          label="Añadir servicio"
          v-on:click="submit()"
          icon="pi pi-cloud-upload"
        />
      </div>
    </form>
    <Dialog
      header="Respuesta del servidor"
      v-model:visible="displayMsg"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <p>{{ this.responseMsg }}</p>
      <template #footer>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          @click="closeMsg"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import SelectButton from 'primevue/selectbutton'
import FileUpload from 'primevue/fileupload'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'

export default {
  components: {
    InputText,
    Textarea,
    SelectButton,
    FileUpload,
    Divider,
    Button,
    Dialog,
    Dropdown
  },
  data() {
    return {
      servName: null,
      servReq: '',
      servExec: null,
      servDesc: null,
      servType: 'Estatico',
      servArgs: [
        {
          type: '',
          arg: '',
          name: '',
          desc: ''
        }
      ],
      servOut: 'No',
      servFile: null,
      responseMsg: null,
      displayMsg: false
    }
  },
  async created() {
    this.servicesNames = await fetch(`${this.$URL}/servicios`)
      .then((res) => res.json())
      .then((servicios) => {
        return servicios
      })
  },
  methods: {
    addArgument() {
      this.servArgs.push({
        type: '',
        arg: '',
        name: '',
        desc: ''
      })
    },
    removeArgument() {
      this.servArgs.pop()
    },
    typeChanged() {
      if (this.servType === 'Estatico') this.servOut = 'No'
      else this.servOut = 'Video'
    },
    handleFileUpload(event) {
      this.servFile = event.files[0]
    },
    submit() {
      let formData = new FormData()

      formData.append('name', this.servName)
      formData.append('req', this.servReq)
      formData.append('exec', this.servExec)
      formData.append('description', this.servDesc)
      formData.append('type', this.servType)

      this.servArgs.forEach((element) => {
        formData.append('input', JSON.stringify(element))
      })

      formData.append('output', this.servOut)
      formData.append('file', this.servFile)

      fetch(`${this.$URL}/add-servicio`, {
        method: 'POST',
        body: formData,
        headers: {}
      })
        .then((res) => res.json())
        .then((response) => {
          this.responseMsg = response.message
          this.displayMsg = true
        })
        .catch(function () {
          console.log('Failure!!')
        })
    },
    showMsg(msg) {
      this.responseMsg = msg
      this.displayMsg = true
    },
    closeMsg() {
      this.displayMsg = false
    }
  }
}
</script>

<style scope>
h1 {
  background: #2f855a;
  color: white;
  border-radius: 10px;
}
.form-group {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
.p-button {
  background: #2f855a;
  border-color: #276749;
}
.p-button:hover {
  background: #38a169 !important;
  border-color: #276749 !important;
  color: white !important;
}
.p-button-delete {
  background: #770a0a;
  border-color: #8a1c1c;
}
.p-button-delete:hover {
  background: #a81818 !important;
  border-color: #8a1c1c !important;
}
.p-selectbutton:hover {
  background-color: aquamarine;
}
</style>
