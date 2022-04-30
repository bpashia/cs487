import React from 'react';
import {
  BorrowersIcon,
  useEditable,
  createEditables,
  Box,
  Typography,
  IconButton,
  ClaimIcon,
  SettlementIcon,
  PaymentIcon,
  MailIcon,
  Button,
  UsersIcon,
} from '@broc-ui';
import {
  CreditCard,
  Flight,
  House,
  LocalOffer,
  Money,
} from '@material-ui/icons';
import { AccountInfoForm } from './account-info-forms';
import { AccountInfoSummary } from './account-info-summary';
import { TagSettingsForm } from './tag-setting-forms';
import { TagSettingsSummary } from './tag-setting-summary';

export const { config, editables } = createEditables({
  accountInfo: {
    icon: <UsersIcon />,
    title: 'Account Info',
    //Status: ContractStatus,
    content: { editor: AccountInfoForm, summary: AccountInfoSummary },
  },
  tagSettings: {
    icon: <LocalOffer />,
    title: 'Tag Settings',
    //Status: ContractStatus,
    content: { editor: TagSettingsForm, summary: TagSettingsSummary },
  },
});

export const useEditableCards = () => {
  return editables.map(useEditable);
};
