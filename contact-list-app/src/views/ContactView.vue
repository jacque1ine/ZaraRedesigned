<template>
  <section>
    <h1>{{ contacts.firstName }} {{ contacts.lastName }}</h1>
    <div class="destination-details">
      <p>{{ contacts.phone }}</p>
    </div>
  </section>
</template>

 

<script>
export default {
  data() {
    return {
      contact: {},
    };
  },
  methods: {
    async fetchContact() {
      const contactId = parseInt(this.$route.params.id);
      const res = await fetch(`api/contacts/${contactId}`);


      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.contact = await this.fetchContact();
  },
};
</script>