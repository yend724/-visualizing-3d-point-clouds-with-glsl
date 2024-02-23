export const createCirclePoints = (config: {
  radius: number;
  height: number;
  divisions: number;
}): Float32Array => {
  const { radius, height, divisions } = config;
  const points: number[] = [];
  const degreePerPoint = 360 / divisions;

  for (let i = 0; i < 360; i += degreePerPoint) {
    const radian = (i * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = height;
    const z = radius * Math.sin(radian);

    points.push(x, y, z);
  }

  return new Float32Array(points);
};
