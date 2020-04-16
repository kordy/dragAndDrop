import React, {useState} from "react";
import DragAndDropSource from "./DragAndDropSource/DragAndDropSource";
import DragAndDropTarget from "./DragAndDropTarget/DragAndDropTarget";
import style from './DragAndDrop.styl';

const DragAndDropLayout: React.FC = () => {
  const types: dndTypes.types = ['1', '2', '3', '4'];
  const [draggable, setDraggable] = useState<dndTypes.type | null>(null);
  return (
    <div className={style.layout}>
      <DragAndDropTarget types={types} draggable={draggable}/>
      <DragAndDropSource types={types} setDraggable={setDraggable}/>
    </div>
  );
}

export default DragAndDropLayout;
