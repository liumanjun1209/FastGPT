import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Loading from '@fastgpt/web/components/common/MyLoading';
import AppContextProvider from '@/components/AppContext';

const WorkflowEdit = dynamic(() => import('@/components/Workflow'), {
  ssr: false,
  loading: () => <Loading fixed={false} />
});

const FlowPage = () => {
  return (
    <AppContextProvider>
      <WorkflowEdit />
    </AppContextProvider>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'workflow', 'app']))
    }
  };
}

export default FlowPage;
