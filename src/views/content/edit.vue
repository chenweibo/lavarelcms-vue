<template>
  <ContentDetail :is-edit="true" />
</template>

<script>
import ContentDetail from './components/contentDetail'
export default {
  name: 'EditContent',
  components: { ContentDetail }
}
</script>
