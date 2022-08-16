<template>
  <div>
    <svg-icon icon-class="github" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'FlybirdsGit',
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
