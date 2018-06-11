<template>
  <h1>Page not found.</h1>
</template>

<script>
export default {
  name: 'Error',
  created: function () {
    window.document.title = this.translate('notfound')
  }
}
</script>
