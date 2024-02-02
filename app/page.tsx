"use client";
import { useEffect, useState } from 'react';
import { useActive } from '@phatdev/hooks';
import styles from './page.module.css'
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useStyle } from '@phatdev/hooks/useStyle';
import { Object3D } from '@phatdev/utils/object';
import vertexShader from '@phatdev/shaders/vertex.glsl';
import fragmentShader from '@phatdev/shaders/fragment.glsl';
import * as THREE from 'three';

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
      const obj = new Object3D(document.body, 0, 0);
      const geometry = new THREE.PlaneGeometry(1, 1, 200, 200);
      const material = new THREE.ShaderMaterial({ 
        extensions: {
        derivatives: true // https://discourse.threejs.org/t/warning-0-gl-oes-standard-derivatives-extension-is-not-supported/24420
        },
        side: THREE.DoubleSide,
        wireframe: true,
        /**
         * This option has been set since
         * https://threejs.org/docs/#api/en/materials/ShaderMaterial
         */
        uniforms: {
          time: {
            value: 0.0,
          },
          resolution: {
            value: new THREE.Vector4()
          },
        },
      
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });
      

      const cube = new THREE.Mesh(geometry, material);
      const light = new THREE.DirectionalLight(0xffffff, 0.5);

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
