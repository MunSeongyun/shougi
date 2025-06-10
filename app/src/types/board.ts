import type { Piece } from "../pieces/piece";

type BoardCell = {
  x: number;
  y: number;
  piece?: Piece; // piece는 있을 수도, 없을 수도 있음 (undefined 가능)
};

// 9x9 보드를 표현하는 타입
export type BoardState = BoardCell[][];