import { Page, SkipToContent } from '@patternfly/react-core';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import HeaderComponent from '../../Organisms/PageHeaderComponent/HeaderComponent';
import DataListContainer from '../DataListContainer/DataListContainer';
import './Dashboard.css';
import UserTaskDetailsPage from "../UserTaskDetailsPage/UserTaskDetailsPage";

const Dashboard: React.FC<{}> = () => {
  const pageId = 'main-content-page-layout-default-nav';
  const PageSkipToContent = (
    <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
  );

  return (
    <React.Fragment>
      <Page
        header={<HeaderComponent />}
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
        className="page"
      >
        <Route
          exact
          path="/"
          render={() => <Redirect to="/UserTasks" />}
        />
        <Route exact path="/UserTasks" component={DataListContainer} />
        <Route
          exact
          path="/UserTasks/:instanceID"
          component={UserTaskDetailsPage}
        />
      </Page>
    </React.Fragment>
  );
};

export default Dashboard;
