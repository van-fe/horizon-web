import type { Router, TypesConfig } from 'vue-router';
import type { BreadcrumbItem } from '../composables/useProps';

export function onClickBreadcrumbItem(
  props: BreadcrumbItem,
  router?: TypesConfig extends Record<'$router', infer T> ? T : Router,
) {
  if (props.to) {
    if (!router && (props.to || props.replace)) {
      console.warn(
        `You haven't import "vue-router". The options of 'to' and 'replace' will be ignored.`,
      );
    }

    if (props.to && router) {
      props.replace ? router.replace(props.to) : router.push(props.to);
    }
  }
}
