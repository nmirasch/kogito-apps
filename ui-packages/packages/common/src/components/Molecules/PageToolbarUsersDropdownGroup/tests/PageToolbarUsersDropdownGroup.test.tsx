/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { act } from 'react-dom/test-utils';

import { getWrapper } from '../../../../utils/OuiaUtils';
import PageToolbarUsersDropdownGroup from '../PageToolbarUsersDropdownGroup';
import { DropdownGroup, DropdownItem } from '@patternfly/react-core';
import { TEST_USERS } from '../../../../environment/auth/TestUserManager';
import {
  resetTestKogitoAppContext,
  setTestKogitoAppContextModeToTest,
  testKogitoAppContext
} from '../../../../environment/auth/tests/utils/KogitoAppContextTestingUtils';

const MockedComponent = (): React.ReactElement => {
  return <></>;
};

jest.mock('@patternfly/react-core', () => ({
  ...jest.requireActual('@patternfly/react-core'),
  DropdownSeparator: () => <MockedComponent />,
  DropdownItem: () => <MockedComponent />
}));

const getDropdownItem = (wrapper, userId: string) => {
  return wrapper.findWhere(
    element =>
      element.key() === `kogito-user-management-group-test-user__${userId}`
  );
};

describe('PageToolbarUsersDropdownGroup tests', () => {
  afterEach(() => {
    resetTestKogitoAppContext();
  });

  it('Test render in prod mode', () => {
    setTestKogitoAppContextModeToTest(false);

    const wrapper = getWrapper(
      <PageToolbarUsersDropdownGroup toggleAddUsersModal={jest.fn()} />,
      'PageToolbarUsersDropdownGroup'
    );

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.children().length).toStrictEqual(0);

    expect(wrapper.find(DropdownGroup).exists()).toBeFalsy();
    expect(wrapper.find(DropdownItem).exists()).toBeFalsy();
  });

  it('Test render in test mode', () => {
    const toggleAddUserModal = jest.fn();

    const wrapper = getWrapper(
      <PageToolbarUsersDropdownGroup
        toggleAddUsersModal={toggleAddUserModal}
      />,
      'PageToolbarUsersDropdownGroup'
    );

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(DropdownGroup).exists()).toBeTruthy();
    expect(wrapper.find(DropdownItem).exists()).toBeTruthy();

    expect(getDropdownItem(wrapper, TEST_USERS[0].id).exists()).toBeFalsy();
    expect(getDropdownItem(wrapper, TEST_USERS[1].id).exists()).toBeTruthy();
    expect(getDropdownItem(wrapper, TEST_USERS[2].id).exists()).toBeTruthy();

    const addNewUser = wrapper.findWhere(
      element => element.key() === 'kogito-user-management-group-add'
    );

    expect(addNewUser.exists()).toBeTruthy();

    addNewUser.prop('onClick')();

    expect(toggleAddUserModal).toBeCalledTimes(1);
  });

  it('Test render in test mode - switch user', () => {
    const toggleAddUserModal = jest.fn();

    const wrapper = getWrapper(
      <PageToolbarUsersDropdownGroup
        toggleAddUsersModal={toggleAddUserModal}
      />,
      'PageToolbarUsersDropdownGroup'
    );

    expect(wrapper).toMatchSnapshot();

    const user0DropdownItem = getDropdownItem(wrapper, TEST_USERS[0].id);
    const user1DropdownItem = getDropdownItem(wrapper, TEST_USERS[1].id);

    expect(user0DropdownItem.exists()).toBeFalsy();
    expect(user1DropdownItem.exists()).toBeTruthy();

    act(() => {
      user1DropdownItem.prop('onClick')();
    });

    expect(testKogitoAppContext.getCurrentUser()).toStrictEqual(TEST_USERS[1]);
  });
});
