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
      url: 'https://github.com/hax-djf/youngFbird-Ruoyi-Clouds-Oauth.git'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
