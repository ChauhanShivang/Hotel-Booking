import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'


const RecomendedHotels = () => {

    const {rooms, searchedCities} = useAppContext()
    const [recomended, setRecomended] = useState([])
    
    const filterHotels = () => {
        const filterHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city))
        setRecomended(filterHotels)
    }

    useEffect(() => {
        filterHotels()
    }, [rooms, searchedCities])

  return recomended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

      <Title title='Recomended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />

      <div className='flex flex-wrap items-center justify-center gap-10 mt-20'>
        {recomended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

    </div>
  )
}

export default RecomendedHotels
