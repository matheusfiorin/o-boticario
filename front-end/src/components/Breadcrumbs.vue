<template>
  <div class="breadcrumbs-container">
    <div class="breadcrumb-container">
      <span class="breadcrumb-divider">>&nbsp;</span>
      <div v-for="(breadcrumb, index) in breadcrumbs">
        <span class="breadcrumb-item">
          <a :href="breadcrumb.to" class="breadcrumb-clickable" v-if="index < 1 && breadcrumbs.length > 1">{{breadcrumb.path}}</a>
          <span v-else class="breadcrumb-current">{{breadcrumb.path}}</span>
          <span class="breadcrumb-divider">{{ index < breadcrumbs.length -1 ? "&nbsp;/&nbsp;" : ""}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs: function() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    }
  }
};
</script>