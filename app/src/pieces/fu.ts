import { howToMoveKin } from "./utils/howToMoveKin";
// Piece 추상 클래스를 상속
import { Piece } from "./piece";
import type { BoardState } from "../types/board";

// 歩兵: 앞 방향으로 한 칸만 이동 가능
// 진급 시: 'と'로 바뀌며 금장처럼 움직임
export class Fu extends Piece {
    constructor(x: number, y: number, player: number = 0) {
        super(x, y, player);   // 부모 클래스의 x, y, player 초기화
        this.name = '歩';       // 보병의 기본 이름
    }

    // 이동 가능 여부를 판단하는 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 보드 범위를 벗어나면 false
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }

        const oldX = this.x;
        const oldY = this.y;
        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);

        // 진급 시: 금장처럼 움직일 수 있음
        if (this.isUpgraded) {
            return howToMoveKin(oldX, oldY, x, y, this.player, board);
        }

        // 진급 전: 앞 방향으로 1칸 이동만 허용
        if (dx === 0 && dy === 1) {
            // Player 0: 아래 → 위 방향으로 전진
            if (this.player === 0 && y - oldY > 0) {
                return true;
            }
            // Player 1: 위 → 아래 방향으로 전진
            if (this.player === 1 && oldY - y > 0) {
                return true;
            }
        }

        return false;
    }

    // 실제 이동 및 진급 처리
    moveTo(x: number, y: number): void {
        super.moveTo(x, y);  // 좌표 갱신

        // 상대 진영에 도달하면 자동 진급
        if ((this.player === 0 && y >= 6) || (this.player === 1 && y <= 2)) {
            this.name = 'と';            // 진급 후 이름 변경
            this.isUpgraded = true;     // 진급 상태 설정
        }
    }
}