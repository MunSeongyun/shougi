// Piece 추상 클래스를 상속
import type { BoardState } from "../types/board";
import { Piece } from "./piece";

// 角
export class Kaku extends Piece {
    // 생성자: 위치(x, y)와 소속 플레이어 설정
    constructor(x: number, y: number, player: number = 0) {
        super(x, y);             // 부모 클래스의 x, y 위치 초기화
        this.player = player;   // 소속 플레이어 정보 저장
        this.name = '角';        // 기물 이름 설정
    }

    // 이동 가능한 좌표인지 판단하는 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 보드 범위를 벗어나면 이동 불가
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        
        const oldX = this.x;
        const oldY = this.y;

        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);

        // 자기 자리에서 이동하지 않으면 무효
        if (dx === 0 && dy === 0) {
            return false;
        }

        // 대각선 방향으로 이동 가능
        if (dx === dy) {
            for (let i = 1; i < dx; i++) {
                const stepX = oldX + (x - oldX) / dx * i;
                const stepY = oldY + (y - oldY) / dy * i;
                if (board[8 - stepY]?.[stepX]?.piece) {
                    // 대각선 이동 중에 다른 기물이 있는 경우 이동 불가
                    return false;
                }
            }
            return true;
        }

        // 진급 시: 대각선 + 상하좌우 1칸 이내도 이동 가능
        if (
            this.isUpgraded &&
            (
                (dx === 0 && dy < 2) ||   // 상하 1칸
                (dy === 0 && dx < 2)     // 좌우 1칸
            )
        ) {
            if (board[8 - y]?.[x]?.piece?.player === this.player) {
                // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
                return false;
            }
            return true;
        }

        return false;
    }

    // 실제 이동을 수행하고 진급 여부 판단
    moveTo(x: number, y: number): void {
        super.moveTo(x, y);  // 위치 갱신

        // 진급 조건: 상대 진영(3줄)에 진입
        if ((this.player === 0 && y >= 6) || (this.player === 1 && y <= 2)) {
            this.name = '馬';           // 진급 후 이름 변경
            this.isUpgraded = true;    // 진급 상태 설정
        }
    }
}