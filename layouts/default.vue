<template>
    <div class="main_container">
      <div class="sidebar">
        <DashboardSidebar />
      </div>
      <div class="page"

      >
        <slot />
      </div>
    </div>
</template>
<style lang="scss" scoped>
.sidebar{
  width: 20%;
}
.main_container{
  padding: 0;
  display: flex;
}
.page{
  width: 80%;
  padding-left: 2rem;

}
</style>