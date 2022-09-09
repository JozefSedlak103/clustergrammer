export default (function calc_inverse_zscore(store) {
  const mat_data = store.select("network").mat;
  // Inv-Z-score data
  // ////////////////////////////////////////////
  const mat_iz = mat_data.map((inst_row, i) => {
    const inst_avg = store.select("network").pre_zscore.mean[i];
    const inst_std = store.select("network").pre_zscore.std[i];
    // z-score data
    const inst_row_iz = inst_row.map((x) => {
      x = x * inst_std + inst_avg;
      return x;
    });
    return inst_row_iz;
  });
  store.dispatch(
    store.actions.mutateNetworkState({
      mat_iz,
    })
  );
});
