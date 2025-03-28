<script setup>
defineProps(["id", "sourceX", "sourceY", "targetX", "targetY"]);
</script>

<template>
  <path
    :d="`M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`"
    stroke="black"
    fill="none"
    stroke-width="2"
  />
</template>
