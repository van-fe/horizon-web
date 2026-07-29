import { defineComponent, ref, resolveComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { faker } from "@faker-js/faker";
import { R as HTableColumn } from "./app.js";
import "./plugin-vue_export-helper.1tPrXgE0.js";
import "nanoid";
import "codemirror";
import "@codemirror/lang-html";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "single",
  __ssrInlineRender: true,
  setup(__props) {
    const selectionColumnDomRef = ref();
    const checkedRow = ref();
    const data = ref(new Array(20).fill(0).map((_, index) => ({
      id: index,
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 22, max: 50, mode: "age" }).toDateString(),
      address: faker.location.streetAddress()
    })));
    function isSelectable(rowData, rowIndex) {
      return ![3, 4].includes(rowIndex);
    }
    function setSelected(ignoreSelectable = false) {
      var _a;
      (_a = selectionColumnDomRef.value) == null ? void 0 : _a.toggleRowSelection(4, void 0, ignoreSelectable);
    }
    function getSelected() {
      var _a;
      console.info((_a = selectionColumnDomRef.value) == null ? void 0 : _a.getSelectionRows());
    }
    function clearSelection(ignoreSelectable = false) {
      var _a;
      (_a = selectionColumnDomRef.value) == null ? void 0 : _a.clearSelection(ignoreSelectable);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_h_table = resolveComponent("h-table");
      const _component_h_button = resolveComponent("h-button");
      _push(`<!--[--><p> current picked index: ${ssrInterpolate(checkedRow.value)}</p>`);
      _push(ssrRenderComponent(_component_h_table, {
        data: data.value,
        height: "300px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(HTableColumn), {
              ref_key: "selectionColumnDomRef",
              ref: selectionColumnDomRef,
              "selected-keys": checkedRow.value,
              "onUpdate:selectedKeys": ($event) => checkedRow.value = $event,
              type: "selection",
              align: "center",
              width: "40",
              "column-key": "id",
              selectable: isSelectable
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(HTableColumn), {
              title: "Index",
              field: "id",
              width: "80"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(HTableColumn), {
              title: "Name",
              field: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(HTableColumn), {
              title: "Birthday",
              field: "birthday"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(HTableColumn), {
              title: "Address",
              field: "address"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(HTableColumn), {
                ref_key: "selectionColumnDomRef",
                ref: selectionColumnDomRef,
                "selected-keys": checkedRow.value,
                "onUpdate:selectedKeys": ($event) => checkedRow.value = $event,
                type: "selection",
                align: "center",
                width: "40",
                "column-key": "id",
                selectable: isSelectable
              }, null, 8, ["selected-keys", "onUpdate:selectedKeys"]),
              createVNode(unref(HTableColumn), {
                title: "Index",
                field: "id",
                width: "80"
              }),
              createVNode(unref(HTableColumn), {
                title: "Name",
                field: "name"
              }),
              createVNode(unref(HTableColumn), {
                title: "Birthday",
                field: "birthday"
              }),
              createVNode(unref(HTableColumn), {
                title: "Address",
                field: "address"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="my-4"><p>`);
      _push(ssrRenderComponent(_component_h_button, {
        plain: "",
        onClick: () => setSelected(true)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`toggle index = 4 ignore selectable`);
          } else {
            return [
              createTextVNode("toggle index = 4 ignore selectable")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: "",
        onClick: () => setSelected()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`toggle index = 4 consider selectable`);
          } else {
            return [
              createTextVNode("toggle index = 4 consider selectable")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p>`);
      _push(ssrRenderComponent(_component_h_button, {
        plain: "",
        onClick: getSelected
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`get selected`);
          } else {
            return [
              createTextVNode("get selected")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p>`);
      _push(ssrRenderComponent(_component_h_button, {
        plain: "",
        onClick: () => clearSelection(true)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`clear selection ignore selectable`);
          } else {
            return [
              createTextVNode("clear selection ignore selectable")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_h_button, {
        plain: "",
        onClick: () => clearSelection()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`clear selection consider selectable`);
          } else {
            return [
              createTextVNode("clear selection consider selectable")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("demos/components/Table/single.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
