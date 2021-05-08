import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import {
  Address,
  AddressRequest,
  Api,
  CreditCard,
  Flight,
  FlightSearch,
} from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import {
  activeCustomer,
  currentSearchResults,
  customerAddresses,
  customerCreditCards,
} from '@login';
import { creditCardSchema } from './credit-card.schema';
import { CreditCardFields } from './credit-card-fields';
import { FlightSearchFields } from './flight-search-fields';
import { flightSearchSchema } from './flight-search.schema';
import { FlightSearchSummary } from './flight-search-summary';

export const FlightSearchForm = () => {
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );
  const [currentSearchFormResult, setCurrentSearchFormResult] = useRecoilState<{
    economyFlights: Flight[];
    firstClassFlights: Flight[];
  }>(currentSearchResults);
  const [searchForm, setSearchForm] = React.useState<FlightSearch>(null);
  const flightSearchInit = flightSearchSchema.cast({ flightDate: new Date() });
  const [result, getFlights] = useAsyncFn(async () => {
    const { data } = await Api.get<{
      economyFlights: Flight[];
      firstClassFlights: Flight[];
    }>(`api/local/customers/available-flights`);
    return data;
  }, []);
  const onSubmit = async (values, actions) => {
    console.log('HERE');
    setSearchForm(values);
    console.log({ searchForm });
    await getFlights();

    actions.setSubmitting(false);
  };
  React.useEffect(() => {
    if (result.value) {
      setCurrentSearchFormResult(result.value);
      console.log({ result: result.value });
    }
  }, [setCurrentSearchFormResult, result]);

  return (
    <>
      <Formik<FlightSearch>
        initialValues={flightSearchInit}
        onSubmit={onSubmit}
        validationSchema={flightSearchSchema}
        enableReinitialize={true}
      >
        <Form>
          <FlightSearchFields />
        </Form>
      </Formik>
      {currentSearchFormResult && searchForm && (
        <FlightSearchSummary flightSearch={searchForm} />
      )}
    </>
  );
};
