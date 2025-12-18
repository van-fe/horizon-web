import { defineComponent } from 'vue';

const ComponentsPage = defineComponent({
  name: 'ComponentsPage',
  props: {},
  setup: () => {
    return () => (
      <div class="component-content">
        <router-view />
      </div>
    );
  },
});

export default ComponentsPage;
