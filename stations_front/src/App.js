import React, { useState, useEffect } from 'react'

import {
  Switch,
  Route,
} from 'react-router-dom'

import devicesService from './services/devices'
import stationsService from './services/stations'

import DeviceList from './components/DeviceList'
import Footer from './components/Footer'
import Header from './components/Header'
import Solution from './components/Solution'

const App = () => {

  const [devices, setDevices] = useState([])
  const [stations, setStations] = useState([])

  useEffect(() => {
    devicesService.getAll().then(initialDevices => {
      setDevices(initialDevices)
    })
  }, [])

  useEffect(() => {
    stationsService.getAll().then(initialStations => {
      setStations(initialStations)
    })
  }, [])

  if (!devices || !stations) {
    return <h5>Oops...this may take longer than usual</h5>
  }

  return (
    <div>
      <Header/>

      <Switch>
        <Route path="/solution/:id" render={({ match }) =>
          (
            <div className='centered'>
              <Solution
                device={devices.find(d => d.id === match.params.id)}
                stations={stations}
              />
            </div>
          )
        }
        />
        <Route path='/'>
          <div className='centered'>
            <DeviceList devices={devices}/>
          </div>
        </Route>
      </Switch>

      <Footer/>
    </div>
  )
}

export default App