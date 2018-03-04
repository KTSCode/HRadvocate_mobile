//XXX most of this stuff is from https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import expect from 'expect'

import * as actions  from '../companySelector/actions'
import CompanySelector from '../companySelector/index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

//test('Company selector renders correctly', () => {
//  const tree = renderer.create(<CompanySelector />).toJSON();
//  expect(tree).toMatchSnapshot();
//});

describe('actions', () => {
  it('creates the DATA_AVAILABLE when data has been read in from companies.json', () => {
    const expectedActions = [{
      type: 'DATA_AVAILABLE',
      data: [{
        "name": "ABC Company",
        "code": "abc"
      }]
    }]
    const store = mockStore({})
    return store.dispatch(actions.getCompanyData('abc')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
