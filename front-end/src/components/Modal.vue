<template>
  <div></div>
</template>

<script>
export default {
  name: "Modal",
  props: ["title", "text", "type"],
  created() {
    this.$swal.fire({
      title: this.title,
      text: this.text,
      type: this.icon,
      customClass: {
        confirmButton: "confirm-button-class"
      }
    });
  }
};
</script>