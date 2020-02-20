import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  GridItem,
  Page,
  PageSection,
  Title
} from '@patternfly/react-core';
import React from 'react';
import { Link } from 'react-router-dom';
import UserTaskDetails from "../../Organisms/UserTaskDetails/UserTaskDetails";
import './UserTaskDetailsPage.css';
import {useGetUserTaskByIdQuery} from '../../../graphql/types';

const UserTaskDetailsPage = ({ match }) => {
  const id = match.params.instanceID;

  const { loading, data } = useGetUserTaskByIdQuery({
    variables: { id }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Page>
        <PageSection isFilled={true}>
          <Grid gutter="md" span={12} lg={6} xl={4}>
            <GridItem span={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to={'/'}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to={'/UserTasks/'}>User Tasks</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isActive>
                  {data.UserTaskInstances[0].name}
                </BreadcrumbItem>
              </Breadcrumb>
            </GridItem>
            <GridItem span={12}>
              <Title headingLevel="h1" size="4xl">
                {data.UserTaskInstances[0].name}
              </Title>
            </GridItem>
            <GridItem>
              <UserTaskDetails loading={loading} data={data} />
            </GridItem>

          </Grid>
        </PageSection>
      </Page>
    </>
  );
};

export default UserTaskDetailsPage;
