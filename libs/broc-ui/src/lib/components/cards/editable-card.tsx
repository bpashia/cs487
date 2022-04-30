import React from 'react';

import { Button, Edit, CancelIcon, Add, Grid } from '../../material';
import { BrsCard } from './card';
import { Editable, useEditMode, useEditable } from './use-editable';
import EditableCardProvider from './editable-card-context';

export function EditableCard({
  icon,
  title,
  getContent,
  inEditMode,
  toggleEditMode,
  status,
  setInEditMode,
  additionalActions,
  hideEdit,
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
        status={status}
        action={
          inEditMode || hideEdit ? (
            // <Button onClick={toggleEditMode} startIcon={<CancelIcon />}>
            //   Cancel
            // </Button>

            <Grid container spacing={1}>
              {additionalActions &&
                additionalActions.length &&
                additionalActions.map((button, index) => (
                  <React.Fragment key={String(index)}>
                    <Grid item>{button}</Grid>
                  </React.Fragment>
                ))}
            </Grid>
          ) : (
            <Grid container spacing={1}>
              {additionalActions &&
                additionalActions.length &&
                additionalActions.map((button, index) => (
                  <React.Fragment key={String(index)}>
                    <Grid item>{button}</Grid>
                  </React.Fragment>
                ))}
              <Grid item>
                <Button onClick={toggleEditMode} startIcon={<Edit />}>
                  Edit
                </Button>
              </Grid>
            </Grid>
          )
        }
        content={getContent()}
      />
    </EditableCardProvider>
  );
}
export default EditableCard;
