<template>
    <Gobang></Gobang>
    <!-- <p>111</p> -->
</template>

<script>
import Gobang from '../../../components/gobang/gobang'

export default {
    name : 'demo-gobang',
    components: {
    [Gobang.name]: Gobang
  },
}
</script>