
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import calculator from '../utils/calculator'

import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import EvStationIcon from '@material-ui/icons/EvStation'

const useStyles = makeStyles({
  root: {
    maxWidth: 440
  },
})

const Solution = ( props ) => {

  if (!props.device || !props.stations) {
    return null
  }

  const classes = useStyles()

  //find the station with max power for a certaint device
  const getBestStation = (stations, device) => {

    let bestStation = stations.map(station => {
      station.power = calculator.getPower(station.reach, calculator.getDistance(device, station))
      return station
    }).reduce((prev, curr) =>
      prev.power > curr.power ? prev : curr
    )

    return bestStation
  }

  const bestStation = getBestStation(props.stations, props.device)

  const result = () => {
    if(bestStation.power > 0) {
      return (
        <Typography>
          {`Best link station for point ${props.device.latitude}, ${props.device.longitude} is ${bestStation.latitude},
          ${bestStation.longitude} with reach ${bestStation.reach}`}
        </Typography>
      )
    }  else {
      return (
        <Typography>
          {`No link station within reach for point ${props.device.latitude}, ${props.device.longitude}`}
        </Typography>
      )
    }
  }

  return (
    <div >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <EvStationIcon/>
            </Avatar>
          }
          title='The best station is...'
        />
        <CardContent className={classes.content}>
          {result()}
        </CardContent>
        <CardActionArea>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button
            size='small'
            color='primary'
            target='_blank'
          >
            <Link to={'/'}>Home Page</Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Solution