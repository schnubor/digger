<template lang="html">
    <div class="loader"></div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {},
    components: {}
}
</script>

<style lang="css">
.loader {
  margin: 0px auto;
  font-size: 10px;
  position: relative;
  border-top: 5px solid rgba(206,205,207, 0.2);
  border-right: 5px solid rgba(206,205,207, 0.2);
  border-bottom: 5px solid rgba(206,205,207, 0.2);
  border-left: 5px solid #cecdcf;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
