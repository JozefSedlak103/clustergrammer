export default (function start_animation(store) {
  const last_switch_time = store.select("animation").time;
  store.dispatch(
    store.actions.mutateAnimationState({
      run_animation: false,
      last_switch_time,
      running: true,
      duration_end: last_switch_time + store.select("animation").ani_duration,
    })
  );
});
