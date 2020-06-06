<template>
  <MenuDetail :is-edit="false" />
</template>

<script>
import MenuDetail from './components/menuDetail'
export default {
  name: 'CreateMenu',
  components: { MenuDetail }
}
</script>
