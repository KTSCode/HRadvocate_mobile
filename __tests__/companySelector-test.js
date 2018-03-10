import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../store';

import reducer from '../companySelector/reducer';
import CompanySelector from '../companySelector/index';

test('Company selector renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <CompanySelector />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Reducer gets company data using company code', () => {
  var tState = reducer(undefined, {}); //TODO find a better way to do this
  it('should return the initial state', () => {
    expect(tState).toEqual({
      code: '',
      found: false,
    });
  });

  it('should handle SUBMIT_CODE', () => {
    tState = reducer(tState, {
      type: 'SUBMIT_CODE',
      code: 'abc',
    });
    expect(tState).toEqual({
      code: 'abc',
      found: true,
    });
  });
});
