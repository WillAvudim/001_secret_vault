<template lang="pug">
fieldset.screen(v-on:keyup.enter="OK")
  legend(v-if="mode === 'new'") Pick a new password
  legend(v-if="mode === 'ask_existing'") Enter the password
  legend(v-if="mode === 'change'") Change existing password

  div(v-if="mode === 'change'")
    label(for="original-password") Original Password:
    input(v-model="original_password", type="password", placeholder="enter original password")

  div
    label(for="password") Password:
    input(v-model="password" type="password" value="" placeholder="enter password")

  div(v-if="mode !== 'ask_existing'")
    label(for="confirm-password") Confirm Password:
    input(v-model="confirm_password" type="password" value="" placeholder="confirm password")

  div.error-message(v-show="!!error_message.length")
    span {{error_message}}

  div
    button(v-on:click="OK", v-bind:disabled="disable_OK") OK
</template>

<script>
export default {
  name: 'login-screen',
  data () {
    return {
      mode: 'new',  // change ask_existing new
      original_password: '',
      password: '',
      confirm_password: '',
      error_message: "Error message!"
    }
  },
  methods: {
    OK: function () {}
  }
}
</script>

<style scoped>
</style>
