import * as React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'
import home from '../../components/Home'
import about from '../../components/About'

export const DynamicNews = Loadable({
    loader: () => import('../../components/News'),
    loading: Loading
})

export const Home = home
export const About = about
