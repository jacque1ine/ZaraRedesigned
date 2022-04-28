<template>
  <section>
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
    <div class="destination-details">
      <p>{{ contact.phone }}</p>
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
      const res = await fetch(`../api/contacts/${contactId}`);

      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.contact = await this.fetchContact();
  },
};
</script>