import { useShake } from "@/hooks/useShake";
import { type Tile as TileType } from "@/utils/tiles";
import Tile from "@/components/board/Tile";

interface GridCellProps {
  tile: TileType;
  row: number;
  col: number;
  selected: boolean;
  shaking: boolean;
  shakeId: string;
}

export default function GridCell({
  tile,
  row,
  col,
  selected,
  shaking,
  shakeId,
}: GridCellProps) {
  const ref = useShake<HTMLDivElement>(shaking, shakeId);

  return (
    <div
      ref={ref}
      data-tile={`${row},${col}`}
      className="aspect-60/62 w-16 cursor-pointer touch-none select-none"
    >
      <Tile letter={tile.letter} points={tile.points} selected={selected} />
    </div>
  );
}
