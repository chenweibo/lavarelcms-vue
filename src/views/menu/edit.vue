<template>
  <MenuDetail :is-edit="true" />
</template>

<script>
import MenuDetail from './components/menuDetail'
export default {
  name: 'EditMenu',
  components: { MenuDetail }
}
</script>
