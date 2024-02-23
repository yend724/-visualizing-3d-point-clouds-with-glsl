import { test, expect } from 'vitest';
import { createCirclePoints } from './utils';

test('createCirclePoints', () => {
  const config01 = { radius: 1, height: 0, divisions: 1 };
  const points01 = createCirclePoints(config01);
  expect(points01.length).toBe(config01.divisions * 3);
  expect(points01).toEqual(new Float32Array([1, 0, 0]));

  const config02 = { radius: 2, height: 1, divisions: 2 };
  const points02 = createCirclePoints(config02);
  expect(points02.length).toBe(config02.divisions * 3);
  expect(points02).toEqual(
    new Float32Array([2, 1, 0, 2 * Math.cos(Math.PI), 1, 2 * Math.sin(Math.PI)])
  );
});
