<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 class="text-center">Add a new owner</h2>
                        <form action="">
                        <!-- Name -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0px;">name</label>
                            <input v-model="name" type="text" class="a-input-text" style="width:100%">
                        </div>
                         <!-- about -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0px;">About</label>
                            <input v-model="about" type="text" class="a-input-text" style="width:100%">
                        </div>

                        <!-- Photo -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Add Photo</label>
                           <div class="a-row a-spacing-top-medium">
                               <label class="choosefile-button">
                                   <i class="fal fa-plus"></i>
                                   <input type="file" @change="onFileSelected" />
                                   <p style="margin-top:-70px">{{ fileName }}</p>
                               </label>
                           </div>
                       </div>

                        <hr/>
                            <!-- Button Submit -->
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br>
                    <ul class="list-group-item">
                        <li v-for="owner in owners" :key="owner._id"> {{ owner.name }} <hr/></li>
                    </ul>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
     // Get Data From owners
  async asyncData({ $axios }) {
    try {
        let response = await $axios.$get("http://localhost:3000/api/owner");
        return { owners: response.owners }
    } catch (err) {
        console.log(err);
    }
  },
  data() {
      return{
        name: "",
        about: "",
        photo: "",
        selectFile: null,
        fileName: "",
      };
  },
  methods: {
      onFileSelected(event) {
        this.selectFile = event.target.files[0];
        this.fileName = event.target.files[0].name;
    },

    async onAddOwner() {
        let data = new FormData();
        console.log(data);
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectFile, this.selectFile.name);

        console.log(data);

        let result = await this.$axios.$post("http://localhost:3000/api/owner", data );
        this.owners.push({name: this.name});
        console.log(this.owners);
        // this.$router.push("/");
      }
  }
}
</script>