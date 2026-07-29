import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { C as $confirm, $ as $message } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create-update",
  __ssrInlineRender: true,
  setup(__props) {
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(void 0);
        }, ms);
      });
    }
    const tagList = ref(["北京", "上海"]);
    async function onBeforeCreate(tag) {
      const close = await $confirm(`是否确定创建 ${tag} ？`, "提示");
      close();
      await sleep(2e3);
      tagList.value.push(tag);
    }
    async function onBeforeEdit(newVal, oldVal, id) {
      const close = await $confirm(`是否确定修改 ${oldVal} 为 ${newVal} ？`, "提示");
      close();
      await sleep(2e3);
      tagList.value[id] = newVal;
    }
    async function onBeforeClose(id) {
      await sleep(2e3);
      tagList.value.splice(id, 1);
    }
    function onCreated(tag) {
      $message(`创建了${tag}标签`);
    }
    function onEdited(newVal, oldVal, id) {
      $message(`由 ${oldVal} 修改为 ${newVal}，下标: ${id}`);
    }
    function onClosed(id) {
      $message(`删除了下标为 ${id} 的标签`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_tag_group = resolveComponent("h-tag-group");
      const _component_h_tag = resolveComponent("h-tag");
      _push(ssrRenderComponent(_component_h_tag_group, mergeProps({
        "use-create": true,
        editable: true,
        "before-create": onBeforeCreate,
        "before-edit": onBeforeEdit,
        "before-close": onBeforeClose,
        "max-tags": 5,
        onCreated,
        onEdited,
        onClosed
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tagList.value, (item, index) => {
              _push2(ssrRenderComponent(_component_h_tag, {
                id: index,
                key: index,
                closable: true,
                clickable: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tagList.value, (item, index) => {
                return openBlock(), createBlock(_component_h_tag, {
                  id: index,
                  key: index,
                  closable: true,
                  clickable: false
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item), 1)
                  ]),
                  _: 2
                }, 1032, ["id"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Tag/create-update.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
