import { howToMoveKin } from "./utils/howToMoveKin";
// Piece 추상 클래스를 상속
import { Piece } from "./piece";
import type { BoardState } from "../types/board";

// 銀将
export class Gin extends Piece {
   constructor(x: number, y: number, player: number = 0) {
        super(x, y);             // 부모 클래스의 x, y 좌표 초기화
        this.player = player;   // 소속 플레이어 저장
        this.name = '銀';        // 기물 이름 설정
    }

    // 이동 가능 여부 판단 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 보드 범위를 벗어나면 불가
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
        const oldX = this.x;
        const oldY = this.y;
        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);

        // 진급한 경우: 금장처럼 움직이도록 유틸 함수 사용
        if (this.isUpgraded) {
            return howToMoveKin(oldX, oldY, x, y, this.player, board);
        }

        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        // 자기 자리에서 이동하지 않은 경우
        if (dx === 0 && dy === 0) {
            return false;
        }

        // 대각선 1칸 이동 허용
        if (dx === 1 && dy === 1) {
            return true;
        }

        // 전진 방향 1칸 이동 허용 (플레이어 방향에 따라)
        if (this.player === 0 && y - oldY === 1 && dx === 0) {
            return true;
        }
        if (this.player === 1 && oldY - y === 1 && dx === 0) {
            return true;
        }

        return false;
    }

    // 이동 수행 및 진급 처리
    moveTo(x: number, y: number): void {
        super.moveTo(x, y);  // 위치 갱신

        // 진급 조건: 상대 진영(3줄)에 도달하면 자동 진급
        if ((this.player === 0 && y >= 6) || (this.player === 1 && y <= 2)) {
            this.name = '全';           // 진급 후 이름 설정
            this.isUpgraded = true;    // 진급 상태 반영
        }
    }
}