// Shared siren clock. The 3D scene writes it every frame (the lead vehicle's beacon phase);
// the hero headline reads it so the light on the letters pulses with the beacons.
// pulse: -1..1 (positive = red side, negative = purple side). live: scene is rendering.
export const siren = { pulse: 0, live: false };
