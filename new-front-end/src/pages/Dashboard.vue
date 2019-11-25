<template>
  <div></div>
</template>

<style>
body {
  background: white;
}
</style>

<script>
export default {
  data: () => {
    return {};
  },
  async beforeMount() {
    this.$parent.showLoading(true);
    this.$parent.showLoading(false);

    // const Toast = this.$swal.mixin({
    //   toast: true,
    //   position: "top-end",
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   onOpen: toast => {
    //     toast.addEventListener("mouseenter", this.$swal.stopTimer);
    //     toast.addEventListener("mouseleave", this.$swal.resumeTimer);
    //   }
    // });

    // Toast.fire({
    //   type: "success",
    //   title: "Signed in successfully"
    // });
  }
};
</script>