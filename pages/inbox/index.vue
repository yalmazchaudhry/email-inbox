<script lang="ts" setup>
import {ref} from 'vue';
const emails = ref([
  {
    sender: "John Doe",
    subject: "Meeting Invitation",
    content: "Hello, we have a meeting scheduled for tomorrow.",
    selected: false,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
  {
    sender: "Alice Smith",
    subject: "Project Update",
    content: "Here's the latest update on our project progress.",
    selected: true,
  },
]);
</script>
<template>
  <div class="inbox-page">
    <h1>Inbox</h1>
      <ul class="mail-list">
        <li class="email-actions">
          <div class="email-selected">
            <input type="checkbox"  class="checkbox">
            <div class="email-content">{{ 'Email Selected (12)' }}</div>
          </div>
          <div class="actions">
          <div class="action_items">
            <img src="/icon-inbox.png" alt="Inbox Icon">
            <span> Mark as read(r)</span>
          </div>
          <div class="action_items">
            <img src="/icon-inbox.png" alt="Inbox Icon">
            <span> Archive (a) </span>
          </div>
          </div>

        </li>
        <li v-for="(email, index) in emails" :key="index" class="email-item">
          <input type="checkbox" v-model="email.selected" class="checkbox">
          <div class="email-content">{{ email.content }}</div>
        </li>
      </ul>

  </div>
</template>
<style  lang="scss" scoped>
.actions{
  width:30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.email-selected{
  width: 70%;
  display: flex;
  align-items: center;
  padding: 15px;
}

.action_items {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: start;
}
.email-actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: 1px solid #eee;
}
ul{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;

}
.mail-list li:nth-child(even) {
  background-color: #eee;
}

.mail-list li:nth-child(odd) {
  background-color: unset;
}
li:hover{
  background-color: rgba(168, 199, 250, 0.5) !important;
}
.inbox-page {
  padding-top: 2%;
  height: 100vh;
  border-left: 1px solid black;
  padding-left: 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  padding-left: 2%;
}

.mail-list {
}

.email-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
}


.email-content {
  margin-left: 3%;
  color: #555;
}
input[type=checkbox]{
  height: 15px;
  width: 15px;
}
img{
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
</style>
