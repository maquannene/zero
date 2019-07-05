import * as React from 'react'
import * as Loadable from 'react-loadable'
import Loading from '../../components/Loading'

export const Home = Loadable({
    loader: () => import('../../components/Home'),
    loading: Loading
})
export const About = Loadable({
    loader: () => import('../../components/About'),
    loading: Loading
})
export const News = Loadable({
    loader: () => import('../../components/News'),
    loading: Loading
})
