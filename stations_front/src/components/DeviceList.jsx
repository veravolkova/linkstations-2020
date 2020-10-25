import React from 'react'

import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@material-ui/core'


const DeviceList = ( props ) => {

  return (
    <div>
      <Typography variant='h6' color='inherit'>
            Click the device you wanna check
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device number</TableCell>
              <TableCell>X</TableCell>
              <TableCell>Y</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.devices
              .map(device => (
                <TableRow key={device.id}>
                  <TableCell>
                    <Link to={`/solution/${device.id}`}>{device.id}</Link>
                  </TableCell>
                  <TableCell>
                    {device.latitude}
                  </TableCell>
                  <TableCell>
                    {device.longitude}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DeviceList