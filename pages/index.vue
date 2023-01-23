<template>
  <section>
    <Calendar />
  </section>
</template>

<script>
export default {
  name: 'IndexChallenge',
  components: {
    Calendar: () => import('~/components/Calendar')
  }
}
</script>