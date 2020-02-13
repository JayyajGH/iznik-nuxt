<template>
  <div>
    <ModMessageButton
      v-if="pending"
      :message="message"
      variant="success"
      icon="check"
      approve
      label="Approve"
    />
    <ModMessageButton
      v-if="pending"
      :message="message"
      variant="danger"
      icon="trash-alt"
      delete
      label="Delete"
    />
    <ModMessageButton
      v-for="stdmsg in filtered"
      :key="stdmsg.id"
      :variant="variant(stdmsg)"
      :icon="icon(stdmsg)"
      :label="stdmsg.title"
      :stdmsg="stdmsg"
      :message="message"
    />
    <b-btn v-if="rareToShow && !showRare" variant="white" class="mb-1" @click="showRare = true">
      <v-icon name="caret-down" /> +{{ rareToShow }}...
    </b-btn>
  </div>
</template>
<script>
import ModMessageButton from './ModMessageButton'

export default {
  components: { ModMessageButton },
  props: {
    message: {
      type: Object,
      required: true
    },
    modconfig: {
      type: Object,
      required: false
    }
  },
  data: function() {
    return {
      showRare: false
    }
  },
  computed: {
    pending() {
      let ret = false

      if (this.message.groups) {
        this.message.groups.forEach(group => {
          if (group.collection === 'Pending') {
            ret = true
          }
        })
      }

      return ret
    },
    validActions() {
      // The standard messages we show depend on the valid ones for this type of message.
      if (this.pending) {
        return ['Approve', 'Reject', 'Leave', 'Delete', 'Edit']
      } else {
        return ['Leave Approved Message', 'Delete Approved Message', 'Edit']
      }
    },
    rareToShow() {
      return this.filterByAction.length - this.filtered.length
    },
    filterByAction() {
      if (this.modconfig) {
        return this.modconfig.stdmsgs.filter(stdmsg => {
          return this.validActions.indexOf(stdmsg.action) !== -1
        })
      }

      return []
    },
    filtered() {
      if (this.modconfig) {
        return this.filterByAction.filter(stdmsg => {
          return this.showRare || !parseInt(stdmsg.rarelyused)
        })
      }

      return []
    }
  },
  methods: {
    icon(stdmsg) {
      switch (stdmsg.action) {
        case 'Approve':
        case 'Approve Member':
          return 'check'
        case 'Reject':
        case 'Reject Member':
          return 'times'
        case 'Leave':
        case 'Leave Member':
        case 'Leave Approved Message':
        case 'Leave Approved Member':
          return 'envelope'
        case 'Delete':
        case 'Delete Approved Message':
        case 'Delete Approved Member':
          return 'trash-alt'
        case 'Edit':
          return 'pen'
        default:
          return 'check'
      }
    },

    variant(stdmsg) {
      switch (stdmsg.action) {
        case 'Approve':
        case 'Approve Member':
          return 'success'
        case 'Reject':
        case 'Reject Member':
          return 'warning'
        case 'Leave':
        case 'Leave Member':
        case 'Leave Approved Message':
        case 'Leave Approved Member':
          return 'primary'
        case 'Delete':
        case 'Delete Approved Message':
        case 'Delete Approved Member':
          return 'danger'
        case 'Edit':
          return 'info'
        default:
          return 'white'
      }
    }
  }
}
</script>
<style scoped>
</style>