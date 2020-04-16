import React from "react";
import style from './DragAndDropItem.styl';
import classNames from 'classnames';

const DragAndDropItem: React.FC<IDragAndDropItem> = ({ type , className = '', ...rest }) => {
  return (
    <div className={
      classNames(
        style.item,
        className
      )}
      {...rest}
    >{type}</div>
  );
}

interface IDragAndDropItem {
  type: dndTypes.type,
  className: string,
  [prop: string]: any;
}

export default DragAndDropItem;
