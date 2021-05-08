import React from 'react';

import { Button, Edit, CancelIcon, Add } from '../../material';
import { BrsCard } from './card';
import { Editable, useEditMode, useEditable } from './use-editable';
import EditableCardProvider from './editable-card-context';

export function EditableCard({
  icon,
  title,
  getContent,
  inEditMode,
  toggleEditMode,
  Status,
  setInEditMode,
}: Editable) {
  const editMode = { inEditMode, setInEditMode, toggleEditMode };
  // React.useEffect(() => {
  //   console.log('card', inEditMode);
  // }, [inEditMode]);
  return (
    <EditableCardProvider editMode={editMode}>
      <BrsCard
        icon={icon}
        title={title}
        Status={Status}
        action={
          inEditMode ? (
            // <Button onClick={toggleEditMode} startIcon={<CancelIcon />}>
            //   Cancel
            // </Button>
            <></>
          ) : (
            <Button onClick={toggleEditMode} startIcon={<Add />}>
              Add
            </Button>
          )
        }
        content={getContent()}
      />
    </EditableCardProvider>
  );
}
export default EditableCard;
