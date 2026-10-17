import { describe, expect, it } from 'vitest';
import { Flight, type FlightCamera } from './flight.ts';
import { Vector3 } from './babylon.ts';
import { northAlpha } from '../domain/compass.ts';

/** What Babylon does to an ArcRotateCamera on each rendered frame, after the app has set its pose. */
const render = (c: FlightCamera, inertia: number): void => {
  c.alpha += c.inertialAlphaOffset;
  c.beta += c.inertialBetaOffset;
  c.inertialAlphaOffset *= inertia;
  c.inertialBetaOffset *= inertia;
};

const camera = (): FlightCamera => ({
  target: new Vector3(0, 0, 0),
  radius: 800,
  alpha: -3.4,
  beta: 1,
  inertialAlphaOffset: -0.1825,
  inertialBetaOffset: 0.02,
  inertialRadiusOffset: 0,
  inertialPanningX: 0,
  inertialPanningY: 0,
});

describe('a flight that starts while the view is still gliding from a turn', () => {
  it('ends facing north and stays there, however slowly the frames come', () => {
    const c = camera();
    const flight = new Flight(c);
    flight.turnTo(northAlpha(c.alpha));
    for (let frame = 0; frame < 60; frame += 1) {
      flight.tick(700);
      render(c, 0.88);
    }
    expect(flight.flying).toBe(false);
    expect(c.alpha).toBeCloseTo(northAlpha(-3.4), 9);
  });

  it('is not carried off by the old glide on the frame it lands', () => {
    const c = camera();
    const flight = new Flight(c);
    flight.flyTo(new Vector3(100, 0, 100), 400, 0.9);
    flight.tick(1600);
    render(c, 0.88);
    expect(c.beta).toBeCloseTo(0.9, 9);
    expect(c.inertialAlphaOffset).toBe(0);
    expect(c.inertialBetaOffset).toBe(0);
  });

  it('flying home also drops the glide', () => {
    const c = camera();
    const flight = new Flight(c);
    flight.flyHome();
    expect(c.inertialAlphaOffset).toBe(0);
    expect(flight.flying).toBe(true);
  });
});
