//XXX most of this stuff is from https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
import React from 'react'
import {Provider} from 'react-redux';
//import thunk from 'redux-thunk'
//import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
//import expect from 'expect'
import store from '../store';

import * as actions  from '../companySelector/actions'
import reducer from '../companySelector/reducer'
import CompanySelector from '../companySelector/index'

//XXX IDK what these are doing
//const middlewares = [thunk]
//const mockStore = configureMockStore(middlewares)

test('Company selector renders correctly', () => {
  const tree = renderer.create(
      <Provider store={store}>
        <CompanySelector />
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({"activeCompany": null, "companies": []})
  })

  it('should handle SET_ACTIVE_COMPANY', () => {
    expect(reducer({"activeCompany": null, "companies": []}, {
      type: 'FETCH_COMPANIES',
      code: 'abc'
    })).toEqual({"activeCompany": 'abc', "companies": []})
  })


})
