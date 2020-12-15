import { Point } from "../types.d.ts";

type WayPoint = Point;

export interface State extends Point {
  wayPoint: WayPoint;
}

export { Point };
