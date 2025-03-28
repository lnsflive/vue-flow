import type { Node, Edge } from "@vue-flow/core";
import { Position } from "@vue-flow/core";
// import { MarkerType } from "@vue-flow/core";
import { ref } from "vue";

const initialPos = { x: 0, y: 0 };

export const initialNodes = ref<Node[]>([
  {
    id: "create",
    type: "input",
    position: initialPos,
    data: { label: "Create" },
    style: { backgroundColor: "blue", color: "white" },
  },
  /*   {
    id: "approval",
    position: initialPos,
    data: { label: "Approval" },
    style: { backgroundColor: "lightgreen" },
  }, */
  {
    id: "inactive",
    position: initialPos,
    data: { label: "Inactive" },
    style: { backgroundColor: "grey", color: "white" },
  },
  {
    id: "export",
    position: initialPos,
    data: { label: "Export" },
    style: { backgroundColor: "navy", color: "white" },
  },
  {
    id: "rotate",
    position: initialPos,
    data: { label: "Rotate" },
    style: { backgroundColor: "teal", color: "white" },
    data: {
      label: "Rotate",
      hello: "world",
    },
  },
  {
    id: "active",
    position: initialPos,
    data: { label: "Active" },
    style: { backgroundColor: "green", color: "white" },
  },
  {
    id: "archived",
    position: initialPos,
    data: { label: "Archived" },
    style: { backgroundColor: "orange" },
  },
  {
    id: "deactivated",
    position: initialPos,
    data: { label: "Deactivated" },
    style: { backgroundColor: "yellow" },
  },
  {
    id: "destroyed",
    type: "output",
    position: initialPos,
    data: { label: "Destroyed" },
    style: { backgroundColor: "red", color: "white" },
  },
]);

export const initialEdges = ref<Edge[]>([
  {
    id: "s1",
    source: "create",
    target: "inactive",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "s2",
    source: "inactive",
    target: "export",
    type: "smoothstep",
  },
  { id: "s3", source: "export", target: "active", type: "smoothstep" },
  {
    id: "s3-1",
    source: "active",
    target: "rotate",
    type: "smoothstep",
  },
  {
    id: "s3-2",
    source: "rotate",
    target: "active",
    type: "smoothstep",
  },
  { id: "s4", source: "active", target: "archived", type: "smoothstep" },
  { id: "e5-7", source: "archived", target: "deactivated", type: "smoothstep" },
  {
    id: "e3-8",
    source: "deactivated",
    target: "destroyed",
    type: "smoothstep",
    animated: true,
  },
]);
