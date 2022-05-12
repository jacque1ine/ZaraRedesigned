<template>
  <section>
    <h1>{{ user.firstName }} {{ user.lastName }}</h1>
    <div class="destination-details">
      <p>{{ user.phone }}</p>
    </div>
  </section>
</template>

 

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async fetchuser() {
      const userId = parseInt(this.$route.params.id);
      const res = await fetch(`../api/contacts/${userId}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.user = await this.fetchuser();
  },
};
</script>