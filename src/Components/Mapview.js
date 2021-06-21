import React, { useState, useEffect, useCallback, useContext } from 'react'
import { accessToken, Map, NavigationControl } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';

import { AuthContext } from '../Components/Auth/AuthComtext'
import { useHistory } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        button: {
            zIndex: "1",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "10%",
            border: "solid red 1px",
            margin: "5px",
            display: "flex",
            padding: "5px",
            cursor: "pointer"
        },
        hide: {
            display: 'none',
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    }),
);




export default function Mapview() {
    const history = useHistory();

    const { currentUser, setCurrentuser } = useContext(AuthContext); 
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true)
    };
    const handleDrawerClose = () => {
        setOpen(false)
    };

    const logOut = async () => {
        await setCurrentuser(null);
        localStorage.clear();
    };
    //MapStyle 
    const accessToken = localStorage.getItem("Authorization.accessToken");
    const [mount, setMount] = useState(undefined);
    const initMap = useCallback(() => {
        const mapRender = new Map({
            container: "map1",
            style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
            center: [100.52, 13.73],
            scrollZoom: true,
            zoom: 10,
        });
        mapRender.on('load', function () {
            mapRender.addSource('museums', {
                type: 'vector',
                url: `https://v2k.vallarismaps.com/core/tiles/60190e3fb9d815e5ca327086?token=${accessToken}`
            });
            mapRender.addLayer({
                'id': 'museums',
                'type': 'circle',
                'source': 'museums',
                'layout': {
                    // Make the layer visible by default.
                    'visibility': 'visible'
                }
            });
            mapRender.addSource('contours', {
                type: 'vector',
                url: `https://v2k.vallarismaps.com/core/tiles/60190e3fb9d815e5ca327086?token=${accessToken}`
            });
            mapRender.addLayer({
                'id': 'contours',
                'type': 'line',
                'source': 'contours',
                'source-layer': 'contour',
                'layout': {
                    // Make the layer visible by default.
                    'visibility': 'visible',
                }
            });
        });

        mapRender.addControl(new NavigationControl(), 'bottom-right')

        setMount(mapRender);
    });
    useEffect(() => {
        if (!mount) {
            initMap();
        }
    }, [mount, initMap]);

    if (!currentUser) {
        history.goBack("/")
    }

    return (
        <div id="map1" style={{ width: "100vw", height: "100vh" }}>
            <nav id="menu"></nav>
            <div className={classes.button}>
                <MenuIcon
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                />
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div>
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
                        <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
                    </div>
                    <Button onClick={logOut}>Logout</Button>
                </Drawer>
            </div>
        </div>
    )
}
