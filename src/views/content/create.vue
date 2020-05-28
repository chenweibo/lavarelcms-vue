<template>
  <ContentDetail :is-edit="false" />
</template>

<script>
import ContentDetail from './components/contentDetail'
export default {
  name: 'CreateContent',
  components: { ContentDetail }
}
</script>
