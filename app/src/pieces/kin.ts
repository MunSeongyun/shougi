import { howToMoveKin } from "./utils/howToMoveKin";
// Piece 추상 클래스를 상속
import { Piece } from "./piece";
import type { BoardState } from "../types/board";

// 金
export class Kin extends Piece {
    // 생성자: 기물의 좌표(x, y)와 소속 플레이어 번호를 초기화
    constructor(x: number, y: number, player: number = 0) {
        super(x, y);             // 부모 클래스의 x, y 좌표 초기화
        this.player = player;   // 소속 플레이어 저장
        this.name = '金';       // 이름 설정 (금장)
    }

    // 금장의 이동 가능 여부를 판별하는 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 외부 함수로 이동 규칙 위임 (위치, 대상 위치, 플레이어)
        return howToMoveKin(this.x, this.y, x, y, this.player, board);
    }
}