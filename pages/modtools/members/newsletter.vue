<template>
  <div>
    <ScrollToTop />
    <NoticeMessage v-if="!stories || !stories.length" variant="info" class="mt-2">
      There are no stories to review at the moment.
    </NoticeMessage>
    <div v-for="story in stories" :key="'story-' + story.id" class="mt-2">
      <ModStoryReview :story="story" newsletter />
    </div>
  </div>
</template>
<script>
import loginRequired from '@/mixins/loginRequired.js'
import NoticeMessage from '../../../components/NoticeMessage'
import ScrollToTop from '../../../components/ScrollToTop'

const ModStoryReview = () => import('~/components/ModStoryReview')

export default {
  layout: 'modtools',
  components: {
    ScrollToTop,
    NoticeMessage,
    ModStoryReview
  },
  mixins: [loginRequired],
  computed: {
    stories() {
      const stories = this.$store.getters['stories/list']

      if (stories) {
        return Object.values(stories)
      }

      return []
    }
  },
  async asyncData({ app, params, store }) {
    await store.dispatch('stories/fetch', {
      reviewed: 0,
      newsletter: true
    })
  },

  methods: {}
}
</script>
