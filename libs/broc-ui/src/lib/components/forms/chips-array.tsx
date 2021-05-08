import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { useField, useFormikContext } from 'formik';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Option } from './options';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const StandaloneToggleButton = ({
  option,
  color = 'primary',
  onChange,
  initialSelected = false
}: {
  option: Option<string>;
  color: 'primary' | 'secondary' | 'default' | 'inherit';
  initialSelected: boolean;
  onChange?: (value: string) => void;
}) => {
  const [selected, setSelected] = React.useState(initialSelected);

  return (
    <Button
      value={option.value}
      variant="contained"
      color={selected ? color : 'default'}
      onClick={() => {
        setSelected(!selected);
        onChange && onChange(option.value);
      }}
      size="medium"
      style={{ margin: '2px' }}
    >
      {option.label}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

export const ChipsArray = ({
  name,
  options
}: {
  name: string;
  options: Option<string>[];
}) => {
  const classes = useStyles();

  // const [chipData, setValue] = React.useState<Option<string>[]>(options);
  // const [value, setValue] = React.useState<string[]>([]);
  const { setFieldValue } = useFormikContext<any>();
  const [{ value }, meta] = useField<string[]>(name);
  // console.log('value', { value, name, values });

  const handleChange = (clicked: string) => {
    const val = value || [];
    const selected = val.includes(clicked);
    const nextValue = selected
      ? val.filter(chip => chip !== clicked)
      : [...val, clicked];
    setFieldValue(name, nextValue);
  };

  // const handleChange = (event, value) => {
  //   console.log('onChange', value);
  //   setValue(value);
  //   // setValue(prevValue => {
  //   //   const selected = prevValue.includes(value);
  //   //   if (selected) return prevValue.filter(chip => chip !== value);
  //   //   return [...prevValue, value];
  //   // });
  // };

  return (
    <ButtonGroup>
      {options.map(option => {
        const selected = value.includes(option.value);

        return (
          <StandaloneToggleButton
            option={option}
            initialSelected={selected}
            onChange={handleChange}
            color="primary"
          />
        );
      })}
    </ButtonGroup>
  );
};

export default ChipsArray;
