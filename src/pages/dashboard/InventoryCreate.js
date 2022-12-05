import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getInventory } from '../../redux/slices/setting';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useUsers from '../../hooks/useUsers';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import InventoryNewEditForm from '../../sections/@dashboard/e-commerce/InventoryNewEditForm';

// ----------------------------------------------------------------------

export default function InventoryCreate() {
  const { inventorydetails: items } = useUsers();
  const { themeStretch } = useSettings();
  const [currentItem, setCurrentItem] = useState([]);
  const { id } = useParams();
  const { currentInventory } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInventory(id));
  },[dispatch])
  
  const { pathname } = useLocation();
  
  const isEdit = pathname.includes('edit');
  // const currentItem = items.find((item) => paramCase(item.itemName) === name);

  return (
    <Page title="Inventory: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Inventory',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: !isEdit ? 'New Item' : id },
          ]}
        />

        <InventoryNewEditForm isEdit={isEdit} currentItem={currentInventory} />
      </Container>
    </Page>
  );
}
