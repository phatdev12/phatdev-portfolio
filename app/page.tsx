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

gsap.registerPlugin(TextPlugin);

type props = {
  titleName: string,
}
export function MainPage(props: props) {
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
    </main>
  )
}

export default function Home() {
  const [titleName, setTitleName] = useState('');
  const cssObject = useStyle('root');

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
      }).from('.title-animation2', {
        autoAlpha: 2,
        y: 100,
        duration: 1.4,
        ease: 'power3'
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
    const wasm = await import('@phatdev/pkg');
    let result = await wasm.jsonRequest(
      window.location.hostname+(window.location.hostname == "localhost" && `:${window.location.port}`), 
      '/class.json', 
      window.location.protocol === "https:"
    );
    
    result = result.main+'_'+(await wasm.generate_random_string(20));
    setTitleName(result);
  }, []);

  useEffect(() => {
    styleTitle(titleName);
  }, [titleName]);

  useEffect(() => {
    if(typeof window !== "undefined") {
      const obj = new Engine(document.body, 0, 0);
      const geometry = Engine.createPlaneGeometry(1, 1, 100, 100);
      const material = Engine.createShader(vertexShader, fragmentShader);
      
      const cube = Engine.createMesh(geometry, material);
      const light = Engine.createDirectionalLight(0xffffff, 0.5);

      obj.base.append(light, cube);
    }
  }, [])

  return (
    <div style={cssObject.mainContainer}>
      <div style={cssObject.nav}>
        <div style={{
          
        }}></div>
      </div>
      <MainPage titleName={titleName}/>
    </div>
   
  )
}
