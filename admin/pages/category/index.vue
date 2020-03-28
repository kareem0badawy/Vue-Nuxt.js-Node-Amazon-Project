<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 class="text-center">Add a new Category</h2>
                        <form action="">
                        <!-- Type -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0px;">Type</label>
                            <input v-model="type" type="text" class="a-input-text" style="width:100%">
                        </div>
                        <hr/>
                            <!-- Button Submit -->
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onAddCategory">Add Category</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br>
                    <ul class="list-group-item">
                        <li v-for="category in categories" :key="category._id"> {{ category.type }} <hr/></li>
                    </ul>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    // Get Data From categories & owners
  async asyncData({ $axios }) {
    try {
        let response = await $axios.$get("http://localhost:3000/api/category");
        return { categories: response.categories }
    } catch (err) {
        console.log(err);
    }
  },
  data() {
      return{
        type: "",
      };
  },
  methods: {
    async onAddCategory() {
        try {
            let data = {"type": this.type}
            console.log(data);
            let response = await this.$axios.$post("http://localhost:3000/api/category", data);
            this.categories.push(data)
            // this.$router.push("/");
        } catch (err) {
            console.log(err);
        }
    }
  }
}
</script>