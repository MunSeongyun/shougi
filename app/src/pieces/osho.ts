// Piece 추상 클래스를 상속
import type { BoardState } from "../types/board";
import { Piece } from "./piece";

export class Osho extends Piece {
    
    // 생성자: x, y 좌표와 플레이어 번호를 받아 초기화
    constructor(x: number, y: number, player: number = 0) {
        super(x, y);               // 부모 클래스(Piece)의 생성자 호출
        this.player = player;     // 플레이어 정보 저장
        this.name = '王';         // 기물 이름 설정 (표기로 '왕')
    }

    // 왕이 특정 좌표로 이동 가능한지 여부를 판단하는 메서드
    // 반환 타입은 boolean (true: 이동 가능, false: 이동 불가)
    canMoveTo(x: number, y: number, board: BoardState): boolean {
        // 보드 범위(0~8)를 벗어나면 이동 불가
        if (x < 0 || x > 8 || y < 0 || y > 8) {
            return false;
        }
        if (board[8 - y]?.[x]?.piece?.player === this.player) {
            // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
            return false;
        }
        // 현재 위치와 비교
        const oldX = this.x;
        const oldY = this.y;

        // 이동 거리 계산 (절댓값으로 x, y 차이)
        const dx = Math.abs(x - oldX);
        const dy = Math.abs(y - oldY);

        // 자기 자리에서 안 움직인 경우: 이동 불가
        if(dx === 0 && dy === 0) {
            return false;
        }

        // 왕은 상하좌우 및 대각선 방향으로 1칸만 이동 가능
        if(dx < 2 && dy < 2) {
            return true;
        }

        // 그 외에는 이동 불가
        return false;
    }
}
