precision highp float;

varying vec3 vColor;
uniform float uDistanceRangeMax;
uniform float uPointSize;
uniform float uTime;
struct ColorLevel {
  float ratio;
  vec3  color;
};

ColorLevel[4] COLOR_LEVELS = ColorLevel[4](
  ColorLevel(0.0, vec3(1.0, 0.0, 0.0)),
  ColorLevel(0.333, vec3(1.0, 1.0, 0.0)),
  ColorLevel(0.667, vec3(0.0, 1.0, 1.0)),
  ColorLevel(1.0, vec3(0.0, 0.0, 1.0))
);


vec3 ZERO_POSITION = vec3(0.0, 0.0, 0.0);

float calcDistance(vec3 position) {
  return distance(ZERO_POSITION, position);
}

float calcRatio (float value, float rangeMax) {
  return max(min(value / rangeMax, 1.0), 0.0);
}

vec3 calcColor(float ratio) {
  int levelIndex = 0;

  for (int i = 0; i < COLOR_LEVELS.length(); i++) {
    if (ratio <= COLOR_LEVELS[i].ratio) {
      levelIndex = i;
      break;
    }
  }

  if (levelIndex == 0) {
    ColorLevel level = COLOR_LEVELS[levelIndex];
    return level.color;
  }

  ColorLevel currentLevel = COLOR_LEVELS[levelIndex];
  ColorLevel prevLevel = COLOR_LEVELS[levelIndex - 1];

  float colorRatioLen = currentLevel.ratio - prevLevel.ratio;
  if (colorRatioLen <= 0.0) {
    return currentLevel.color;
  }

  float colorRatio = (ratio - prevLevel.ratio) / colorRatioLen;

  float r = prevLevel.color[0] + (currentLevel.color[0] - prevLevel.color[0]) * colorRatio;
  float g = prevLevel.color[1] + (currentLevel.color[1] - prevLevel.color[1]) * colorRatio;
  float b = prevLevel.color[2] + (currentLevel.color[2] - prevLevel.color[2]) * colorRatio;

  return vec3(r, g, b);
}

void main() {
  float distance = calcDistance(position);
  float ratio = calcRatio(distance, uDistanceRangeMax);
  vec3 color = calcColor(ratio);
  float positionY = position.y + sin(uTime + position.x * 3.0 + position.y * 2.0) * 0.5;
  vec3 movePosition = vec3(position.x, positionY, position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(movePosition, 1.0);

  gl_PointSize = uPointSize;

  vColor = color;
}

