"use client";
import { useEffect, useState } from 'react';
import { useActive } from '@phatdev/hooks';
import styles from './page.module.css'
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useStyle } from '@phatdev/hooks/useStyle';
import { Engine } from '@phatdev/utils/engine';
import vertexShader from '@phatdev/shaders/vertex.glsl';
import fragmentShader from '@phatdev/shaders/fragment.glsl';
import { clientEvent } from '@phatdev/Event';

gsap.registerPlugin(TextPlugin);

type props = {
  titleName: string,
}
export function MainPage(props: props) {
  const cssObject = useStyle('main');

  return (
    <main data-scroll-container className={styles.main}>
      <div data-scroll-section>
        <h1 data-scroll className={styles.title + ' ' + props.titleName + ' ' + 'title-animation1'}>PHATDEV</h1>
        <h1 data-scroll className={styles.title + ' ' + props.titleName + ' ' + 'title-animation2'} style={{
          color: '#000',
          WebkitTextStroke: '2px #757575'
        }}>DEVELOPER</h1>
        <span>{"Personal page of Fosly. A well-rounded developer and a simple designer."}</span>
        <br/>
        <span>{"Fresh inspiration caused this website to be born."}</span>
      </div>
      <div data-scroll-section>
        <h1 style={{
          color: '#000',
          WebkitTextStroke: '2px #757575',
          ...cssObject.year
        }}>{new Date().getFullYear()}</h1>
      </div>
    </main>
  )
}

export default function Home() {
  const [titleName, setTitleName] = useState('');
  const [metaLength, setMetaLength] = useState(0);

  const cssObject = useStyle('root');
  
  var created = false;
  var time = 0.0;

  // style of title
  const styleTitle = function(titleName: string) {
    const windowWidth = window.innerWidth;
    if(titleName) {
      console.log('true');
      const animation = gsap.timeline()
      animation.fromTo('.title-animation1', {
        autoAlpha: 1,
        delay: 0.1,
        y: 110,
        opacity: 0,
        duration: 1,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo'
      }).fromTo('.title-animation2', {
        autoAlpha: 2,
        y: 100,
        duration: 1,
        ease: 'power3'
      }, {
        y: 0,
        opacity: 1,
        duration: 2.0,
        ease: 'expo'
      }, '-=1')
      const title = document.querySelectorAll(`.${titleName}`) as NodeListOf<Element>;
      if(title) {
        title.forEach((e: any) => e.style.fontSize = `${windowWidth*1/9}px`)
      }
    }
  }

  useActive(() => {
    (function () {
      const scroll = new LocomotiveScroll({
        el: document.querySelector(`[data-scroll-container]`) as HTMLElement,
        smooth: true,
      });
    })(); 
  });

  useActive(async () => {
   if(typeof window !== "undefined") {
    clientEvent.on('domLoaded', async function() {
      setMetaLength(Math.floor(window.innerWidth/84.78));
      let result = await window.system.jsonRequest(
        window.location.hostname+(window.location.hostname == "localhost" && `:${window.location.port}`), 
        '/class.json', 
        window.location.protocol === "https:"
      );
      
      result = result.main+'_'+(await window.system.generate_random_string(20));
      console.log(metaLength);
      setTitleName(result);
    })
   }
  }, []);

  useEffect(() => {
    styleTitle(titleName);
  }, [titleName]);

  useEffect(() => {
    if(typeof window !== "undefined") {
      if(created === false) {
        const obj = new Engine(document.body, 0, 0);
        const geometry = Engine.createPlaneGeometry(1, 1, 100, 100);
        const material = Engine.createShader(vertexShader, fragmentShader);
        
        const cube = Engine.createMesh(geometry, material);
        const light = Engine.createDirectionalLight(0xffffff, 0.5);

        const callbackRenderer = () => {
          time+=0.05;
          material.uniforms.time.value = time;
        };

        obj.base.append(light, cube);
        obj.base.render(callbackRenderer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        created = true;
      }
      
    }
  }, [created, time]);

  return (
    <div style={cssObject.mainContainer}>
      <div style={{
        padding: '5px',
        display: 'flex',
        gap: '10px',
        background: '#000',
        justifyContent: "center",
        position: 'relative',
        zIndex: '23',
        borderBottom: '1px solid rgb(50, 50, 50)'
      }}>
        {Array(metaLength).fill(<>
          <span style={{
            gap: '5px'
          }}>CREATIVE</span>
        </>)}
      </div>
      <div style={cssObject.nav}>
        <div style={{
          padding: '60px 35px'
        }}>
          <ul style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            fontWeight: '500',
            fontSize: '16px',
          }}>
            <li>Home</li>
            <li>About</li>
            <li><button style={{
              padding: '15px 25px',
              background: '#fff',
              fontSize: '16px',
              color: '#000',
              marginLeft: '10px',
              borderRadius: '5px',
              border: 'none'
            }}>Follow me on github</button></li>
          </ul>
        </div>
      </div>
      <MainPage titleName={titleName}/>
    </div>
   
  )
}
