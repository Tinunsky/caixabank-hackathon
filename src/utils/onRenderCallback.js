import { profilerData } from "./profilerData";

export function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  const interactionArray = interactions ? Array.from(interactions) : [];

  const renderData = {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions: interactionArray,
  };

  profilerData.push(renderData);
}
