// Piece 추상 클래스를 상속
import type { BoardState } from "../types/board";
import { Piece } from "./piece";

// 飛車
export class Hisya extends Piece {
    // 생성자: 위치 좌표와 플레이어 정보 설정
    constructor(x: number, y: number, player: number = 0) {
        super(x, y);            // 부모 클래스(Piece)의 생성자 호출
        this.player = player;  // 소속 플레이어 저장
        this.name = '飛';       // 기물 이름 설정 (飛車)
    }

    // 이동 가능 여부를 판단하는 메서드
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 보드 범위를 벗어나면 이동 불가
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
    
        const oldX = this.x;
        const oldY = this.y;
        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);
        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        // 현재 위치에서 안 움직인 경우
        if (dx === 0 && dy === 0) {
            return false;
        }

        // 수직 또는 수평 방향으로 이동 가능 (진급 전 기본 동작)
        if (dx === 0 || dy === 0) {
            if (dx > 0) {
                // 수평 이동: y 좌표는 그대로, x 좌표만 변경
                for (let i = 1; i < dx; i++) {
                    const stepX = oldX + (x - oldX) / dx * i;
                    if (board[8 - oldY]?.[stepX]?.piece) {
                        // 중간에 다른 기물이 있는 경우 이동 불가
                        return false;
                    }
                }  
            }
            if (dy > 0) {
                // 수직 이동: x 좌표는 그대로, y 좌표만 변경
                for (let i = 1; i < dy; i++) {
                    const stepY = oldY + (y - oldY) / dy * i;
                    if (board[8 - stepY]?.[oldX]?.piece) {
                        // 중간에 다른 기물이 있는 경우 이동 불가
                        return false;
                    }
                }
            }   
            return true;
        }

        // 진급 시: 대각선 1칸도 추가적으로 이동 가능
        if (this.isUpgraded && (dx === dy) && (dx < 2)) {
            return true;
        }

        return false;
    }

    // 실제 이동 수행 및 진급 상태 반영
    moveTo(x: number, y: number): void {
        super.moveTo(x, y);  // 부모 클래스의 위치 갱신 메서드 호출

        // 진급 조건: 상대 진영(3줄)에 도달 시 자동 진급
        if ((this.player === 0 && y >= 6) || (this.player === 1 && y <= 2)) {
            this.name = '龍';           // 진급 이름 설정 (용장, 료)
            this.isUpgraded = true;    // 진급 상태 true
        }
    }
}