import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
//
import { addInvoice, updateCalendarEvents, modifyInvoice } from '../../../../redux/slices/patient';
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock';
import useUsers from '../../../../hooks/useUsers';
// components
import { FormProvider } from '../../../../components/hook-form';
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import { getPracticeDetails } from '../../../../redux/slices/setting';


// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice, appointment,  currentPatient}) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getPracticeDetails())
  },[dispatch])

  const toAddress = currentPatient

  const { practiceDetails } = useSelector((state) => state.setting)

  const navigate = useNavigate();

  const [fromAddress, setFromAddress] = useState(false);

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  useEffect(() => {
    if(practiceDetails?.length){
      setFromAddress(practiceDetails[0])
    }
  },[practiceDetails])

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    // invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      createDate: currentInvoice?.createDate || new Date(),
      dueDate: currentInvoice?.dueDate || new Date(),
      grandTotal: currentInvoice?.grandTotal || 0,
      taxes: currentInvoice?.taxes || 0,
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || 0,
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ title: '', description: '', service: '', quantity: 0, price: 0, total: 0 }],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  useEffect(() => {
    if(currentPatient){
      setValue('invoiceTo', currentPatient.id)
    }
    if(appointment){
      setValue('appointmentId', appointment.id)
    }
  }, [currentPatient, appointment]);

  const newInvoice = {
    ...values,
    items: values.items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    })),
  };

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      navigate(-1);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      /* reset();
      setLoadingSend(false);
      navigate(PATH_DASHBOARD.invoice.list); */
      newInvoice.grandTotal = newInvoice.items.reduce((n, {price, quantity}) => n + (quantity * price), 0) + newInvoice.taxes - newInvoice.discount
      newInvoice.items = JSON.stringify(newInvoice.items)
      newInvoice.createDate = moment(newInvoice.createDate).format('YYYY-MM-DD')
      newInvoice.dueDate = moment(newInvoice.dueDate).format('YYYY-MM-DD')
      newInvoice.patientId = currentPatient.id
      console.log(newInvoice);
      if(isEdit) {
        dispatch(modifyInvoice(newInvoice, currentInvoice?.id))
      }else {
        dispatch(addInvoice(newInvoice))
      }
      
      if(appointment?.id){
        const invoicedAppointment = {...appointment}
        invoicedAppointment.status = 'Invoiced'
        dispatch(updateCalendarEvents(invoicedAppointment, invoicedAppointment.id))
      }
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.patient.payments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress fromAddress={fromAddress} toAddress={toAddress}/>
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        {/* <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton> */}

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
