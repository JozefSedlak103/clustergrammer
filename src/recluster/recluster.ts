import { transpose } from "mathjs";
import { Regl } from "regl";
import * as _ from "underscore";
import { CamerasManager } from "../cameras/camerasManager";
import { CatArgsManager } from "../cats/manager/catArgsManager";
import changeGroups from "../dendrogram/changeGroups";
import runReorder from "../reorders/runReorder";
import { NamespacedStore } from "../state/store/store";
import { hcluster } from "./clusterfckLocal/hcluster";
import distanceFunctions from "./distanceFunctions";
import get_order_and_groups_clusterfck_tree from "./getOrderAndGroupsClusterfckTree";

export default function recluster(
  regl: Regl,
  store: NamespacedStore,
  catArgsManager: CatArgsManager,
  camerasManager: CamerasManager
) {
  // get potential recluster options
  const {
    potential_recluster: { distance_metric, linkage_type },
  } = store.select("matrix");
  const new_view: Record<string, any> = {};
  new_view.N_row_sum = "null";
  new_view.N_row_var = "null";
  new_view.distance_metric = distance_metric;
  new_view.linkage_type = linkage_type;
  const view_name = distance_metric + "_" + linkage_type;
  new_view.name = view_name;
  // constructing new nodes from old view (does not work when filtering)
  new_view.nodes = {};
  new_view.nodes.row_nodes = _.clone(store.select("network").row_nodes);
  new_view.nodes.col_nodes = _.clone(store.select("network").col_nodes);
  _.each(["row", "col"], function (axis) {
    let mat;
    let names;
    let name_nodes: string;
    if (axis === "row") {
      mat = _.clone(store.select("network").mat);
      names = store
        .select("network")
        .row_nodes.map((x: any) => x.name.split(": ")[1]);
      name_nodes = "row_nodes";
    } else {
      // TODO: HERE:
      mat = _.clone(store.select("network").mat);
      if (mat) {
        mat = transpose(mat);
        // TODO: should transpose affect the state? if so we should do the next lines instead
        // store.dispatch(
        //   mutateNetworkState({
        //     mat: transpose<number[][]>(mat),
        //   })
        // );
      }
      names = store
        .select("network")
        .col_nodes.map((x: any) => x.name.split(": ")[1]);
      name_nodes = "col_nodes";
    }
    // average, single, complete
    // TODO: here:
    const clusters = hcluster(
      mat,
      distanceFunctions[
        distance_metric as "euclidean" | "cosine" | "correlation"
      ],
      linkage_type
    );
    const order_info = get_order_and_groups_clusterfck_tree(clusters, names);
    // row or column nodes
    const rc_nodes = new_view.nodes[name_nodes].map((x: any, i: number) => {
      const inst_order = order_info.info[i];
      return {
        ...x,
        clust: inst_order.order,
        group: inst_order.group,
      };
    });
    store.dispatch(
      store.actions.mutateNetworkState({
        [name_nodes]: rc_nodes,
      })
    );
  });
  // run reordering
  runReorder(regl, store, catArgsManager, camerasManager, "row", "clust");
  runReorder(regl, store, catArgsManager, camerasManager, "col", "clust");
  const group_level = store.select("dendro").group_level;
  changeGroups(regl, store, "row", group_level.row);
  changeGroups(regl, store, "col", group_level.col);
}
