<script lang="ts" setup>
import { ref } from "vue";
import { useEmailStore } from "~/store/email/email";
import { Email } from "~/shared/Email";

const emailStore = useEmailStore();

const emails = computed(() => {
  return emailStore.getEmails;
});
const emailsCounts = computed(() => {
  const inbox = emails.value.filter(
    (email: Email) => email.type === "inbox"
  ).length;
  const archive = emails.value.filter(
    (email: Email) => email.type === "archive"
  ).length;
  return {
    inbox: inbox,
    archive: archive,
  };
});
const activeItem = ref("inbox");

const setActive = (item: string) => {
  activeItem.value = item;
};

const isActive = (item: string) => {
  return activeItem.value === item;
};
</script>

<template>
  <div class="container">
    <img src="/icon-nuxt.png" alt="Inbox Icon" class="logo" />
    <ul>
      <NuxtLink :to="{ path: '/' }">
        <li :class="{ active: isActive('inbox') }" @click="setActive('inbox')">
          <div class="menu-items">
            <div class="icon-with-text">
              <img src="/icon-inbox.png" alt="Inbox Icon" />
              <span> Inbox</span>
            </div>
            <span>{{ emailsCounts.inbox }}</span>
          </div>
        </li>
      </NuxtLink>
      <NuxtLink :to="{ path: '/archives' }">
        <li :class="{ active: isActive('other') }" @click="setActive('other')">
          <div class="menu-items">
            <div class="icon-with-text">
              <img src="/icon-archive.png" alt="Inbox Icon" />
              <span> Archives</span>
            </div>
            <span>{{ emailsCounts.archive }}</span>
          </div>
        </li>
      </NuxtLink>
    </ul>
    <button>
      <div class="menu-items">
        <div class="icon-with-text">
          <img src="/icon-logout.png" alt="Inbox Icon" /><span> Logout</span>
        </div>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.container {

  padding: 20px 0px 20px 0px;


  width: 100%;
  height: 100vh;
  position: relative;
}
.logo {
  width: 50px;
  height: 50px;
  margin-left: 5%;
}
.menu-items,
.icon-with-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
li {
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
button {
  position: absolute;
  bottom: 2%;
  margin-left: 10%;
  width: 70%;
  padding: 4% 10%;
  border: none;
  border-radius: 30px;
  background-color: white;
}

button:hover {
  background-color: #eee;
}
li:not(.active):hover {
  background-color: #eee;
}
ul {
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
a {
  text-decoration: none;
  color: unset !important;
}
</style>
