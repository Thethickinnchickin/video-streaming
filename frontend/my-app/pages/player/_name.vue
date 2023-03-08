<template>
    <div class="player">
        <videoPlayer />
    </div>
</template>
<script>
import videoPlayer from '../../components/VideoPlayer.vue';

export default {
    components: {
        videoPlayer
    },

}
</script>
<style scoped>
.player {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
}
</style>