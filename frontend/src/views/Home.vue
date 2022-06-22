<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Bienvenido</h1>
    <p>
      Para comenzar añada un servicio en la página correspondeinte y ejécutelo.
    </p>
    <h3>Requisitos</h3>
    <ul>
      <li>
        Las entradas de ficheros al servicio deben realizarse desde el fichero ../temp/in,
        mientras que las salidas deben alojarse en ../tmp/out
      </li>
      <li>
        Las entradas al servicio se limitan a imágenes(.jpeg, .png), archivos de texto (.txt, .json),
        y texto en terminal
      </li>
      <li>
        Las salidas a mostrar son imágenes(.jpeg, .png), archivos de texto (.txt, .json),
        y la salida estándar por terminal
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >
          eslint
        </a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">
          Twitter
        </a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">
          vue-router
        </a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >
          vue-devtools
        </a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
