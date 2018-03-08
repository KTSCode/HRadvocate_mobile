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
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      activeCompany: null,
      companies: [],
      text: '',
    });
  });

  //it('should handle SET_ACTIVE_COMPANY', () => {
  //  expect(reducer({"activeCompany": null, "companies": []}, {
  //    type: 'FETCH_COMPANIES',
  //    code: 'abc'
  //  })).toEqual({"activeCompany": 'abc', "companies": []})
  //})
  
});
