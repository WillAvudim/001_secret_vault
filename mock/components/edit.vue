<template lang="pug">
fieldset.dialog
  legend Service editing
  div
    label(for="service-editing-name") Service name:&nbsp;
    input#service-editing-name(v-model="name")
  textarea(name="textarea" rows="10" cols="50" placeholder="notes" v-model="notes")

  div(v-show="!!fields.length")
    table
      tr
        th Name
        th Value
        th Generate Password
        th Delete
        th Hide
      tr(v-for="(field, index) in fields")
        td
          input(v-model="field.name")
        td
          input(v-model="field.value")
        td
          button(v-on:click="GeneratePassword(index)") P
        td
          button(v-on:click="Delete(index)") X
        td
          input(type="checkbox" v-model="field.hide")

  div
    button(v-on:click="AddNewField") Add Field
    span |
    button(v-on:click="OK") OK
    button(v-on:click="Cancel") Cancel
</template>

<script>
export default {
  name: 'edit-dialog',
  data () {
    return {
      name: 'mail.ru',
      notes: 'Some notes',
      fields: [{name: '1'}, {name: '2', hide: 'true'}, {name: '3'}]
    }
  },
  methods: {
  }
}
</script>
