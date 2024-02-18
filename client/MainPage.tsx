'use client';
type props = {
    titleName: string,
}
import { useEffect, useState } from 'react';
import { useActive } from '@phatdev/hooks';
import styles from '@phatdev/app/page.module.css'

import { useStyle } from '@phatdev/hooks/useStyle';

export function MainPage(props: props) {
    const cssObject = useStyle('main');
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }, [])
    return (
        <main data-scroll-container className={styles.main}>
            <ul data-scroll-section style={{
                display: 'flex',
                gap: '30px',
                alignItems: 'center',
                fontWeight: '500',
                width: '100%',
                justifyContent: 'space-between',
                padding: `0px ${width * 4.5 / 100}px`,
                fontSize: '16px',
            }}>
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    top: '-5px',
                    gap: '30px',
                    alignItems: 'center',
                    border: '1px solid rgb(50, 50, 50)',
                    padding: '15px 25px',
                    fontWeight: '500',
                    fontSize: '20px',
                }}>
                    <li>Home</li>
                    <li>About</li>
                </div>

                <li><button style={{
                    padding: '15px 30px',
                    position: 'relative',
                    top: '-5px',
                    background: '#000',
                    border: '1px solid rgb(50, 50, 50)',
                    fontWeight: '500',
                    fontSize: '20px',
                    color: '#fff',
                    marginLeft: '10px',
                }} onClick={() => {
                    var browser = navigator.appName;
                    if(browser == "Microsoft Internet Explorer") window.opener = self;

                    const dualScreenLeft =  window.screenX;
                    const dualScreenTop = window.screenY;

                    const zoom = screen.width/window.screen.availWidth;
                    const x = ((screen.width - screen.width/1.5)>>1)/zoom + dualScreenLeft;
                    const y = ((screen.height - screen.height/1.5)>>1)/zoom + dualScreenTop;

                    window.open(`https://github.com/${window.owner}`, '', `location=0,toolbar=no,height=${screen.height/1.5},width=${screen.width/1.5},left=${x},top=${y}`);
                    window.moveTo(0,0);
                }}>Follow me on github</button></li>
            </ul>
            <div data-scroll-section style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: `${height * 75 / 100}px`,
                width: '100%'
            }}>
                <div data-scroll style={{
                    padding: '6rem'
                }}>
                    <h1 data-scroll className={styles.title + ' ' + props.titleName + ' ' + 'title-animation1'}>PHATDEV</h1>
                    <h1 data-scroll className={styles.title + ' ' + props.titleName + ' ' + 'title-animation2'} style={{
                        color: '#000',
                        WebkitTextStroke: '2px #757575'
                    }}>DEVELOPER</h1>
                    <br />
                    <span>{"Personal page of Fosly. A well-rounded developer and a simple designer."}</span>
                    <br />
                    <span>{"Fresh inspiration caused this website to be born."}</span>
                </div>
                <div data-scroll>
                    <h1 style={{
                        color: '#000',
                        WebkitTextStroke: '2px #757575',
                        ...cssObject.year
                    }}>{new Date().getFullYear()}</h1>
                </div>
            </div>
            <div style={{
                width: '100%',
                textAlign: 'center',
                padding: '10px 15px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                fontSize: '20px',
                background: '#000',
                border: '1px solid rgb(50, 50, 50)',
                color: '#fff',
            }}>
                <h2>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
                <h2 style={{
                    color: 'rgb(50, 50, 50)'
                }}>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
            </div>
            <div style={{
                width: '100%',
                textAlign: 'start',
                padding: '10px 15px',
                display: 'flex',
                gap: '10px',
                fontSize: '20px',
                background: '#000',
                border: '1px solid rgb(50, 50, 50)',
                color: '#fff',
            }}>
                <h2>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
                <h2 style={{
                    color: 'rgb(50, 50, 50)'
                }}>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
            </div>
            <div style={{
                width: '100%',
                textAlign: 'end',
                padding: '10px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'end',
                fontSize: '20px',
                background: '#000',
                border: '1px solid rgb(50, 50, 50)',
                color: '#fff',
            }}>
                <h2 style={{
                    color: 'rgb(50, 50, 50)'
                }}>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
                <h2>
                    INNOVATION IS AN ENDLESS SOURCE OF INSPIRATION
                </h2>
            </div>
        </main>
    )
}