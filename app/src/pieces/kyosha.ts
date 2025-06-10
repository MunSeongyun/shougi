import { howToMoveKin } from "./utils/howToMoveKin";
// Piece 추상 클래스를 상속
import { Piece } from "./piece";
import type { BoardState } from "../types/board";

// 香車
export class Kyosha extends Piece {

    // 생성자: 위치(x, y)와 플레이어 정보 초기화
    constructor(x: number, y: number, player: number = 0) {
        super(x, y, player);     // 부모 클래스 생성자 호출
        this.name = '香';         // 기본 이름 설정
    }

    // 이동 가능한지 판단하는 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 좌표가 보드 범위를 벗어나면 불가능
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
        const oldX = this.x;
        const oldY = this.y;
        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);

        // 진급한 경우 → 금장처럼 움직일 수 있음
        if (this.isUpgraded) {
            return howToMoveKin(oldX, oldY, x, y, this.player, board); // 외부 유틸 함수 호출
        }
        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        // 진급하지 않은 경우 → 수직(앞 방향)으로만 무제한 이동 가능
        if (dx === 0 && dy > 0) {
            // 플레이어 0: 아래에서 위로 향함 (y 증가 방향만 허용)
            if (this.player === 0 && y - oldY > 0) {
                // 이동하려는 칸 사이에 다른 기물이 있는지 확인
                for (let i = oldY + 1; i < y; i++) {
                    if (board[8 - i]?.[x]?.piece) {
                        return false; // 중간에 다른 기물이 있으면 이동 불가
                    }
                }
                return true;
            }
            // 플레이어 1: 위에서 아래로 향함 (y 감소 방향만 허용)
            if (this.player === 1 && oldY - y > 0) {
                // 이동하려는 칸 사이에 다른 기물이 있는지 확인
                for (let i = oldY - 1; i > y; i--) {
                    if (board[8 - i]?.[x]?.piece) {
                        return false; // 중간에 다른 기물이 있으면 이동 불가
                    }
                }
                return true;
            }
        }

        // 그 외의 경우는 불가능
        return false;
    }

    // 실제 이동 시 위치 갱신 및 진급 여부 판단
    moveTo(x: number, y: number): void {
        super.moveTo(x, y);  // 부모 클래스의 위치 갱신

        // 플레이어 0: 상대 진영(6~8), 플레이어 1: 상대 진영(0~2)에 들어가면 진급
        if (this.player === 0 && y >= 6 || this.player === 1 && y <= 2) {
            this.name = '杏';            // 진급 이름으로 변경
            this.isUpgraded = true;     // 진급 상태로 설정
        }
    }
}
