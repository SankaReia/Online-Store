import { CategoryConsts } from "./routsConsts"

import clock from '../img/clock.webp'
import frame from '../img/frame.webp'
import light from '../img/light.webp'
import module from '../img/module.webp'
import poster from '../img/poster.webp'

export const categories= [
    {
        title:"modular paintings",
        route: CategoryConsts.MODULAR_ROUTE as string,
        background: module as string
    },
    {
        title:"framed paintings",
        route: CategoryConsts.FRAMED_ROUTE as string,
        background: frame as string
    },
    {
        title: "posters",
        route: CategoryConsts.POSTERS_ROUTE as string,
        background: poster as string
    },
    {
        title: "clock paintings",
        route: CategoryConsts.CLOCK_ROUTE as string,
        background: clock as string
    },
    {
        title: "lightboxes",
        route: CategoryConsts.LIGHTBOXES_ROUTE as string,
        background: light as string
    }, 
]
