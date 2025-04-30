import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './SkeletonLinkElement.css'

const SkeletonLinkElement = () => {
	return (
		<div className='skeleton'>
			<div className='top-section'>
				<Skeleton width={100} height={20} className='short-url'/>
				<div className='buttons-section'>
					<Skeleton circle width={30} height={30}/>
					<Skeleton circle width={30} height={30}/>
					<Skeleton circle width={30} height={30}/>
				</div>
			</div>
			<div className='mid-section'>
				<Skeleton width="70%" height={14} className='original-url'/>
			</div>
			<div className='bot-section'>
				<Skeleton width={80} height={12} className='date'/>
			</div>
		</div>
	)
}

export default SkeletonLinkElement
