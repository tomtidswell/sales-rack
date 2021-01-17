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
              <div><strong>Pagination Selector</strong></div>
              <div>{{ props.row.paginationSelector }}</div>
              <br/>
              <div><strong>Pagination url pattern</strong></div>
              <div>{{ props.row.urlPaginationPattern }}</div>
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

    <section class="section">
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleNewClick()">New setting</b-button>
        <b-button type="is-success is-small is-light" @click="newSectionActive = false">Cancel</b-button>
      </div>
    </section>


    <section class="section edit-setting" v-if="editingRowData && editingRowData._id">
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
      <b-field label="Pagination Selector">
        <b-input v-model="editingRowData.paginationSelector"></b-input>
      </b-field>
      <b-field label="Pagination url pattern">
        <b-input v-model="editingRowData.urlPaginationPattern"></b-input>
      </b-field>
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleEditSaveClick" :loading="editSaveWaiting">Save</b-button>
        <b-button type="is-success is-small is-light" @click="editingRowData = {}" :loading="editSaveWaiting">Cancel</b-button>
      </div>
    </section>

    <section class="section new-setting" v-if="newSectionActive">
      <b-field label="Retailer">
          <b-input v-model="newRowData.retailer"></b-input>
      </b-field>
      <b-field label="Category">
        <b-input v-model="newRowData.category"></b-input>
      </b-field>
      <b-field label="Page">
        <b-input v-model="newRowData.page"></b-input>
      </b-field>
      <b-field label="Privacy Selector">
        <b-input v-model="newRowData.privacySelector"></b-input>
      </b-field>
      <b-field label="Grid Item Selector">
        <b-input v-model="newRowData.gridItemSelector"></b-input>
      </b-field>
      <b-field label="Pagination Selector">
        <b-input v-model="newRowData.paginationSelector"></b-input>
      </b-field>
      <b-field label="Pagination url pattern">
        <b-input v-model="newRowData.urlPaginationPattern"></b-input>
      </b-field>
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleNewSaveClick" :loading="newSaveWaiting">Save</b-button>
        <b-button type="is-success is-small is-light" @click="editingRowData = {}" :loading="newSaveWaiting">Cancel</b-button>
      </div>
    </section>
  </main>
</template>

<script>
import _ from 'lodash'
// import {retailer_config} from '../../lib/retailers'
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
      newSectionActive: false,
      newRowData: {},
      newSaveWaiting: false,
      editingRowData: {},
      editSaveWaiting: false,
      scrapeDataResponse: [],
      scrapeData: [],
    }
  },
  created() {
    this.getData()
  },
  computed: {
    retailers: function () {
      return null//retailer_config
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
    handleNewClick(){
      console.log('New')
      this.newRowData = {}
      this.newSectionActive = true
    },
    handleEditClick({ row }){
      console.log('Editing:', row)
      this.editingRowData = _.clone(row)
    },
    async handleDeleteClick({ row }){
      const res = await fetch(`../scrapesettings/${row._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      if(res.status === 204) this.getData()
    },
    async handleNewSaveClick(){
      console.log('Saving new:', this.newRowData)
      this.newSaveWaiting = true
      // send the new data to the endpoint
      const res = await fetch(`../scrapesettings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newRowData),
      })
      const body = await res.json()
      console.log(res, body)
      if(res.status === 201) {
        this.newSaveWaiting = false
        this.newSectionActive = false
        this.newRowData = {}
        this.getData()
      }
    },
    async handleEditSaveClick(){
      console.log('Saving edit:', this.editingRowData)
      this.editSaveWaiting = true
      // send the new data to the endpoint
      const res = await fetch(`../scrapesettings/${this.editingRowData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editingRowData),
      })
      const body = await res.json()
      console.log(res, body)
      if(res.status === 202) {
        this.editSaveWaiting = false
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
section.new-setting,
section.edit-setting{
  padding: 1.5rem 30vw;
}
.scrape-settings {
  padding: 0 20px;
}
</style>
