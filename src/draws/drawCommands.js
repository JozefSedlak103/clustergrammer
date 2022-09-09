import draw_webgl_layers from "./drawWebglLayers";

export default (function drawCommands(
  regl,
  store,
  catArgsManager,
  camerasManager
) {
  const dispatch = store.dispatch;

  // if mousing over categories initialize all categories to low opacity
  let mousing_over_cat = false;
  if (store.select("tooltip").tooltip_type) {
    if (store.select("tooltip").tooltip_type.includes("-cat-")) {
      // This is required to updated category opacity when mousing over
      catArgsManager.regenerateCatArgsArrs(store);
      dispatch(
        store.actions.mutateInteractionState({
          need_reset_cat_opacity: true,
        })
      );
      mousing_over_cat = true;
    }
  }
  if (
    store.select("interaction").need_reset_cat_opacity &&
    mousing_over_cat === false
  ) {
    catArgsManager.regenerateCatArgsArrs(store);
    dispatch(
      store.actions.mutateInteractionState({
        need_reset_cat_opacity: false,
      })
    );
  }
  draw_webgl_layers(regl, store, catArgsManager, camerasManager);
  if (store.select("labels").draw_labels) {
    dispatch(
      store.actions.mutateLabelsState({
        draw_labels: false,
      })
    );
  }
});
