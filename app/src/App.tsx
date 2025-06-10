import { useEffect, useMemo, useState } from "react"
import type { Piece } from "./pieces/piece";
import { Keima } from "./pieces/keima";
import { Kyosha } from "./pieces/kyosha";
import { Fu } from "./pieces/fu";
import { Gin } from "./pieces/gin";
import { Hisya } from "./pieces/hisya";
import { Kaku } from "./pieces/kaku";
import { Kin } from "./pieces/kin";
import { Osho } from "./pieces/osho";
import type { BoardState } from "./types/board";

function App() {
  // Player 0 (하단)
  const kyosha0 = new Kyosha(0, 0, 0);
  const keima0 = new Keima(1, 0, 0);
  const gin0 = new Gin(2, 0, 0);
  const kin0_1 = new Kin(3, 0, 0);
  const osho0 = new Osho(4, 0, 0);
  const kin0_2 = new Kin(5, 0, 0);
  const gin0_2 = new Gin(6, 0, 0);
  const keima0_2 = new Keima(7, 0, 0);
  const kyosha0_2 = new Kyosha(8, 0, 0);
  const kaku0 = new Kaku(1, 1, 0);
  const hisya0 = new Hisya(7, 1, 0);
  const fu0 = Array.from({ length: 9 }, (_, i) => new Fu(i, 2, 0));

  // Player 1 (상단)
  const kyosha1 = new Kyosha(0, 8, 1);
  const keima1 = new Keima(1, 8, 1);
  const gin1 = new Gin(2, 8, 1);
  const kin1_1 = new Kin(3, 8, 1);
  const osho1 = new Osho(4, 8, 1);
  const kin1_2 = new Kin(5, 8, 1);
  const gin1_2 = new Gin(6, 8, 1);
  const keima1_2 = new Keima(7, 8, 1);
  const kyosha1_2 = new Kyosha(8, 8, 1);
  const kaku1 = new Kaku(7, 7, 1);
  const hisya1 = new Hisya(1, 7, 1);
  const fu1 = Array.from({ length: 9 }, (_, i) => new Fu(i, 6, 1));
  
  // 현재 플레이어 (0: Player 0, 1: Player 1)
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  
  const [filled, setFilled] = useState<BoardState>([
    [ {x:0, y:8, piece: kyosha1}, {x:1, y:8, piece: keima1}, {x:2, y:8, piece: gin1}, {x:3, y:8, piece: kin1_1}, {x:4, y:8, piece: osho1}, {x:5, y:8, piece: kin1_2}, {x:6, y:8, piece: gin1_2}, {x:7, y:8, piece: keima1_2}, {x:8, y:8, piece: kyosha1_2} ],
    [ {x:0, y:7}, {x:1, y:7, piece: hisya1}, {x:2, y:7}, {x:3, y:7}, {x:4, y:7}, {x:5, y:7}, {x:6, y:7}, {x:7, y:7, piece: kaku1}, {x:8, y:7} ],
    [ {x:0, y:6, piece: fu1[0]}, {x:1, y:6, piece: fu1[1]}, {x:2, y:6, piece: fu1[2]}, {x:3, y:6, piece: fu1[3]}, {x:4, y:6, piece: fu1[4]}, {x:5, y:6, piece: fu1[5]}, {x:6, y:6, piece: fu1[6]}, {x:7, y:6, piece: fu1[7]}, {x:8, y:6, piece: fu1[8]} ],
    [ {x:0, y:5}, {x:1, y:5}, {x:2, y:5}, {x:3, y:5}, {x:4, y:5}, {x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5} ],
    [ {x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}, {x:4, y:4}, {x:5, y:4}, {x:6, y:4}, {x:7, y:4}, {x:8, y:4} ],
    [ {x:0, y:3}, {x:1, y:3}, {x:2, y:3}, {x:3, y:3}, {x:4, y:3}, {x:5, y:3}, {x:6, y:3}, {x:7, y:3}, {x:8, y:3} ],
    [ {x:0, y:2, piece: fu0[0]}, {x:1, y:2, piece: fu0[1]}, {x:2, y:2, piece: fu0[2]}, {x:3, y:2, piece: fu0[3]}, {x:4, y:2, piece: fu0[4]}, {x:5, y:2, piece: fu0[5]}, {x:6, y:2, piece: fu0[6]}, {x:7, y:2, piece: fu0[7]}, {x:8, y:2, piece: fu0[8]} ],
    [ {x:0, y:1}, {x:1, y:1, piece: kaku0}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1}, {x:5, y:1}, {x:6, y:1}, {x:7, y:1, piece: hisya0}, {x:8, y:1} ],
    [ {x:0, y:0, piece: kyosha0}, {x:1, y:0, piece: keima0}, {x:2, y:0, piece: gin0}, {x:3, y:0, piece: kin0_1}, {x:4, y:0, piece: osho0}, {x:5, y:0, piece: kin0_2}, {x:6, y:0, piece: gin0_2}, {x:7, y:0, piece: keima0_2}, {x:8, y:0, piece: kyosha0_2} ]
  ]);
  // 현재 사용자가 선택한 말
  const [selected, setSelected] = useState<{x: number, y: number, piece: Piece} | null>(null);
  // 현재 선택된 말이 이동 가능한 위치의 초기값
  const initialCanMove = useMemo(() => {
      return [ 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false], 
        [false, false, false, false, false, false, false, false, false]
      ]
    },[]
  )
  // 현재 선택된 말이 이동 가능한 위치
  // 초기값은 모두 false로 설정
  const [canMove, setCanMove] = useState(initialCanMove);

  // 말이 선택되면 canMove를 업데이트
  useEffect(()=>{
    if (!selected) {
      setCanMove(initialCanMove)
      return;
    }

    const piece = selected.piece;
    const moves = filled.map((item)=>{
      return item.map(block=>{
        return piece.canMoveTo(block.x,block.y, filled)
      })
    })
    setCanMove(moves);
  }, [selected, filled, initialCanMove]);


  return (
    <>{
      filled.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((block) => (
            <div
              key={`${block.x}-${block.y}`}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: (selected && selected.x === block.x && selected.y === block.y) || (canMove[8-block.y][block.x])  ? "lightblue" : "white"
              }}
              onClick={() =>{
                if(selected && (canMove[8-block.y][block.x])){
                  selected.piece.moveTo(block.x, block.y);
                  setSelected(null);
                  setFilled(prev => {
                    const newFilled = [...prev];
                    newFilled[8 - block.y][block.x] = { x: block.x, y: block.y, piece: selected.piece };
                    newFilled[8 - selected.y][selected.x] = { x: selected.x, y: selected.y };
                    return newFilled;
                  });
                  setCurrentPlayer(prev => prev === 0 ? 1 : 0); // 플레이어 전환
                  return
                }

                if (block.piece) {
                  setSelected({ x: block.x, y: block.y, piece: block.piece });
                } else {
                  setSelected(null);
                }

                // if (block.piece && block.piece.player === currentPlayer) {
                //   setSelected({ x: block.x, y: block.y, piece: block.piece });
                // } else {
                //   setSelected(null);
                // }
              }} 
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: block.piece ? (block.piece.player === 0 ? "black" : "red") : "black"
                }}>
                {`${block.piece ? block.piece.name: ""}`}
              </span>
            </div>
          ))}
          
        </div>
      ))}
      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: currentPlayer === 0 ? "black" : "red"
        }}
      >현재 플레이어: {`${currentPlayer === 0 ? 'black' : 'red'}`}</div>
    </>
  )
}

export default App
