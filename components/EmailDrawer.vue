<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  selectedEmailIndex: {
    type: Number,
    required: true,
  },
  emails: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["closeSideDrawer"]);
const closeSideDrawer = (index: number) => {
  emit("closeSideDrawer", index);
};
const dropdownElement = ref(null);

let clickListenerTimeout: any = 0;

const handleClickOutside = (event: MouseEvent) => {
  if (
    props.isOpen &&
    dropdownElement.value &&
    !dropdownElement.value.contains(event.target)
  ) {
    emit("closeSideDrawer", props.selectedEmailIndex);
  }
};
const handleKeyboardEvent = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    emit("closeSideDrawer", props.selectedEmailIndex);
  }
};
const attachClickListener = () => {
  clickListenerTimeout = setTimeout(() => {
    window.addEventListener("keydown", handleKeyboardEvent);
    document.addEventListener("click", handleClickOutside);
  }, 100);
};

const removeClickListener = () => {
  clearTimeout(clickListenerTimeout);
  window.addEventListener("keydown", handleKeyboardEvent);
  document.removeEventListener("click", handleClickOutside);
};

onMounted(() => {
  attachClickListener();
});

onUnmounted(() => {
  removeClickListener();
});
</script>
<template>
  <div>
    <div class="overlay" :class="{ active: isOpen }"></div>

    <div class="side-drawer" :class="{ open: isOpen }" ref="dropdownElement">
      <div class="drawer-content">
        <div class="actions">
          <div class="action-items">
            <img
              class="close-btn"
              src="/icon-cross.png"
              alt="Inbox Icon"
              @click="closeSideDrawer(selectedEmailIndex)"
            />
            <span>Close (Esc)</span>
          </div>
          <div class="action-items-right">
            <div class="action-items">
              <img src="/icon-inbox.png" alt="Inbox Icon" />
              <span> Mark as read (r)</span>
            </div>
            <div class="action-items">
              <img src="/icon-archive.png" alt="Inbox Icon" />
              <span> Archive (a)</span>
            </div>
          </div>
        </div>
        <div v-if="selectedEmailIndex !== -1">
          <h1>{{ emails[selectedEmailIndex].subject }}</h1>
          <p class="email-content">{{ emails[selectedEmailIndex].content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-items span{
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

}
h1{
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: #121829;
}
p{
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
 color: #4B5563;
}
.email-content {
  margin-top: 2%;
}
.close-btn {
  cursor: pointer;
}
.actions {
  padding-top: 2%;
  padding-bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.action-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.action-items-right {
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.side-drawer {
  width: 752px;
  height: 791px;
  right: -528px;
  padding: 32px;
  border: 1px;
  gap: 32px;
  z-index: 1;
  position: fixed;
  top: 0;
  //right: -900px;
  //width: 900px;
  //height: 100%;
  background-color: white;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
}

.side-drawer.open {
  right: 0;
}

.drawer-content {
  //padding: 20px;
}
img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.overlay.active {
  display: block;
}
</style>
