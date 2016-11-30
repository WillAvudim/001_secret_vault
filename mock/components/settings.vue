<template lang="pug">
fieldset.dialog
  legend Settings

  input#sync_type_none(type="radio",value="none",v-model="sync")
  label(for="sync_type_none") No Sync
  br
  input#sync_type_gdrive(type="radio",value="gdrive",v-model="sync")
  label(for="sync_type_gdrive") Google Drive
  br
  input#sync_type_dropbox(type="radio",value="dropbox",v-model="sync")
  label(for="sync_type_dropbox") Drop Box
  br

  br

  div
    button(v-on:click="OK") OK
    button(v-on:click="Cancel") Cancel

  hr
  div
    button(v-on:click="OK") Export to clipboard
    button(v-on:click="Cancel") Import from clipboard
</template>

<script>
export default {
  name: 'settings-dialog',
  data () {
    return {
      sync: 'none'  // gdrive dropbox
    }
  },
  methods: {
    OK: function() {},
    Cancel: function() {}
  }
}
</script>
