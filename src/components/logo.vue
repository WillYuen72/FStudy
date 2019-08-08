<template>
<img :src="`${this.logoPath}`">
</template>

<script>
export default {
    name: 'system-logo',
    props: {
        logoPath: {
        type: String,
        required: true
    }
    },
}
</script>
