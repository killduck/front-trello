import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {


    const { attributes, listeners, setNodeRef, transform } = useDroppable({
        id: props.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}