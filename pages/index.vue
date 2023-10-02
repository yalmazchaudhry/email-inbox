<script lang="ts" setup>
import { ref } from "vue";
import { useEmailStore } from "~/store/email/email";
import { Email } from "~/shared/Email";

const emailStore = useEmailStore();
const emails = ref(
  emailStore.getEmails.filter((email: Email) => email.type === "inbox")
);
watchEffect(() => {
  emails.value = emailStore.getEmails.filter(
    (email: Email) => email.type === "inbox"
  );
});
const selectedEmailIndex = ref(-1);
const isAllEmailsSelected = ref(false);

const toggleSideDrawer = (index: number) => {
  if (selectedEmailIndex.value === index) {
    selectedEmailIndex.value = -1;
  } else {
    selectedEmailIndex.value = index;
  }
};
const toggleMarkAsRead = (index: number) => {
  const email = emails.value[index];
  email.markRead = true;
};

const toggleEmail = (index: number) => {
  toggleSideDrawer(index);
  toggleMarkAsRead(index);
};

const markSelectedAsRead = () => {
  for (const [index, email] of emails.value.entries()) {
    if (email.selected) {
      toggleMarkAsRead(index);
      email.selected = false;
    }
  }
};
const moveSelectedToArchives = () => {
  const remainingEmails = [];

  for (const [index, email] of emails.value.entries()) {
    if (email.selected) {
      email.type = "archive";
      email.selected = false;
    } else {
      remainingEmails.push(email);
    }
  }

  emails.value = remainingEmails;
};

const isAnyEmailSelected = computed(() => {
  return emails.value.some((email: Email) => email.selected && !email.markRead);
});
const archiveButton = computed(() => {
  return emails.value.some((email: Email) => email.selected);
});

const selectedEmails = computed(() => {
  const selected = emails.value.filter((email: Email) => email.selected);
  isAllEmailsSelected.value = selected.length === emails.value.length;
  if (emails.value.length == 0) {
    isAllEmailsSelected.value = false;
  }
  return {
    emails: selected,
    count: selected.length,
  };
});
const selectAllEmails = () => {
  for (const [index, email] of emails.value.entries()) {
    email.selected = isAllEmailsSelected.value;
  }
};
const handleKeyboardEvent = (event: KeyboardEvent) => {
  if (event.key === "r" && isAnyEmailSelected.value) {
    markSelectedAsRead();
  } else if (event.key === "a" && archiveButton.value) {
    moveSelectedToArchives();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyboardEvent);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyboardEvent);
});
</script>
<template>
  <div class="inbox-page">
    <EmailDrawer
      v-if="selectedEmailIndex !== -1"
      :is-open="selectedEmailIndex !== -1"
      :selected-email-index="selectedEmailIndex"
      :emails="emails"
      @closeSideDrawer="toggleSideDrawer"
    ></EmailDrawer>

    <h1>Inbox</h1>
    <ul class="mail-list">
      <li class="email-actions">
        <div class="email-selected">
          <input
            type="checkbox"
            v-model="isAllEmailsSelected"
            class="checkbox"
            @change="selectAllEmails"
          />
          <div class="email-content">
            {{
              "Email Selected " +
              (selectedEmails.count > 0 ? "(" + selectedEmails.count + ")" : "")
            }}
          </div>
        </div>
        <div class="actions">
          <button
            class="action_items btn"
            @click="markSelectedAsRead"
            :disabled="!isAnyEmailSelected"
          >
            <img src="/icon-open-envelope.png" alt="Inbox Icon" />
            <span> Mark as read(r)</span>
          </button>
          <button
            class="action_items btn"
            @click="moveSelectedToArchives"
            :disabled="!archiveButton"
          >
            <img src="/icon-archive.png" alt="Inbox Icon" />
            <span> Archive (a) </span>
          </button>
        </div>
      </li>
      <li
        v-for="(email, index) in emails"
        :key="index"
        class="email-item"
        :class="{ read: email.markRead }"
      >
        <input type="checkbox" v-model="email.selected" class="checkbox" />
        <div
          class="email-content"
          :class="{ 'read-content': email.markRead }"
          @click="toggleEmail(index)"
        >
          {{ email.content }}
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
h1{
  font-size: 32px !important;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: 0em;
  text-align: left;

}

.actions {
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.email-selected {
  width: 70%;
  display: flex;
  align-items: center;
  padding: 15px;
}
.email-item.read {
  opacity: 0.5;
}
.action_items {
  display: flex;
  align-items: center;
}
.email-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: 1px solid #eee;
}
.email-actions:hover {
  background-color: unset !important;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.mail-list li:nth-child(even) {
  background: linear-gradient(0deg, #E5E7EB, #E5E7EB),
  linear-gradient(0deg, #F3F6FB, #F3F6FB);

}

.mail-list li:nth-child(odd) {
  background-color: unset;
}
li:hover {
  background: rgba(168, 199, 250, 0.5) !important;
}
.inbox-page {
  padding-top: 2%;
  height: 100vh;
  border-left: 1px solid #eee;
  padding-left: 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  padding-left: 2%;
}
.btn {
  border-radius: 30px;
  padding: 2% 5%;
}
button:hover {
  background-color: #eee !important;
  cursor: pointer;
}
button[disabled]:hover {
  background-color: unset !important;
  cursor: no-drop;
}
.mail-list {
}

.email-item {
  height: 60px;
  padding: 0px 24px 0px 24px;
  border: 1px solid #E5E7EB;
  gap: 50px;


  display: flex;
  align-items: center;
  transition: opacity 0.3s;

  &.read {
    opacity: 0.5;
  }
}
.read-content {
  font-weight: lighter !important;
}

.email-content {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
  margin-left: 3%;
}
input[type="checkbox"] {
  height: 20px;
  width: 20px;
}
img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
button {
  border: none;
  background-color: unset !important;
}
</style>
