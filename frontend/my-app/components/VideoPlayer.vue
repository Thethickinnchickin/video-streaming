<template>
    <div>
        <video ref="videoPlayer" controls>
            <source :src="videoUrl" type="video/mp4" />
        </video>
    </div>
</template>
  
<script>
export default {
    async mounted() {
        try {
            this.vidName = this.$route.params.name
            const videoUrl = `http://localhost:9000/videos/video/${this.vidName}`;
            this.videoUrl = videoUrl;
            this.$refs.videoPlayer.load();
            //this.$refs.videoPlayer.play();
        } catch (err) {
            console.error(err);
        }
    },
    data() {
        return {
            videoUrl: '',
        };
    },
};
</script>
  