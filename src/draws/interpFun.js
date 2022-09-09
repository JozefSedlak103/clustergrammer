import ease from "eases/cubic-in-out";

export default (function interpFun(store) {
  const inst_ease = ease(
    (store.select("animation").time -
      store.select("animation").last_switch_time) /
      store.select("animation").ani_duration
  );
  return inst_ease;
});
