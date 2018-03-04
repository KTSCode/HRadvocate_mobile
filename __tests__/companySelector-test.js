//XXX most of this stuff is from https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
import React from 'react'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import expect from 'expect'
import store from '../store';

import * as actions  from '../companySelector/actions'
import reducer from '../companySelector/reducer'
import CompanySelector from '../companySelector/index'

//XXX IDK what these are doing
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('Company selector renders correctly', () => {
  const tree = renderer.create(
      <Provider store={store}>
        <CompanySelector />
      </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('actions', () => {
  it('creates the DATA_AVAILABLE when data has been read in from companies.json', () => {
    const expectedActions = [{
      type: 'DATA_AVAILABLE',
      data: [{
        "name": "ABC Company",
        "code": "abc"
      }]
    }]
    //XXX IDK what this is doing
    const store = mockStore({})
    //XXX do I have to use then here?
    return store.dispatch(actions.getCompanyData('abc')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
     dataReducer: {
        data: [],
        company: false
      }
    })
  })

  it('should handle DATA_AVAILABLE with data', () => {
    expect(
      reducer({}, {
        type: 'DATA_AVAILABLE',
        data: [{
          "name": "ABC Company",
          "code": "abc"
        }]
      })
    ).toEqual({
      dataReducer: {
        data: [{
          "name": "ABC Company",
          "code": "abc"
        }],
        company: true
      }
    })
  })

  it('should handle DATA_AVAILABLE without data', () => {
    expect(
      reducer({}, {
        type: 'DATA_AVAILABLE',
        data: []
      })
    ).toEqual({
      dataReducer: {
        data: [],
        company: false
      }
    })
  })
})
