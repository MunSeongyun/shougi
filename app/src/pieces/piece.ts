import type { BoardState } from "../types/board"

// 추상 클래스: 이 클래스를 직접 인스턴스화할 수 없고, 반드시 상속받아 사용해야 함
export abstract class Piece {
  // 클래스의 필드(멤버 변수) 선언 및 타입 명시

  public x: number             // 기물의 현재 x 좌표
  public y: number             // 기물의 현재 y 좌표
  public name: string = ''     // 기물의 이름, 초기값은 빈 문자열
  public isUpgraded: boolean = false // 진급 여부, 기본값은 false
  public player: number = 0    // 소유한 플레이어 (0 또는 1), 기본값은 0

  // 생성자: 객체 생성 시 초기값 설정
  constructor(x: number, y: number, player: number = 0) {
    this.player = player       // 인자로 받은 player 값을 멤버 변수에 할당
    this.x = x                 // 인자로 받은 x 값을 멤버 변수에 할당
    this.y = y                 // 인자로 받은 y 값을 멤버 변수에 할당
  }

  // 위치 이동 메서드
  moveTo(x: number, y: number): void {
    this.x = x                 // x 좌표 갱신
    this.y = y                 // y 좌표 갱신
  }

  // 추상 메서드: 자식 클래스에서 반드시 구현해야 함
  // 이동 가능한 좌표인지 판단하는 함수이며, 반환값은 boolean
  abstract canMoveTo(x: number, y: number, filled: BoardState): boolean
}
