import type { Node, Edge } from "@vue-flow/core";
import { MarkerType } from "@vue-flow/core";
import { ref } from "vue";

const initialPos = { x: 0, y: 0 };

export const initialNodes = ref<Node[]>([
  {
    id: "0",
    type: "special",
    position: initialPos,
    data: { label: "Create" },
  },
  {
    id: "1",
    position: initialPos,
    data: { label: "Approval" },
  },
  {
    id: "2",
    position: initialPos,
    data: { label: "Inactive" },
  },
  {
    id: "3",
    position: initialPos,
    data: { label: "Export" },
  },
  {
    id: "4",
    position: initialPos,
    data: { label: "Rotate" },
  },
  {
    id: "5",
    position: initialPos,
    data: { label: "Active" },
  },
  {
    id: "6",
    type: "output",
    position: initialPos,
    data: { label: "Archived" },
  },
  {
    id: "7",
    type: "output",
    position: initialPos,
    data: { label: "Deactivated" },
  },
  {
    id: "8",
    type: "output",
    position: initialPos,
    data: { label: "Destroyed" },
  },
]);

export const initialEdges = ref<Edge[]>([
  {
    id: "e0-1",
    source: "0",
    target: "1",
    animated: true,
    markerEnd: MarkerType.Arrow,
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: MarkerType.Arrow,
  },
  { id: "e2-3", source: "2", target: "3", markerEnd: MarkerType.Arrow },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    markerStart: MarkerType.ArrowClosed,
    markerEnd: MarkerType.ArrowClosed,
  },
  { id: "e5-6", source: "5", target: "6", markerEnd: MarkerType.Arrow },
  { id: "e5-7", source: "5", target: "7", markerEnd: MarkerType.Arrow },
  { id: "e3-8", source: "3", target: "8", markerEnd: MarkerType.Arrow },
]);
