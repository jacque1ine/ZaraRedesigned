<template>

<div class = "content">
  <v-form ref="form"
    v-model="valid"
    lazy-validation
      @submit="onSubmit" class="add-form">

    <v-text-field
      v-model="firstName"
      name="firstName"
      label="First Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      name="lastName"
      label="Last Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="username"
      name="username"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="phone"
      name="phone"
      label="Phone Number"
      required
    ></v-text-field>

 
    <v-btn
      input type="submit" 
      value="Save"
      color="success"
      >
      Save</v-btn>

   
  </v-form>
 </div>

</template>
 
<script>
export default {
  data(){
    return  {
      firstName: "",
      lastName: "",
      phone: "",
      username: "",
      address: "",
    }
  },


  methods: {
    async onSubmit(e) {
      e.preventDefault();
 
      if (!this.firstName || !this.lastName || !this.username || !this.phone ) {
        alert("All fields are mandatory");
        return;
      }
 
      const newContact = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        phone: this.phone
        
      };
 
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newContact),
      });
 
      const data = await res.json();
 
      this.firstName = "";
      this.lastName = "";
      this.username="";
      this.phone = "";
  
 
      document.querySelector("v-form").reset();
    }
  },
};
</script>
 
<style scoped>
/* .content{
  padding: 20px;
} */

/* .add-form {
  margin-bottom: 40px;
}
 
.form-control {
  margin: 20px 0;
}
 
.form-control label {
  display: block;
}
 
.form-control input {
  width: 80%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
 
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 
.form-control-check label {
  flex: 1;
}
 
.form-control-check input {
  flex: 2;
  height: 20px;
} */
</style>