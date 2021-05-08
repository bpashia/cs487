import React from 'react';
import Divider from '@material-ui/core/Divider';

export const BritsDivider = ({
  styles = { marginRight: 30 },
  orientation = { orientation: 'vertical' },
  flexItem = { flexItem: true },
}: {
  styles?: any;
  orientation?: React.ReactNode;
  flexItem?: React.ReactNode;
}) => <Divider {...orientation} {...flexItem} style={styles} />;

export default BritsDivider;
