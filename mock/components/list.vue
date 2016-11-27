<template lang="pug">
fieldset.screen
  legend Ranked drag&amp;drop service list

  textarea(v-model="global_notes" name="textarea" rows="10" cols="50" placeholder="encrypted notes")

  div
    div(v-for="(service, service_index) in services")
      span {{service.name}}
      button(v-on:click="EditService(service_index)") Edit
      div
        button(v-for="(field, field_index) in service.fields" v-on:click="CopyValue(service_index, field_index)" v-if="!field.hide") {{field.name}}
      hr

    button(v-on:click="AddService") Add Service

  div(v-show="saved_indication") Saved successfully!
</template>

<script>
export default {
  name: 'list-screen',
  data () {
    return {
      global_notes: 'Global notes message',
      services: [{
        name: 'GitHub',
        fields: [{name: 'login'}, {name: 'password'}]
      },{
        name: 'mail.ru',
        fields: [{name: '1'}, {name: '2', hide: 'true'}, {name: '3'}]
      }]
    }
  },
  methods: {
    AddService: function() {}
  }
}
</script>

<style scoped>
</style>
