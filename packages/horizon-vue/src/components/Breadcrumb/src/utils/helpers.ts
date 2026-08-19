import type { Router, TypesConfig } from 'vue-router';
import type { BreadcrumbItemCommonProps, BreadcrumbNavigationAction } from '@aurora/core';
import { resolveBreadcrumbNavigation } from '@aurora/core';
import type { BreadcrumbItem } from '../composables/useProps';

export function onClickBreadcrumbItem(
  props: BreadcrumbItem,
  router?: TypesConfig extends Record<'$router', infer T> ? T : Router,
): BreadcrumbNavigationAction {
  const semanticProps: BreadcrumbItemCommonProps = {
    route: props.to,
    replace: props.replace,
    clickable: props.clickable,
  };
  const action = resolveBreadcrumbNavigation(semanticProps, Boolean(router));

  if (props.to !== undefined) {
    if (!router) {
      console.warn(
        `You haven't import "vue-router". The options of 'to' and 'replace' will be ignored.`,
      );
    }

    if (router && action === 'replace') void router.replace(props.to);
    else if (router && action === 'push') void router.push(props.to);
  }

  return action;
}
