<template>
  <h1>Detalles de servicios</h1>
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
    />
    <Button
      label="Borrar"
      class="p-button-delete"
      v-on:click="openConfirmation()"
      icon="pi pi-trash"
    />
    <Dialog
      header="Confirmar eliminación"
      v-model:visible="displayConfirmation"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quieres eliminar el servicio?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeConfirmation"
          class="p-button-text"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          @click="deleteService(selectedService)"
          class="p-button-text"
          autofocus
        />
      </template>
    </Dialog>
  </div>
  <div v-if="Object.entries(serviceDetails).length !== 0">
    <Panel style="text-align: left">
      <template #header>
        <div>
          <b>Nombre del servicio:</b>
          {{ serviceDetails.name }}
        </div>
      </template>
      <b>Descripción:</b>
      {{ serviceDetails.description }}
      <Divider />
      <b>Instalación de requisitos:</b>
      {{ serviceDetails.req }}
      <Divider />
      <b>Modo de ejecución:</b>
      {{ serviceDetails.exec }}
      <Divider />
      <b>Modo de ejecución:</b>
      {{ serviceDetails.type }}
      <Divider />
      <b>Argumentos:</b>
      <div v-for="(item, index) in serviceDetails.input" :key="index">
        <div class="flex-row">
          <div class="flex-col">
            <b>Tipo:</b>
            {{ item.type }}
          </div>
          <div class="flex-col">
            <b>Argumento:</b>
            {{ item.arg }}
          </div>
          <div class="flex-col">
            <b>Nombre:</b>
            {{ item.name }}
          </div>
          <div class="flex-col">
            <b>Descripción corta:</b>
            {{ item.desc }}
          </div>
        </div>
      </div>
      <Divider />
      <div v-if="this.servType === 'Estatico'">
        <b>Retornar salida de terminal:</b>
      </div>
      <div v-else>
        <h5>Tipo de respuesta</h5>
      </div>
      {{ serviceDetails.output }}
    </Panel>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'

export default {
  components: {
    Dropdown,
    Button,
    Panel,
    Divider,
    Dialog
  },
  data() {
    return {
      selectedService: null,
      servicesNames: [],
      serviceDetails: {},
      displayConfirmation: false
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
      if (service !== null)
        this.serviceDetails = await fetch(
          `${this.$URL}/info-servicio/${service}`
        )
          .then((res) => res.json())
          .then((serviceInfo) => {
            return serviceInfo
          })
    },
    async deleteService(service) {
      this.displayConfirmation = false
      await fetch(`${this.$URL}/del-servicio/${service}`).then(() => {
        const index = this.servicesNames.indexOf(this.selectedService)
        if (index > -1) this.servicesNames.splice(index, 1)
        this.selectedService = null
        this.serviceDetails = {}
      })
    },
    openConfirmation() {
      if (this.selectedService != null) this.displayConfirmation = true
    },
    closeConfirmation() {
      this.displayConfirmation = false
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
.selector {
  display: flex;
  justify-content: space-between;
  max-width: 42%;
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
}
.p-button-delete {
  background: #770a0a;
  border-color: #8a1c1c;
}
.p-button-delete:hover {
  background: #a81818 !important;
  border-color: #8a1c1c !important;
}
</style>
