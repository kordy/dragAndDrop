import React, {useCallback, useState} from "react";
import classNames from 'classnames';
import style from './DragAndDropTarget.styl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DragAndDropItem from "../DragAndDropItem/DragAndDropItem";

const transitionProps = {
  timeout: {
    enter: 150,
    exit: 0
  },
  classNames: {
    enter: style.enter,
    enterActive: style.enterActive
  },
  unmountOnExit: true
}

const DragAndDropTarget: React.FC<IDragAndDropTarget> = ({ types, draggable }) => {
  const getInitialObjectsState = useCallback(
    () => types.reduce((objectsState, type) => ({ ...objectsState, [type]: [] }), {})
    , [types]
  );
  const [objectsState, setObjectsState] = useState(getInitialObjectsState);
  const [isHighlighted, setHighlight] = useState(null);

  const addDraggable = useCallback(() => {
    setObjectsState({
      ...objectsState,
      [draggable]: [ ...objectsState[draggable], draggable]
    })
    setHighlight(false)
  }, [draggable])

  const removeItem = (type: dndTypes.type) => {
    setObjectsState({
      ...objectsState,
      [type]: objectsState[type].slice(0, -1)
    })
  }

  return (
    <div
      className={classNames(style.targetZone, { [style.noPointerEvents]: draggable } )}
      onDragEnter={(e) => setHighlight(true)}
      onDragLeave={(e) => setHighlight(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={addDraggable}
    >
      {
        types.map(type => (
          <div
            key={type}
            className={
              classNames(style.targetZoneCol, {
                [style.isHighLighted]: isHighlighted && draggable === type
              })
            }
          >
            <div>Type {type}</div>
            <TransitionGroup component={null}>
            {
              objectsState[type].map((item: dndTypes.type, i: number) => (
                <CSSTransition key={i} {...transitionProps}>
                  <DragAndDropItem
                    type={item}
                    className={style.targetZoneColItem}
                    onDoubleClick={() => removeItem(type)}
                  />
                </CSSTransition>
              ))
            }
            </TransitionGroup>

            <DragAndDropItem
              type={type}
              className={
                classNames(
                  style.targetZoneColItem,
                  style.isHighLighted,
                  { [style.isShown]: isHighlighted && draggable === type } )
              }
            />
          </div>
        ))
      }
    </div>
  );
}

interface IDragAndDropTarget {
  types: dndTypes.types,
  draggable: string
}

export default DragAndDropTarget;
