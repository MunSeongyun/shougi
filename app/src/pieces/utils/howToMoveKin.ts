import type { BoardState } from "../../types/board";

// 금장(金)의 이동 가능 여부를 판단하는 함수
export const howToMoveKin = (
  oldX: number,    // 현재 x 좌표
  oldY: number,    // 현재 y 좌표
  newX: number,    // 이동하려는 x 좌표
  newY: number,    // 이동하려는 y 좌표
  player: number,   // 플레이어 번호 (0: 아래, 1: 위)
  board: BoardState // 현재 보드 상태
): boolean => {
  
  // 이동하려는 좌표가 보드 범위를 벗어나면 불가능
  if (newX < 0 || newX > 8 || newY < 0 || newY > 8) {
    return false;
  }
  if (board[8 - newY]?.[newX]?.piece?.player === player) {
      // 이동하려는 칸에 같은 플레이어의 기물이 있는 경우 이동 불가
      return false;
  }   
  // 이동 거리 계산
  const dx = Math.abs(newX - oldX); // 수평 거리
  const dy = Math.abs(newY - oldY); // 수직 거리

  // 상하좌우 1칸 이동은 공통으로 허용
  if ((dx === 0 && dy === 1) || (dx === 1 && dy === 0)) {
    return true;
  }

  // 전방 대각선 이동 허용 (플레이어 방향에 따라 판단)
  if (player === 0 && newY - oldY === 1 && dx === 1) {
    return true; // 아래 → 위 방향의 대각선
  }

  if (player === 1 && oldY - newY === 1 && dx === 1) {
    return true; // 위 → 아래 방향의 대각선
  }

  // 그 외는 이동 불가
  return false;
};
