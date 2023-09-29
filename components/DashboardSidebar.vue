
<script lang="ts" setup>
import { ref, reactive } from 'vue';

const activeItem = ref('inbox');

function setActive(item :string) {
  console.log(item)
  activeItem.value = item;
}

function isActive(item :string) {
  const temp= activeItem.value === item;
  console.log(temp)
  return temp
}
</script>

<template>
  <div class="container">
    <img src="/icon-inbox.png" alt="Inbox Icon" class="logo">
<ul>
  <li :class="{ 'active': isActive('inbox') }" @click="setActive('inbox')">
    <div class="menu-items" >
    <div class="icon-with-text">
      <img src="/icon-inbox.png" alt="Inbox Icon">
      <span> Inbox</span>
    </div>
    <span>9</span>
  </div>
  </li>
  <li :class="{ 'active': isActive('other') }" @click="setActive('other')">
    <div class="menu-items">
      <div class="icon-with-text">
        <img src="/icon-inbox.png" alt="Inbox Icon">
        <span> Inbox</span>
      </div>
      <span>9</span>
    </div>
  </li>
</ul>
      <button><div class="menu-items"> <div class="icon-with-text"><img src="/icon-logout.png" alt="Inbox Icon"><span> Logout</span></div></div></button>
</div>
</template>

<style lang="scss" scoped>
.container{
    width:100%;
  height: 100vh;
  position: relative;
  padding-top: 2%;
}
.logo{
  margin-left: 5%;
}
.menu-items, .icon-with-text{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
li{
  margin-left: 10%;
  margin-bottom: 4%;
  list-style: none;
  background-color: unset;
  padding: 4% 10%;
  border-radius: 30px;
  cursor: pointer;
}
li.active {
  background-color: rgba(168, 199, 250, 0.5);
}
button{
  position: absolute;
  bottom: 2%;
  margin-left: 10%;
  width: 70%;
  padding: 4% 10%;
  border: none;
  border-radius: 30px;
}
button{
  background-color:white;

}
button:hover{
  background-color: #eee;
}
li:not(.active):hover {
  background-color: #eee;
}
ul{
  margin: 0;
  margin-top: 5%;
  padding: 0;
  list-style: none;
}

.icon-with-text img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}


</style>
