<template>
  <main>
    <section class="section">
            <div class="subtitle">Category map keywords</div>
    </section>
    <section class="section">
      <div class="scrape-settings">

        <b-table :data="categoryMaps" :striped="true" :hoverable="true" detailed :show-detail-icon="true">
          <b-table-column field="keyword" label="Keyword" v-slot="props">
              {{ props.row.keyword }}
          </b-table-column>
          <b-table-column field="category" label="Category" v-slot="props">
              {{ props.row.category }}
          </b-table-column>
          <template #detail="props">
            <div class="content">
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
        <b-button type="is-success is-small" @click="handleNewClick()">New keyword</b-button>
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
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleEditSaveClick">Save</b-button>
        <b-button type="is-success is-small is-light" @click="editingRowData = {}">Cancel</b-button>
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
      <div class="buttons">
        <b-button type="is-success is-small" @click="handleNewSaveClick">Save</b-button>
        <b-button type="is-success is-small is-light" @click="editingRowData = {}">Cancel</b-button>
      </div>
    </section>

    <section class="section">
      <div class="buttons">
        <b-button type="is-success is-small" @click="reparse">Parse sample products</b-button>
      </div>
      <b-table :data="parsedCategories" :columns="columns"></b-table>
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
      newSectionActive: false,
      newRowData: {},
      newSaveWaiting: false,
      editingRowData: {},
      editSaveWaiting: false,
      scrapeDataResponse: [],
      parsedCategories: [],
      sampleNames: [
        "Goose Feather & Down 10.5 Tog Duvet",
        "Set of 3 Carbon Steel Roasting Trays",
        "12 Piece Platinum Rim StayNew™ Dinner Set",
        "Cosy & Light Mattress Protector",
        "Carbon Steel Non-Stick Roast & Rack",
        "Cosy & Light 10.5 Tog Duvet",
        "Set of 5 Printed Tea Towels",
        "Pure Cotton Repeat Diamond Towel",
        "2 Pack Cosy & Light Medium Pillows",
        "Pure Cotton Repeat Diamond Towel",
        "Large Carving Board",
        "Cosy & Light 15 Tog Duvet",
        "Aluminium 40cm Large Non-Stick Roaster",
        "Goose Feather & Down Mattress Topper",
        "Set of 5 Printed Tea Towels",
        "Temperature Comfort Pillow Protector",
        "Porcelain StayNew™ Gravy Boat",
        "Goose Feather & Down 4.5 Tog Duvet",
        "Stainless Steel Meat Thermometer",
        "Temperature Comfort 4.5 Tog Duvet",
        "Jasper Set of 3 Soft Suitcases",
        "Pure Cotton Repeat Diamond Towel",
        "Cosy & Light 4.5 Tog Duvet",
        "Set of 3 Lisbon Hard Shell 8 Wheel Suitcase",
        "Percale 300 Thread Count Deep Fitted Sheet",
        "Percale 300 Thread Count Duvet Cover",
        "Pure Cotton Luxury Spa Towel",
        "Percale 300 Thread Count Fitted Sheet",
        "Percale 300 Thread Count Pillowcase",
        "Temperature Comfort Mattress Protector",
        "Percale 300 Thread Count Fitted Sheet",
        "Cosy & Light 13.5 Tog Duvet",
        "Two Tone 4 Wheel Soft Medium Suitcase",
        "Two Tone 4 Wheel Cabin Suitcase",
        "Ultralite 4 Wheel Soft Medium Suitcase",
        "Large Oval Platter",
        "Ultralite 4 Wheel Soft Cabin Suitcase",
        "Ultralite 4 Wheel Soft Large Suitcase",
        "Medium Oval Platter",
        "Scorpio 4 Wheel Hard Shell Cabin Suitcase",
        "Scorpio 4 Wheel Hard Shell Medium Suitcase",
        "Heritage 8 Wheel Hard Shell Medium Suitcase",
        "Set of 48 Glass Christmas Baubles",
        "2-in-1 Disney™ Classics Jigsaw Puzzle",
        "Porto 4 Wheel Hard Shell Large Suitcase",
        "Set of 4 Round Woven Placemats",
        "BBQ Wire Brush",
        "BBQ Spatula",
        "Erin Table Lamp",
        "Chenille Geometric Eyelet Curtains",
        "Pure Cotton Printed Bedding Set",
        "Linear Shine Rug",
        "Festive Soap Trio Gift Set",
        "Star Pencil Pleat Blackout Kids Curtains",
        "Patterned Glass Pendant Light",
        "Renzo Wool Rug",
        "Pure Cotton Ribbed Bath Mat",
        "Set of 4 Round Woven Placemats",
        "Bobble Rug",
        "Set of 2 Pure Cotton Striped Beach Towels",
        "Set of 2 Pure Cotton Striped Beach Towels",
        "Gem Ball Ceiling Light",
        "Pure Cotton Christmas Print Runner",
        "Pure Cotton Striped Pedestal Mat",
        "Bath Jelly Trio",
        "Cotton Ribbed Table Runner",
        "Large Cast Aluminum Roaster",
        "Simple Shade Pendant Light",
        "Leda Task Floor Lamp",
        "Pure Cotton Zig Zag Pedestal Mat",
        "Pure Cotton Foliage Embroidered Cushion",
        "Minimalistic Pendant Light",
        "Minimalistic Pendant Light",
        "Droplet Chandelier",
        "Cotton Mix Tree Bedding Set",
        "Patterned Glass Cluster Pendant Light",
        "Jacquard Cushion",
        "Butterfly Tassel Cushion",
        "Pure Cotton Knitted Throw",
        "Alexa Tripod Floor Lamp",
        "Egyptian Cotton Luxury Pedestal Mat",
        "Pure Cotton Striped Seersucker Bedding Set",
        "Linda Floral Curtains",
        "Ceramic 32cm Medium Roaster",
        "Cotton Mix Mushroom Bedding Set",
        "Chenille Triangle Eyelet Curtains",
        "Brushed Cotton Tree Bedding Set",
        "Alphabet Christmas Stocking",
        "Cotton Mix Butterfly Bedding Set",
        "Percale Deep Fitted Sheet",
        "Cotton Mix Geometric Bedding Set",
        "Percale Fitted Sheet",
        "Cotton Mix Ditsy Floral Bedding Set",
        "Percale Flat Sheet",
        "Percale Duvet Cover",
        "Pure Cotton Striped Seersucker Bedding Set",
        "Alexa Table Lamp",
        "Striped Chenille Cushion",
        "Tri Ply Textured Roaster",
        "Scorpio 4 Wheel Hard Shell Cabin Suitcase",
        "Henley Pure Wool Rug",
        "Egyptian Cotton Luxury Pedestal Mat",
        "Brushed Cotton Striped Bedding Set",
        "Cotton Tartan Tablecloth",
        "Cotton Mix Geometric Bedding Set with Fitted Sheet",
        "Faux Silk Pencil Pleat Blackout Curtains",
        "Cotton Bamboo Pedestal Mat",
        "Pure Cotton Forest Bedding Set",
        "Pure Cotton Zig Zag Pedestal Mat",
        "Large Cast Aluminum Roaster",
        "Palm Print Cushion",
        "Brushed Cotton Polar Bear Bedding Set",
        "Faux Fur Luxury Throw",
        "Faux Silk Pencil Pleat Blackout Curtains",
        "16 inch Lit Winterberry Wreath",
        "Linear Shine Rug",
        "Bobble Striped Pedestal Mat",
        "Geometric Chenille Cushion",
        "Large Cast Aluminum Roaster",
        "Velvet Robin Small Embroidered Cushion",
        "Thermal Pencil Pleat Blackout Curtains",
        "Large Potato Ricer",
        "Jacquard Cushion",
        "Geometric Chenille Cushion",
        "Set of 3 Assorted Kitchen Towels",
        "Geometric Chenille Cushion",
        "Palm Print Cushion",
        "Set of 3 Assorted Kitchen Towels",
        "Large Cast Aluminum Roaster",
        "Large Cast Aluminum Roaster",
        "Herringbone Throw",
        "Set of 3 Assorted Kitchen Towels",
        "Cast Aluminium Roaster",
        "Super Soft Quick Dry Pedestal Mat",
        "Pure Cotton Striped Pedestal Mat",
        "Chenille Triangle Eyelet Curtains",
        "Super Soft Quick Dry Square Bath Mat",
        "Duck Feather & Down Medium Pillow",
        "Madeline Pure Cotton Floral Bedding Set",
        "Fleece Checked Throw",
        "Woodland Print Embroidered Cushion",
        "12 Piece Tribeca Matte Dinner Set",
        "Tri Ply 18cm Small Saucepan",
        "Cotton Mix Geometric Bedding Set",
        "Henley Pure Wool Rug",
        "Egyptian Cotton Luxury Pedestal Mat",
        "Maisie Floral Embroidered Cushion",
        "Margo Sausage Dog Embroidered Cushion",
        "Geometric Chenille Cushion",
        "Cotton Bamboo Pedestal Mat",
        "Ceramic 32cm Medium Roaster",
        "Chenille Spotted Cushion",
        "Red Christmas Tree Skirt",
        "Fleece Checked Bedding Set",
        "Design & Draw Monsters Activity Kit",
        "Harry Potter™ Ultimate Movie Quiz Game",
        "Felt Stocking Advent Calendar",
        "Harry Potter™ Stocking",
        "Pure Cotton Striped Tassle Cushion",
        "Geometric Chenille Cushion",
        "How to Draw Animals Activity Kit",
        "Cast Aluminium 5L Casserole",
        "Chenille Cushion",
        "Small Hot Water Bottle",
        "Porto 4 Wheel Hard Shell Large Suitcase",
        "Scorpio 4 Wheel Hard Shell Large Suitcase",
        "Two Tone 4 Wheel Large Suitcase",
        "Edith Bedding Set",
        "Pure Cotton Striped Seersucker Bedding Set",
        "Pure Cotton Textured Bedding Set",
        "Waffle Throw",
        "Large Glass Fridge Storage Container",
        "Set of 3 Assorted Kitchen Towels",
        "Set of 3 Assorted Kitchen Towels",
        "Faux Mohair Throw",
        "Bobble Quick Dry Extra Large Bath Mat"
      ],
      columns: [
        {
          field: 'productName',
          label: 'Product name',
        },
        {
          field: 'mappedCategory',
          label: 'Mapped category',
        }
      ],
      categoryMaps: [
        { keyword: "duvet", category: "bedding"},
        { keyword: "pillow", category: "bedding"},
        { keyword: "sheet", category: "bedding"},
        { keyword: "bedding", category: "bedding"},
        { keyword: "mattress", category: "bedding"},
        { keyword: "towel", category: "textiles"},
        { keyword: "throw", category: "textiles"},
        { keyword: "suitcase", category: "luggage"},
        { keyword: "light", category: "lighting"},
        { keyword: "lamp", category: "lighting"},
        { keyword: "chandelier", category: "lighting"},
        { keyword: "fridge", category: "kitchen"},
        { keyword: "roast", category: "kitchen"},
        { keyword: "meat thermometer", category: "kitchen"},
        { keyword: "carving", category: "kitchen"},
        { keyword: "ricer", category: "kitchen"},
        { keyword: "saucepan", category: "kitchen"},
        { keyword: "frying pan", category: "kitchen"},
        { keyword: "casserole", category: "kitchen"},
        { keyword: "gravy boat", category: "tableware"},
        { keyword: "platter", category: "tableware"},
        { keyword: "dinner set", category: "tableware"},
        { keyword: "placemat", category: "tableware"},
        { keyword: "table runner", category: "tableware"},
        { keyword: "tablecloth", category: "tableware"},
        { keyword: "jigsaw puzzle", category: "games"},
        { keyword: "pedestal mat", category: "bathroom"},
        { keyword: "bath mat", category: "bathroom"},
        { keyword: "rug", category: "rugs"},
        { keyword: "curtain", category: "curtains"},
        { keyword: "cushion", category: "cushions"},
        { keyword: "christmas", category: "christmas"},
        { keyword: "advent", category: "christmas"},
        { keyword: "stocking", category: "christmas"},
        { keyword: "wreath", category: "christmas"},
        { keyword: "game", category: "games"},
        { keyword: "bbq", category: "garden"},
      ],
    }
  },
  created() {
  },
  mounted() {
    this.reparse()
  },
  computed: {
    retailers: function () {
      return null
    },
  },
  methods: {
    reparse(){
      console.log('Parsing')
      this.parsedCategories = _.map(this.sampleNames, name=>{
        const result = _.reduce(this.categoryMaps,(acc,map)=>{
          return _.includes(name.toLowerCase(), map.keyword) ? map.category : acc
          // console.log(acc, name, )
          // return acc
        },'')

        return {productName:name, mappedCategory: result}
      })
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
    handleDeleteClick({ row }){
      console.log('IMPLEMENT Delete:', row)
    },
    async handleNewSaveClick(){
      console.log('Saving new:', this.newRowData)
    },
    async handleEditSaveClick(){
      console.log('Saving edit:', this.editingRowData)
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
