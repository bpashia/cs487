import {
  Address,
  Api,
  CreditCard,
  Customer,
} from '@airline/airline-interfaces';
import {
  Delete,
  Edit,
  IconButton,
  Loading,
  Snackbar,
  Tooltip,
  Typography,
  useEditableCardApi,
} from '@broc-ui';
import {
  activeCustomer,
  customerAddresses,
  customerCreditCards,
  selectedAddress,
} from '@login';
import { Alert } from '@material-ui/lab';

import React from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

export const AddressSummary = () => {
  const [
    currentCustomerAddresses,
    setCurrentCustomerAddresses,
  ] = useRecoilState<Address[]>(customerAddresses);
  const [currentSelectedAddress, setSelectedAddress] = useRecoilState<Address>(
    selectedAddress
  );
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );
  const selectedCreditCards = useRecoilValue<CreditCard[]>(customerCreditCards);
  const cardApi = useEditableCardApi();
  const [addresses, getAddresses] = useAsyncFn<
    () => Promise<Address[]>
  >(async () => {
    const { data } = await Api.get<null, Address[]>(
      `api/local/customers/addresses/${currentActiveCustomer.email}`,
      null
    );
    return data;
  }, [currentActiveCustomer]);
  React.useEffect(() => {
    getAddresses();
  }, [getAddresses, currentActiveCustomer]);
  React.useEffect(() => {
    setCurrentCustomerAddresses(addresses.value);
  }, [addresses, setCurrentCustomerAddresses]);

  const [deleted, deleteAddress] = useAsyncFn(
    async (addressID: number) => {
      const { data } = await Api.put<
        { addressID: number; email: string },
        string
      >(`api/local/addresses/delete`, {
        addressID,
        email: currentActiveCustomer.email,
      });
      await getAddresses();
      return data;
    },
    [currentActiveCustomer]
  );
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const onDeleteClick = (address: Address) => {
    const cardAddressIds = selectedCreditCards.map((c) => c.addressID);
    if (cardAddressIds.includes(address.addressID)) {
      setErrorOpen(true);
    } else {
      deleteAddress(address.addressID);
    }
  };
  const onEditClick = (address: Address) => {
    setSelectedAddress(address);
    cardApi.toggleEditMode();
  };
  return addresses.loading ? (
    <Loading />
  ) : addresses.value && addresses.value.length ? (
    <>
      {addresses.value.map((address) => (
        <Typography key={address.addressID}>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                onDeleteClick(address);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                onEditClick(address);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {address.streetAddress}, {address.city}, {address.state} {address.zip}
        </Typography>
      ))}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error">
          Address currently in use by Payment Method.
        </Alert>
      </Snackbar>
    </>
  ) : (
    <Typography>No existing addresses</Typography>
  );
};
