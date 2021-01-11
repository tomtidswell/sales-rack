<template>
  <main>
    <section class="section">
            <div class="subtitle">Scrape Settings</div>
    </section>
    <section class="section">
      <div class="scrape-settings">

        <b-table :data="scrapeData" :striped="true" :hoverable="true" detailed :show-detail-icon="true">

          <b-table-column field="retailer" label="Retailer" v-slot="props">
              {{ props.row.retailer }}
          </b-table-column>

          <b-table-column field="category" label="Category" v-slot="props">
              {{ props.row.category }}
          </b-table-column>

          <b-table-column field="page" label="Page" v-slot="props">
              {{ props.row.page }}
          </b-table-column>

          <template #detail="props">
            <div class="content">
              <div><strong>Privacy Selector</strong></div>
              <div>{{ props.row.privacySelector }}</div>
              <br/>
              <div><strong>Grid Item Selector</strong></div>
              <div>{{ props.row.gridItemSelector }}</div>
              <br/>
              <div class="buttons">
                <b-button size="is-small" type="is-warning" @click="handleEditClick(props)">Edit</b-button>
                <b-button size="is-small" type="is-danger" @click="handleDeleteClick(props)">Delete</b-button>
              </div>
            </div>
          </template>

        </b-table>

    </div>
    </section>

    <section class="section editing" v-if="editingRowData && editingRowData._id">
      <b-field label="Retailer">
          <b-input v-model="editingRowData.retailer"></b-input>
      </b-field>
      <b-field label="Category">
        <b-input v-model="editingRowData.category"></b-input>
      </b-field>
      <b-field label="Page">
        <b-input v-model="editingRowData.page"></b-input>
      </b-field>
      <b-field label="Privacy Selector">
        <b-input v-model="editingRowData.privacySelector"></b-input>
      </b-field>
      <b-field label="Grid Item Selector">
        <b-input v-model="editingRowData.gridItemSelector"></b-input>
      </b-field>
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleSaveClick" :loading="editWaiting">Save</b-button>
        <b-button type="is-success is-small is-light" @click="editingRowData = {}" :loading="editWaiting">Cancel</b-button>
      </div>
    </section>
  </main>
</template>

<script>
import _ from 'lodash'
import {retailer_config} from '../../lib/retailers'
// import { timeDiffToNow } from "../../lib/time"

export default {
  name: "Scrapes",
  components: {},
  props: {
    retailer: String,
  },
  data() {
    return {
      message: "Hello",
      editingRowData: {},
      editWaiting: false,
      scrapeDataResponse: [],
      scrapeData: [],
    }
  },
  created() {
    this.getData()
  },
  computed: {
    retailers: function () {
      return retailer_config
    },
    retailerData: function () {
      return this.retailers[this.retailer] || {}
    },
  },
  methods: {
    async getData() {
      const res = await fetch(`../scrapesettings`)
      console.log("Endpoint response:", res)
      this.scrapeDataResponse = res.status === 200 ? await res.json() : []
      this.scrapeData = _.map(this.scrapeDataResponse, i=>{
        i.date = new Date(i.createdAt).toLocaleString()
        return i
      })
      console.log("Data:", this.scrapeData)
    },
    handleEditClick({ row }){
      console.log('Editing:', row)
      this.editingRowData = _.clone(row)
    },
    handleDeleteClick({ row }){
      console.log('IMPLEMENT Delete:', row)
    },
    async handleSaveClick(){
      console.log('Saving:', this.editingRowData)
      this.editWaiting = true
      // send the new data to the endpoint
      const res = await fetch(`../scrapesettings/${this.editingRowData._id}`, {
        method: 'PUT', // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editingRowData),
      })
      const body = await res.json()
      console.log(res, body)
      if(res.status === 202) {
        this.editWaiting = false
        this.editingRowData = {}
        this.getData()
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
a {
  color: #42b983;
}
.subtitle{
  font-size: 1.8rem;
}
section.section .b-table .detail .detail-container{
  padding: 0.2rem;
  display: flex;
  .edit-button,
  .delete-button{
    cursor: pointer;
  }
}
section.editing{
  padding: 1.5rem 30vw;
}
.scrape-settings {
  padding: 0 20px;
}
</style>
