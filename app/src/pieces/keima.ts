import { howToMoveKin } from "./utils/howToMoveKin";
// Piece 추상 클래스를 상속
import { Piece } from "./piece";
import type { BoardState } from "../types/board";

// 桂馬
export class Keima extends Piece {

    // 생성자: x, y 좌표 및 플레이어 설정
    constructor(x: number, y: number, player: number = 0) {
        super(x, y, player);     // 부모 클래스 생성자 호출
        this.name = '桂';         // 기본 이름 설정 (경마)
    }

    // 이동 가능 여부 판단
    canMoveTo(x: number, y: number, board:BoardState): boolean {
        // 보드 범위를 벗어나면 불가능
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
    

        const oldX = this.x;
        const oldY = this.y;
        const dx = Math.abs(x - oldX);

        // 진급한 경우: 금장처럼 이동
        if (this.isUpgraded) {
            return howToMoveKin(oldX, oldY, x, y, this.player, board);
        }
        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        // 진급하지 않은 경우: 2칸 앞 대각으로 "뛰기"
        if (this.player === 0 && dx === 1 && y - oldY === 2) {
            return true;
        }

        if (this.player === 1 && dx === 1 && oldY - y === 2) {
            return true;
        }

        return false;
    }

    // 이동 수행 및 진급 판단
    moveTo(x: number, y: number): void {
        super.moveTo(x, y); // 좌표 갱신

        // 진급 판정: 상대 진영(3줄)에 들어가면 진급
        if (this.player === 0 && y >= 6 || this.player === 1 && y <= 2) {
            this.name = '圭';              // 진급 이름으로 변경
            this.isUpgraded = true;       // 진급 상태 표시
        }
    }
}
