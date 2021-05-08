import React from 'react';

import { Button, Edit, CancelIcon } from '../../material';

export function useBoolean(
  initialState = false
): [boolean, { set: (value: boolean) => void; toggle: () => void }] {
  const [state, setState] = React.useState(initialState);

  const toggle = React.useCallback(() => {
    setState(prev => !prev);
  }, [setState]);

  return [
    React.useMemo(() => state, [state]),
    {
      set: setState,
      toggle
    }
  ];
}

export interface EditMode {
  inEditMode: boolean;
  setInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditMode: () => void;
}

export function useEditMode(initialInEditMode = false): EditMode {
  const [
    inEditMode,
    { set: setInEditMode, toggle: toggleEditMode }
  ] = useBoolean(initialInEditMode);
  return {
    inEditMode,
    setInEditMode,
    toggleEditMode
  };
}

export interface OptionalHandleNextProp {
  handleNext?: () => void;
}

export interface Editable extends EditMode {
  key: string;
  title: string;
  icon?: React.ReactNode;
  Status?: () => React.ReactNode;
  getContent: () => React.ReactNode;
}

export interface EditableConfig<
  T extends OptionalHandleNextProp = OptionalHandleNextProp
> {
  key?: string;
  initialInEditMode?: boolean;
  title: string;
  icon?: React.ReactNode; //React.FunctionComponent;
  Status?: () => React.ReactNode;
  content: {
    editor: React.FunctionComponent<T>;
    summary: React.FunctionComponent;
  };
}

export interface EditableProps<
  T extends OptionalHandleNextProp = OptionalHandleNextProp
> extends EditableConfig<T> {
  key: string;
}

export const createEditables = (config: {
  [key: string]: EditableConfig;
}): { config: { [key: string]: EditableProps }; editables: EditableProps[] } =>
  Object.entries(config).reduce(
    (acc, [key, val]) => {
      const editable = { ...val, key };
      acc.config[key] = editable;
      acc.editables.push(editable);
      return acc;
    },
    { config: {}, editables: [] }
  );

export function useEditable<
  T extends OptionalHandleNextProp = OptionalHandleNextProp
>({
  initialInEditMode = false,
  content: { editor: Editor, summary: Summary },
  ...rest
}: EditableProps): Editable {
  const { inEditMode, setInEditMode, toggleEditMode } = useEditMode(
    initialInEditMode
  );

  const getContent = React.useCallback(
    () => (inEditMode ? <Editor handleNext={toggleEditMode} /> : <Summary />),
    [inEditMode, toggleEditMode]
  );

  return {
    ...rest,
    inEditMode,
    setInEditMode,
    toggleEditMode,
    getContent
  };
}
