import React from "react";
import style from './DragAndDropSource.styl';
import DragAndDropItem from "../DragAndDropItem/DragAndDropItem";

const DragAndDropSource: React.FC<IDragAndDropSource> = React.memo(({ types, setDraggable }) => (
  <div className={style.source}>
    <div className={style.sourceList}>
      {
        types.map((type: string) => (
          <DragAndDropItem
            key={type}
            type={type}
            className={style.sourceListItem}
            draggable
            onDragStart={() => setDraggable(type)}
            onDragEnd={() => setDraggable(null)}
          />
        ))
      }
    </div>
  </div>
));

interface IDragAndDropSource {
  types: dndTypes.types,
  setDraggable: (type: string) => void
}

export default DragAndDropSource;
