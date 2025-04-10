<template>
  <div style="width: 100vw; height: 100vh">
    <VueFlow
      :class="{ 'dark': dark }"
      class="basic-flow"
      :nodes="initialNodes"
      :edges="initialEdges"
      @nodes-initialized="layoutGraph('TB')"
      :default-viewport="{ zoom: 1.5 }"
      :connect-on-click="true"
      :snap-to-grid="true"
      :snap-grid="[15, 15]"
    >
      <!-- <InteractionControls /> -->
      <Background />
      <MiniMap />

      <Controls position="top-left">
        <ControlButton title="Reset Transform" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

        <ControlButton title="Shuffle Node Positions" @click="updatePos">
          <Icon name="update" />
        </ControlButton>

        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>

        <!-- <ControlButton title="Log `toObject`" @click="logToObject">
          <Icon name="log" />
        </ControlButton> -->

        <ControlButton title="Horiontal" @click="onHorizontal">
          <Icon name="horizontal" />
        </ControlButton>

        <ControlButton title="Vertical" @click="onVertical">
          <Icon name="vertical" />
        </ControlButton>

        <ControlButton title="Save Graph" @click="onSave">
          <Icon name="save" />
        </ControlButton>

        <ControlButton title="Restore Graph" @click="onRestore">
          <Icon name="restore" />
        </ControlButton>

        <ControlButton title="Add Random Node" @click="onAdd">
          <Icon name="add" />
        </ControlButton>

        <template #node-special="specialNodeProps">
          <SpecialNode v-bind="specialNodeProps" />
        </template>

        <template #edge-special="specialEdgeProps">
          <SpecialEdge v-bind="specialEdgeProps" />
        </template>

        <template #edge-custom="customEdgeProps">
          <CustomEdge v-bind="customEdgeProps" />
        </template>
      </Controls>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { ControlButton, Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { Background } from "@vue-flow/background";
import { useLayout } from "./composables/useLayout";
import SpecialNode from "./components/SpecialNode.vue";
import SpecialEdge from "./components/SpecialEdge.vue";
import { initialNodes, initialEdges } from "./types/constants";
import Icon from "./components/Icon.vue";
import CustomEdge from "./components/CustomEdge.vue";

const { layout } = useLayout();
const {
  fitView,
  addEdges,
  setViewport,
  toObject,
  fromObject,
  addNodes,
  onConnect,
  dimensions,
} = useVueFlow();

const dark = ref(false);
const flowKey = "vue-flow-example";

onConnect((connection) => {
  addEdges({...connection, type: "smoothstep"});
});

async function layoutGraph(direction: string) {
  initialNodes.value = layout(
    initialNodes.value,
    initialEdges.value,
    direction
  );

  nextTick(() => {
    fitView();
  });
}

function updatePos() {
  initialNodes.value = initialNodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
  });
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject());
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  // setViewport({ x: 0, y: 0, zoom: 1 });
  layoutGraph('TB');
}

function toggleDarkMode() {
  dark.value = !dark.value;
}

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onRestore() {
  const storedData = localStorage.getItem(flowKey);
  if (!storedData) return;

  const flow = JSON.parse(storedData);
  if (flow) {
    fromObject(flow);
  }
}

function onAdd() {
  const id = initialNodes.value.length + 1;

  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: {
      x: Math.random() * dimensions.value.width,
      y: Math.random() * dimensions.value.height,
    },
  };

  addNodes([newNode]);
}

function onHorizontal() {
  layoutGraph("LR");
}

function onVertical() {
  layoutGraph("TB");
}
</script>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
@import "@vue-flow/controls/dist/style.css";

.vue-flow__controls-button {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 0;
}

.vue-flow__controls {
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 5px;
  background-color: white;
}

.dark {
  background-color: #1e1e1e; /* Dark background */
  color: #ffffff; /* Light text */
}

/* Make Vue Flow itself dark */
.dark .vue-flow {
  background-color: #1e1e1e !important;
}

.dark .vue-flow__controls {
  background-color: #333 !important;
  color: white !important;
}

.dark .vue-flow__controls-button {
  background-color: #444 !important;
  color: white !important;
}

.dark .vue-flow__minimap {
  background-color: #222 !important;
}

.dark .vue-flow__background {
  stroke: rgba(255, 255, 255, 0.1);
}

</style>
