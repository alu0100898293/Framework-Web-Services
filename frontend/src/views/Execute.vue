<template>
  <h1>Ejecución de servicios</h1>
  <div class="selector">
    <Dropdown
      style="width: 14rem; text-align: left"
      v-model="selectedService"
      :options="servicesNames"
      placeholder="Seleccione un servicio"
    />
    <Button
      label="Detalles"
      v-on:click="getDetails(selectedService)"
      icon="pi pi-search"
    >
      Seleccionar
    </Button>
  </div>
  <div v-if="Object.entries(serviceDetails).length !== 0">
    <Panel style="text-align: left">
      <template #header>
        <div>
          <b>{{ serviceDetails.name }}</b>
          <br />
          {{ serviceDetails.description }}
        </div>
      </template>
      <Panel>
        <template #header>
          <div>
            <b>Entradas</b>
          </div>
        </template>
        <div v-for="(item, index) in serviceDetails.input" :key="index">
          <Fieldset style="width: 25em">
            <template #legend>
              {{ item.name }}
            </template>
            {{ item.desc }}
            <br />
            <FileUpload
              v-if="item.type === 'Imagen'"
              mode="basic"
              accept=".jpeg,.jpg,.png"
              :maxFileSize="50000000"
              :showUploadButton="false"
              @select="handleFileUpload($event, index)"
            />
            <FileUpload
              v-if="item.type === 'Archivo'"
              mode="basic"
              accept=".txt,.json,"
              :maxFileSize="50000000"
              :showUploadButton="false"
              @select="handleFileUpload($event, index)"
            />
            <InputText
              v-if="item.type === 'Texto'"
              type="text"
              v-model="inputs[index].value"
            />
          </Fieldset>
        </div>
        <div class="center">
          <Button
            type="button"
            label="Ejecutar servicio"
            icon="pi pi-caret-right"
            :loading="loading"
            v-on:click="execService()"
          />
        </div>
      </Panel>
      <Panel v-show="displayOutput">
        <template #header>
          <div>
            <b>Salidas</b>
          </div>
        </template>
        <div v-for="(item, index) in outputs" :key="index">
          <Fieldset style="width: 25em" v-if="item.type === 'Texto'">
            <template #legend>Texto</template>
            {{ item.file }}
          </Fieldset>
          <Fieldset style="width: 25em" v-if="item.type === 'Imagen'">
            <template #Fieldset>Imagen</template>
            <img v-bind:src="item.file" />
          </Fieldset>
        </div>
      </Panel>
    </Panel>
  </div>
</template>

<script>
//"`data:image/png;base64,${img.encodedImage}`"
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'

export default {
  components: {
    Dropdown,
    Button,
    Panel,
    Fieldset,
    FileUpload,
    InputText
  },
  data() {
    return {
      selectedService: null,
      servicesNames: [],
      serviceDetails: {},
      inputs: [],
      outputs: [],
      displayOutput: false,
      loading: false
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
    async getDetails(service) {
      if (service !== null) {
        this.serviceDetails = await fetch(
          `${this.$URL}/info-servicio/${service}`
        )
          .then((res) => res.json())
          .then((serviceInfo) => {
            return serviceInfo
          })
        this.displayOutput = false
        this.inputs = []
        this.serviceDetails.input.forEach((element) => {
          this.inputs.push({
            name: element.name,
            type: element.type,
            arg: element.arg,
            value: ''
          })
        })
      }
    },
    async execService() {
      this.loading = true

      let formData = new FormData()
      let numFiles = 0

      formData.append('name', this.serviceDetails.name)
      formData.append('type', this.serviceDetails.type)
      formData.append('exec', this.serviceDetails.exec)

      this.inputs.forEach((element) => {
        let input = {
          name: element.name,
          type: element.type,
          arg: element.arg,
          value: null
        }
        if (element.type === 'Texto') input.value = element.value
        else {
          input.value = numFiles
          numFiles++
          formData.append('files', element.value)
        }
        formData.append('input', JSON.stringify(input))
      })

      formData.append('output', this.serviceDetails.output)

      this.outputs = await fetch(`${this.$URL}/exec-servicio`, {
        method: 'POST',
        body: formData,
        headers: {}
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.output)
          let output = []
          response.output.forEach((element) => {
            if (element.type === 'Texto') {
              output.push({
                file: Buffer.from(element.file, 'base64'),
                type: element.type
              })
            } else output.push(element)
          })
          return output
        })
        .catch(function () {
          console.log('Failure!!')
        })
      this.displayOutput = true
      this.loading = false
    },
    handleFileUpload(event, index) {
      this.inputs[index].value = event.files[0]
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
.selector {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}
.p-button {
  background: #2f855a;
  border-color: #276749;
}
.p-button:hover {
  background: #38a169 !important;
  border-color: #276749 !important;
}
</style>
