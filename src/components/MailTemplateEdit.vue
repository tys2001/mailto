<script setup lang="ts">
import { MailTemplate } from '../types';

const props = defineProps<{
  mailTemplate: MailTemplate;
}>();

const emits = defineEmits<{
  (event: 'save', value: MailTemplate): void;
  (event: 'delete', value: MailTemplate): void;
}>();

const addTo = () => {
  props.mailTemplate.toList.push('');
};
const addCc = () => {
  props.mailTemplate.ccList.push('');
};
const addBcc = () => {
  props.mailTemplate.bccList.push('');
};
const updateTo = (index: number, event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    props.mailTemplate.toList[index] = event.target.value;
  }
};
const updateCc = (index: number, event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    props.mailTemplate.ccList[index] = event.target.value;
  }
};
const updateBcc = (index: number, event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    props.mailTemplate.bccList[index] = event.target.value;
  }
};
const removeTo = (index: number) => {
  props.mailTemplate.toList.splice(index, 1);
};
const removeCc = (index: number) => {
  props.mailTemplate.ccList.splice(index, 1);
};
const removeBcc = (index: number) => {
  props.mailTemplate.bccList.splice(index, 1);
};

const openMailer = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString();
  const date = now.getDate().toString();

  const subject = props.mailTemplate.subject
    .replaceAll('{year}', year)
    .replaceAll('{month}', month)
    .replaceAll('{date}', date);
  const to = props.mailTemplate.toList.join();
  const cc = props.mailTemplate.ccList.join();
  const bcc = props.mailTemplate.bccList.join();
  const body = props.mailTemplate.body
    .replaceAll('{year}', year)
    .replaceAll('{month}', month)
    .replaceAll('{date}', date);

  const mailToUrl = `mailto:${to}?subject=${subject}&cc=${cc}&bcc=${bcc}&body=${body}`;
  location.href = encodeURI(mailToUrl);
};
</script>

<template>
  <div class="form_top">
    <div>
      <div>Subject:</div>
      <input
        type="text"
        v-model="props.mailTemplate.subject"
        class="text_wide"
      />
    </div>
    <div>
      <div class="text_with_button">
        To:<button push @click="addTo">+</button>
      </div>
      <div
        v-for="(to, index) in props.mailTemplate.toList"
        class="text_with_button"
      >
        <input type="text" :value="to" @change="(e) => updateTo(index, e)" />
        <button push @click="removeTo(index)">-</button>
      </div>
    </div>
    <div>
      <div class="text_with_button">
        CC:<button push @click="addCc">+</button>
      </div>

      <div
        v-for="(cc, index) in props.mailTemplate.ccList"
        class="text_with_button"
      >
        <input type="text" :value="cc" @change="(e) => updateCc(index, e)" />
        <button push @click="removeCc(index)">-</button>
      </div>
    </div>
    <div>
      <div class="text_with_button">
        BCC:<button push @click="addBcc">+</button>
      </div>
      <div
        v-for="(bcc, index) in props.mailTemplate.bccList"
        class="text_with_button"
      >
        <input type="text" :value="bcc" @change="(e) => updateBcc(index, e)" />
        <button push @click="removeBcc(index)">-</button>
      </div>
    </div>
    <div>
      <div>Body:</div>
      <textarea v-model="props.mailTemplate.body"></textarea>
    </div>
    <div class="buttons">
      <button push @click="openMailer">Open mailer</button>
      <button push @click="$emit('save', props.mailTemplate)">Save</button>
      <button push @click="$emit('delete', props.mailTemplate)">Delete</button>
    </div>
  </div>
</template>

<style scoped></style>
