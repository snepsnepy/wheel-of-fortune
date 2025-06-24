<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <g :transform="`translate(${radius}, ${radius})`">
      <template v-for="(segment, i) in segments" :key="i">
        <path
          :d="getPath(i)"
          :fill="segment.color"
          stroke="black"
          stroke-width="1"
        />
        <text
          :x="getLabelPosition(i).x"
          :y="getLabelPosition(i).y"
          text-anchor="middle"
          alignment-baseline="middle"
          font-size="12"
          fill="#000"
        >
          {{ segment.label }}
        </text>
      </template>
    </g>
    <polygon :points="getArrowPoints()" fill="#000" />
  </svg>
</template>

<script setup>
const size = 600;
const radius = size / 2;
const segmentCount = 12;
const angle = (2 * Math.PI) / segmentCount;
const arrowSize = 20;

const labels = [
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "SUPER_WIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
];

const getColorForLabel = (label, index) => {
  switch (label) {
    case "SUPER_WIN":
      return "#ff0000";
    case "WIN":
      return "#00b300";
    case "TRY_AGAIN":
      return "#fca311";
    default:
      return "#cccccc";
  }
};

// Create segment data
const segments = labels.map((label, i) => ({
  label,
  color: getColorForLabel(label, i),
}));

// Create SVG path for each segment
const getPath = (i) => {
  const startAngle = i * angle;
  const endAngle = startAngle + angle;

  const x1 = radius * Math.cos(startAngle);
  const y1 = radius * Math.sin(startAngle);
  const x2 = radius * Math.cos(endAngle);
  const y2 = radius * Math.sin(endAngle);

  return [
    `M 0 0`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
    `Z`,
  ].join(" ");
};

// Compute label position for each segment
const getLabelPosition = (i) => {
  const midAngle = (i + 0.5) * angle;
  const labelRadius = radius * 0.6;
  return {
    x: labelRadius * Math.cos(midAngle),
    y: labelRadius * Math.sin(midAngle),
  };
};

// Arrow points
const getArrowPoints = () => {
  const tipX = radius;
  const tipY = 600;
  return [
    `${tipX},${tipY - arrowSize}`,
    `${tipX - arrowSize},${tipY}`,
    `${tipX + arrowSize},${tipY}`,
  ].join(" ");
};
</script>
