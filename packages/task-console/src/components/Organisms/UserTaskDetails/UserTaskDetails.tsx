import { TimeAgo } from '@n1ru4l/react-time-ago';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Text,
  TextVariants,
  Title,
  Tooltip
} from '@patternfly/react-core';
import React from 'react';
import { LevelDownAltIcon, LevelUpAltIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';

interface IOwnProps {
  loading: boolean;
  data: any;
}
const UserTaskDetails: React.FC<IOwnProps> = ({ data, loading }) => {
  return (
    <Card>
      <CardHeader>
        <Title headingLevel="h3" size="xl">
          Details
        </Title>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup label="Name" fieldId="name">
            <Text component={TextVariants.p}>
              {data.UserTaskInstances[0].name}
            </Text>
          </FormGroup>
          <FormGroup label="State" fieldId="state">
            <Text component={TextVariants.p}>
              {data.UserTaskInstances[0].state}
            </Text>
          </FormGroup>
          <FormGroup label="Id" fieldId="id">
            <Text component={TextVariants.p}>
              {data.UserTaskInstances[0].id}
            </Text>
          </FormGroup>
          <FormGroup label="Description" fieldId="description">
            {data.UserTaskInstances[0].description ? (
              <Text component={TextVariants.p}>
                {data.UserTaskInstances[0].description}
              </Text>
            ) : (
              ''
            )}
          </FormGroup>
          <FormGroup label="Started" fieldId="started">
            {data.UserTaskInstances[0].started ? (
              <Text component={TextVariants.p}>
                <TimeAgo
                  date={new Date(`${data.UserTaskInstances[0].started}`)}
                  render={({ error, value }) => <span>{value}</span>}
                />
              </Text>
            ) : (
              ''
            )}
          </FormGroup>
          <FormGroup label="Completed" fieldId="completed">
            {data.UserTaskInstances[0].completed ? (
              <Text component={TextVariants.p}>
                <TimeAgo
                  date={new Date(`${data.UserTaskInstances[0].completed}`)}
                  render={({ error, value }) => <span>{value}</span>}
                />
              </Text>
            ) : (
              ''
            )}
          </FormGroup>

        </Form>
      </CardBody>
    </Card>
  );
};

export default UserTaskDetails;
