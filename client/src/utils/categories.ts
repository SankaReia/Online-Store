import { CategoryConsts } from "./routsConsts"

import clock from '../img/clock.webp'
import frame from '../img/frame.webp'
import light from '../img/light.webp'
import module from '../img/module.webp'
import poster from '../img/poster.webp'

export const categories= [
    {
        title:"modular paintings",
        route: CategoryConsts.MODULAR_ROUTE ,
        background: module
    },
    {
        title:"framed paintings",
        route: CategoryConsts.FRAMED_ROUTE ,
        background: frame 
    },
    {
        title: "posters",
        route: CategoryConsts.POSTERS_ROUTE ,
        background: poster 
    },
    {
        title: "clock paintings",
        route: CategoryConsts.CLOCK_ROUTE,
        background: clock
    },
    {
        title: "lightboxes",
        route: CategoryConsts.LIGHTBOXES_ROUTE,
        background: light 
    }, 
]
