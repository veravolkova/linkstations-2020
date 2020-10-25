import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Solution from './Solution'
import calculator from '../utils/calculator'

const devices = [
  {
    id: 1,
    longitude: 0,
    latitude: 0
  },
  {
    id: 2,
    longitude: 100,
    latitude: 100
  },
  {
    id: 3,
    longitude: 15,
    latitude: 10
  },
]

const stations = [
  {
    id: 1,
    latitude: 0,
    longitude: 0,
    reach: 10
  },
  {
    id: 2,
    latitude: 20,
    longitude: 20,
    reach: 5
  },
  {
    id: 3,
    latitude: 10,
    longitude: 0,
    reach: 12
  }
]

describe('Solution', () => {

  test('renders content', () => {

    const component = render(
      <Router>
        <Solution device={devices[0]} stations={stations}/>
      </Router>
    )
    expect(component.container).toHaveTextContent(
      'The best station is'
    )
  })

  test('renders content correctly if no link station', () => {

    const component = render(
      <Router>
        <Solution device={devices[1]} stations={stations}/>
      </Router>
    )
    expect(component.container).toHaveTextContent(
      'No link station within reach'
    )
  })

  test('renders content correctly if link station is found', () => {

    const component = render(
      <Router>
        <Solution device={devices[0]} stations={stations}/>
      </Router>
    )
    expect(component.container).toHaveTextContent(
      'Best link station for point'
    )
  })

  test('get distance function works correctly', () => {
    const result = calculator.getDistance(devices[0],stations[2]).toFixed(2)
    expect(result).toBe('10.00')
  })

  test('get power function works correctly', () => {
    const result = calculator.getPower(stations[2].reach,
      calculator.getDistance(devices[0],stations[2])).toFixed(2)
    expect(result).toBe('4.00')
  })

  test('returns correct value for the best linked station', () => {
    const component = render(
      <Router>
        <Solution device={devices[0]} stations={stations}/>
      </Router>
    )
    expect(component.container).toHaveTextContent(
      'Best link station for point 0, 0 is 0, 0 with reach 10'
    )
  })

})