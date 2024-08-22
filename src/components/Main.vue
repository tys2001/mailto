<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { MailTemplate, defaultAppData, createTemplate } from '../types';
import MailTemplateEdit from './MailTemplateEdit.vue';
import utils from '../scripts/utils';

const state = reactive({
  appData: defaultAppData,
  editingTemplate: null as MailTemplate | null,
});

onMounted(() => {
  const appDataString = localStorage.getItem('appData');
  if (appDataString) {
    state.appData = JSON.parse(appDataString);
  }
});

const startEditTemplate = (selectedTemplate: MailTemplate) => {
  state.editingTemplate = utils.clone(selectedTemplate);
};

const addTemplate = () => {
  const newTemplate = createTemplate();
  state.editingTemplate = newTemplate;
};

const saveTemplate = (editedTemplate: MailTemplate) => {
  const updateTarget = state.appData.templateList.find(
    (t) => t.id === editedTemplate.id,
  );
  if (updateTarget) {
    state.appData.templateList = state.appData.templateList.map((t) =>
      t === updateTarget ? editedTemplate : t,
    );
  } else {
    state.appData.templateList.push(editedTemplate);
  }
  const appDataString = JSON.stringify(state.appData);
  localStorage.setItem('appData', appDataString);
  alert('Saved.');
};

const deleteTemplate = (deletingTemplate: MailTemplate) => {
  const deleteTarget = state.appData.templateList.find(
    (t) => t.id === deletingTemplate.id,
  );
  if (!deleteTarget) return;
  if (!confirm('Really?')) return;
  state.appData.templateList = state.appData.templateList.filter(
    (t) => t !== deleteTarget,
  );
  const appDataString = JSON.stringify(state.appData);
  localStorage.setItem('appData', appDataString);
  state.editingTemplate = null;
  alert('Deleted.');
};
</script>

<template>
  <div class="form_top">
    <template v-if="!state.editingTemplate">
      <div>
        <div class="text_with_button">
          Mail Templates:<button push @click="addTemplate">+</button>
        </div>
        <button
          row
          v-for="template in state.appData.templateList"
          :key="template.id"
          @click="startEditTemplate(template)"
        >
          {{ template.subject }}
        </button>
      </div>
    </template>
    <template v-if="state.editingTemplate">
      <button push @click="state.editingTemplate = null">&lt;&lt;</button>
      <MailTemplateEdit
        :mailTemplate="state.editingTemplate"
        @save="saveTemplate"
        @delete="deleteTemplate"
      >
      </MailTemplateEdit>
    </template>
  </div>
</template>

<style scoped></style>
