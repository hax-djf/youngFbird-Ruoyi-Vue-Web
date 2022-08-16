<template>
  <div>
    <svg-icon icon-class="question" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'FlybirdsDoc',
  data() {
    return {
      url: 'https://github.com/hax-djf/flying-birds'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
